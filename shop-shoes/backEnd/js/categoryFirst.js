$(function() {
    var getFirstData = function (pageNum) {
        $.ajax({
            type:'type',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:pageNum||1,
                pageSize:5
            },
            dataType:'json',
            success:function(data) {
                
            }

        })
    }
})