$(function () {
    var categorySecond = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            dataType: 'json',
            success: function (data) {

                var secondTemplate = template('secondTemplate', data);
                $('tbody').html(secondTemplate);

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
                        categorySecond(page);
                    }
                });




            }

        })
    }

    categorySecond();

    // 分类下拉框
    $('.form-group button').on('click', function () {

        secondUpload();
    })


    // 图片上传与预览
    initUpload();
    



    // 校验

  $('#secondform').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类不能为空'
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


    // console.log(data);


    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:data,
      success:function(data){

        // 发送请求成功后,取消模态框,并刷新页面
        $('#exampleModal').modal('hide');
        categorySecond();



      }
    })

  });





})


// 下拉框


var secondUpload = function (pageNum) {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
            page: pageNum || 1,
            pageSize: 10
        },
        dataType: 'json',
        success: function (data) {
            var html = '';
            $.each(data.rows, function (i, item) {
                html += '<li><a href="javascript:;" data-id="' + item.id + '">' + item.categoryName + '</a></li>';


            })

            // 加到下拉框中
            $('.dropdown-menu').html(html);

            // 点击选项,渲染到默认值
            $('.dropdown-menu').on('click', 'a', function () {
                $('.default').html($(this).html());
                $('#categoryId').val($(this).attr('data-id'));
            })




        }

    })
}




// 2.上传 
var initUpload = function () {
    // 下面的id是type=file类型的input的id
    $("#secondupload").fileupload({
        // 找到上传图片的接口
        url: "/category/addSecondCategoryPic",
        done: function (e, data) {
            // console.log(data);
            $('#previewimg').attr('src', data.result.picAddr);
            $('#brandLogo').val(data.result.picAddr);


        }
    })
}