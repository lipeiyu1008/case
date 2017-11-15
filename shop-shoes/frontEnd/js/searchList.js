$(function() {

    var flag = true;
    var sales = true;


    mui.init({
        // 注意: 按照文档上书写的DOM结构无特殊要求，只需要指定一个下拉刷新容器标识即可
        // 但是实际上不行,按照实践要求 必须在区域滚动的基础上才可以
        pullRefresh : {
          container:"#lt-search",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
            style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
            color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
            height:'50px',//可选,默认50px.下拉刷新控件的高度,
            range:'100px', //可选 默认100px,控件可下拉拖拽的范围
            offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
            auto: true,//可选,默认false.首次加载自动上拉刷新一次
            callback:function(){
              // console.log(1);
              getSearchListData();
        
            }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });





    //载入页面是发起请求
    getSearchListData(1,2,2);

    // 点击搜索按钮,发起ajax请求
    $('.search-box span').on('tap',function() {
        var inputName = $(this).siblings('input').val();
        if(inputName) {
            searchData(inputName);
        }else{
            searchData('n');
        }
    })

    //点击价格,排序
    $('.order-price').on('tap',function(){
        $('.search-result-order a').removeClass('active');
        $(this).addClass('active');
        if(flag) {
            getSearchListData(1,1,2);
            flag = false;
            $(this).find('i').addClass('fa-angle-up');
            $(this).find('i').removeClass('fa-angle-down');
        }else {
            getSearchListData(1,2,2);
            flag = true;;
            $(this).find('i').addClass('fa-angle-down');
            $(this).find('i').removeClass('fa-angle-up');
        }



    })
    //点击销量,排序
    $('.order-stock').on('tap',function(){
        $('.search-result-order a').removeClass('active');
        $(this).addClass('active');
        if(sales) {
            getSearchListData(1,null,1);
            sales = false;
            $(this).find('i').addClass('fa-angle-up');
            $(this).find('i').removeClass('fa-angle-down');
        }else {
            getSearchListData(1,null,2);
            sales = true;;
            $(this).find('i').addClass('fa-angle-down');
            $(this).find('i').removeClass('fa-angle-up');
        }



    })


    //点立即购买,跳转至产品详情页
    $('.search-result-list').on('tap','button',function() {
        var id = $(this).attr('data-id');
        location.href = './detail.html?id=' + id;
    })





   



})





//初加载Ajax 请求
var getSearchListData = function (pageNum,price,num) {

    var url = new URLSearchParams(location.search);
    var proName = url.get('proName');
    $.ajax({
        type:'get',
        url:' /product/queryProduct',
        data:{
            proName:proName,
            price:price || null,
            num:num || 2,
            page:pageNum || 1,
            pageSize:6
        },
        success:function(data) {
            // console.log(data);
            var listTemplate = template('searchlistTemplate',data);
            $('.search-result-list').html(listTemplate);
        }
    })
}

// 点击搜索按钮,发起的ajax请求
var searchData = function (inputName,pageNum,price,num) {
    
        
        $.ajax({
            type:'get',
            url:' /product/queryProduct',
            data:{
                proName:inputName,
                price:price || 2,
                num:num || 2,
                page:pageNum || 1,
                pageSize:6
            },
            success:function(data) {
                // console.log(data);
                var listTemplate = template('searchlistTemplate',data);
                $('.search-result-list').html(listTemplate);
            }
        })
    }




















// var getSearchListData = function (pageNum,price,num) {
//     var url = new URLSearchParams(location.search);
//     var proName = url.get('proName');
//     $.ajax({
//         type:'get',
//         url:'/product/queryProduct',
//         data:{
//             proName:proName||'',
//             page:pageNum||1,
//             pageSize:6,
//             price:2||null,
//             num:2||null
//         },
//         success:function(data) {
//             console.log(data);
//         }
//     })
// }