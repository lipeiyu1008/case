$(function() {
    getDetailData();

    //点击加减按钮
    var count = 0;



    $('.mui-content').on('tap','.plus',function() {
        var num = $(this).data('num');
        count++;
        if(count > num) {
            count = num;
        }
        $('.mui-content').find('.num').html(count);
    })
    $('.mui-content').on('tap','.sub',function() {
        count--;
        if(count < 0) {
            count = 0;
        }
        $('.mui-content').find('.num').html(count);
    })
    




})

var getDetailData = function () {
    var url = new URLSearchParams(location.search);
    var id = url.get('id');
    // console.log(id);
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{
            id:id
        },
        success:function(data) {
            // console.log(data);
            var size = data.size.split('-');
            // console.log(size);
            data.size = size;
            // console.log(data.size);
            var detailTemplate = template('detailTemplate',data);
            $('.mui-content').html(detailTemplate);
        }
    })
}