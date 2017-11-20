'use strict';
//核心对象http
const http = require('http');
//path对象
const path = require('path');
//键值对解析
const querystring = require('querystring');
//模板对象
const artTemplate = require('art-template');

//初始数据
let myMsg = [{
    nickname:'人妖',
    msg:'萨瓦迪卡'
},{
    nickname:'日本',
    msg:'摩西摩西'
}];

//创建服务器
let server = http.createServer((req,res) => {
    //判断是get请求页面
    if(req.method == 'GET' && req.url == '/') {
        let htmlstr = artTemplate(path.join(__dirname,'index.html'),{
            msgs:myMsg
        })
        res.end(htmlstr);
    }else if (req.method == 'POST' && req.url == '/sendMsg') {
        //接收请求体数据
        req.on('data',(data) => {
            
            let str = data.toString();
            
            let formObj = querystring.parse(str);
            
            myMsg.push({
                nickname:formObj.nickname,
                msg:formObj.msg
            });
            console.log(myMsg);
            let htmlStr = artTemplate(path.join(__dirname,'index.html'),{
                msgs:myMsg
            })
            res.end(htmlStr);
        })
    }else {
        res.end('ok')
    }
})

server.listen(8888,(err) => {
    console.log('启动成功');
});

