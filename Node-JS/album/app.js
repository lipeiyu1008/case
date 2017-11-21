'use strict';
const express = require('express');
//引入数据库对象
const mysql = require('mysql');

//引入核心对象
const path = require('path');




//解析post请求数据
const bodyParser = require('body-parser');

//文件增强包
const fse = require('fs-extra');
//处理post请求体

const formidable = require('formidable')



const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '130434',
    database: 'album'
});


//创建服务器
const app = express();

//配置模板引擎
app.engine('html',require('express-art-template'));

//配置路由规则
const router = express.Router();


//测试路由
router.get('/text',(req,res,next) => {
    pool.getConnection(function(err, connection) {
        connection.query('SELECT * FROM album_dir', function(error, results, fields) {
            //查询完毕以后，释放连接
            connection.release();
            if (error) throw error;
            res.render('test.html', {
                    text: results[2].dir
            });
        });
    });  
})
.get('/',(req,res,next) => {
     //获取连接
     pool.getConnection((err, connection)=> {
        //处理获取连接时的异常，比如停网了
        if(err) return next(err);
        //使用连接查询所有的album_dir所有数据
        connection.query('select * from album_dir',(error, results)=>{
             //查询完毕以后，释放连接
             connection.release();
            //处理查询时带来的异常，比如表名错误
            if(error) return next(error);
            res.render('index.html',{
                album:results
            });
        })
    });
})
//显示照片列表
.get('/showDir',(req,res,next) => {
    //获取url地址
    let dirname = req.query.dir;
    // console.log(dirname);

    pool.getConnection((err, connection)=> {
        //处理获取连接时的异常，比如停网了
        if(err) return next(err);
        //使用连接查询所有的album_dir所有数据
        connection.query('select * from album_file where dir=?',[dirname],(error, results)=>{
            //查询完毕以后，释放连接
            connection.release();
            //处理查询时带来的异常，比如表名错误
            if(err) return next(err);
            // console.log(results);
            //记录相册名
            res.render('album.html',{
                album:results,
                dir:dirname
            })
        })
    });
})

//添加目录
.post('/albumName',(req,res,next) => {
    let  dirname = req.body.albumName;
    pool.getConnection((err, connection)=> {
        //处理获取连接时的异常，比如停网了
        if(err) return next(err);
        //使用连接查询所有的album_dir所有数据
        connection.query('insert into album_dir values (?)',[dirname],(error, results)=>{
            //查询完毕以后，释放连接
            connection.release();
            //处理查询时带来的异常，比如表名错误
            if(err) return next(err);
            // console.log(results);
            //创建目录
            const dir = `./resource/${dirname}`;

            fse.ensureDir(dir,err => {
                //重新定向
                res.redirect('/showDir?dir=' + dirname);
            })

        })
    });
})

//添加照片

.post('/addPic',(req,res,next) => {

    var form = new formidable.IncomingForm();

    let rootPath = path.join(__dirname,'resource');
    //设置默认上传目录
    form.uploadDir = rootPath;
    form.parse(req, function(err, fields, files) {
        if(err) return next(err);
        // console.log(fields);
        // console.log(files);
        //文件名称
        let filename = path.parse(files.pic.path).base;
        // console.log(filename)
        //拼接新路径
        let dist = path.join(rootPath,fields.dir,filename);
        // console.log(dist);
        fse.move(files.pic.path,dist,(err) => {
            if(err) return next(err);
            // console.log('移动成功')


            //将数据保存到数据库

            let db_file = `/resource/${fields.dir}/${filename}`;
            let db_dir = fields.dir;

            pool.getConnection((err, connection)=> {
                //处理获取连接时的异常，比如停网了
                if(err) return next(err);
                //使用连接查询所有的album_dir所有数据
                connection.query('insert into album_file values (?,?)',[db_file,db_dir],(error, results)=>{
                    //查询完毕以后，释放连接
                    connection.release();
                    //处理查询时带来的异常，比如表名错误
                    if(err) return next(err);
                    // console.log(results);
                    //重新定向
                    res.redirect('/showDir?dir=' + db_dir);
        
                })
            });





        })



      });




});



//处理静态资源
app.use('/public',express.static('./public'));
//暴露照片文件夹
app.use('/resource',express.static('./resource'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(router);


// 错误处理中间件
app.use((err,req,res,next)=>{
    console.log('出错啦.-------------------------');
    console.log(err);
    console.log('出错啦.-------------------------');
    res.send(`
            您要访问的页面出异常拉...请稍后再试..
            <a href="/">去首页玩</a>
    `);
})



app.listen(8888,() => {
    console.log('服务器开启成功');
})