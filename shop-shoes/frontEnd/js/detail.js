$(function() {
    getDetailData();
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