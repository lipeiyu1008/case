$(function() {
    var productManage = function (pageNum) {
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:pageNum||1,
                pageSize:5
            },
            dataType:'json',
            success:function(data) {
                var proTemplate = template('prodTemplate',data);
                $('tbody').html(proTemplate);

                 // 分页显示
                 $('.pagination').bootstrapPaginator({
                    /*当前使用的是3版本的bootstrap*/
                    bootstrapMajorVersion: 3,
                    /*配置的字体大小是小号*/
                    size: 'small',
                    /*当前页*/
                    currentPage: data.page,
                    /*一共多少页*/
                    // 总页数=数据的总数/每页显示多少条数据
                    totalPages: Math.ceil(data.total / data.size),
                    /*点击页面事件*/
                    onPageClicked: function (event, originalEvent, type, page) {
                        /*改变当前页再渲染 page当前点击的按钮的页面*/
                        productManage(page);
                    }
                });

            }
        })
    }


    // 加载页面后,连接数据库,渲染数据
    productManage();

    //上传
    initUpload();


    // 校验
     // 校验

  $('#productform').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '商品库存不能为空'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品价格不能为空'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '商品尺码不能为空'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    // Prevent form submission
    e.preventDefault();
    // Get the form instance
    var $form = $(e.target);
    // console.log($form.serialize());
    // console.log($form); 
    // serialize(); 序列化 
    // send() 对象-- 这是自己传
    // http协议要的是什么 键值对  key=value&key1=value1
    // Get the BootstrapValidator instance
    var bv = $form.data('bootstrapValidator');
    // 使用ajax提交表单数据
    // 1.验证 这个表单校验插件是否运行
    // 2.提交ajax
    //  2.1 看接口
    // 接口需要的数据有:
    // brandName 品牌名称
    // categoryId 所属分类
    // brandLogo 品牌logo地址
    // 写成http协议要求的格式 
    var data = $form.serialize();
    // console.log(data); //
    // categoryId=5
    // &brandName=%E6%9D%8E%E5%AE%81
    // &brandLogo=%2Fupload%2Fbrand%2Fed9039d0-c776-11e7-8f9d-954ba41349c7.jpg

    $.each(picList,function(i,item) {
      data+='&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr;
    })
    // console.log(data);
    // console.log();
    data = data+'&brandId=4';
    // console.log(data);
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:data,
      success:function(data){
        // console.log(data);
        // 发送请求成功后,取消模态框,并刷新页面
        $('#exampleModal').modal('hide');
        productManage();



      }
    })

  });







})

var picList = [];

var initUpload = function () {
    // 下面的id是type=file类型的input的id
    $("#pic").fileupload({
      // 找到上传图片的接口
      url: "/product/addProductPic",
      done: function (e, data) {
        // console.log(data);
        $('.fileupload').append('<img width="50" height="auto" src="'+data.result.picAddr+'" alt="">');
        // console.log(data.result);
        picList.push(data.result);
      }
    })
  }