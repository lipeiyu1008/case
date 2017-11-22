// 点击更多进行切换
$(function () {
    //点击更多按钮
    $('#menu').on('click','.row>div:nth-child(8)',function() {
        // console.log(1)
        $("#menu .row>div:nth-last-child(-n+4)").toggle();
    })





    getMenuStyle();
    getRecommendStyle();


})




function getMenuStyle() {
    $.ajax({
        url:url+"api/getindexmenu",
        success:function(data){
            // console.log(data);
           var html = template("menuTpl",data);
            $('#menu .row').html(html);
        }
    })
}


function getRecommendStyle() {
    $.ajax({
        url:url+"api/getmoneyctrl",
        success:function(info) {
            // console.log(info);

            var html = template("getRecommendStyle",info);
            $("#recommend .recommend_product").html(html);



        }
    })
}

