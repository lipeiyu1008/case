$(function () {
    var getfirstData = function () {
        ///category/queryTopCategory
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategory',
            data: {},
            success: function (data) {
                var getfirstTemplate = template('firstTemplate', data);
                $('.lt-sort-left ul').html(getfirstTemplate);

                getsecondData(data.rows[0].id);



            }
        })
    }

    // 初次加载完页面,一级分类
    getfirstData();



    //二级分类函数

    var getsecondData = function (id) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            success: function (data) {
                // console.log(data);
                var getsecondTemplate = template('secondTemplate', data);
                $('.lt-sort-right ul').html(getsecondTemplate);
            }
        })
    }


    //点击一级分类,更新二级分类数据
    $('.lt-sort-left ul').on('tap','a',function() {
        // 点击变色
        $('.lt-sort-left ul').find('a').removeClass('active');

        $(this).addClass('active');

        var id = $(this).attr('data-id');
        getsecondData(id);
    })









    




})