$(function() {
    showHistoryData();
    //点击搜索按钮
    var searchInput = $('.search-box input');
    $('#search-btn').on('tap',function() {
        var keyWord = searchInput.val();
        setHistoryData(keyWord);
        location.href = './searchList.html?proName=' + keyWord;
        showHistoryData();
        searchInput.val('');

    })

    //点击清空按钮
    $('.mui-pull-right').on('tap',function() {
        searchInput.val('');
        localStorage.removeItem('ltHistory');
        showHistoryData();

    })

    //点击单个删除按钮
    
    $('.search-history-list').on('tap','i',function() {
        var deletaData = $(this).siblings('span').html();
        removeHistoryData(deletaData);
        showHistoryData();

    })


    //点击历史记录,跳至搜索列表页面
    $('.search-history-list').on('tap','span',function() {
        var keyWord = $(this).html();
        location.href = './searchList.html?proName=' + keyWord;
    })








})

//获取值
var getHistoryData = function () {
    return JSON.parse(localStorage.getItem('ltHistory') || '[]');
    
}

//设置值
var setHistoryData = function (value) {
    var getData = getHistoryData();
    $.each(getData,function(i,item) {
        if(value == item) {
            getData.splice(i,1);
        }
    })
    if(value == '') {
        return;
    }
    getData.push(value);
    localStorage.setItem('ltHistory',JSON.stringify(getData));
 
}


//移除数据
var removeHistoryData = function (value) {
    var getData = getHistoryData();
    $.each(getData,function(i,item) {
        if(value == item) {
            getData.splice(i,1);
        }
    })
    localStorage.setItem('ltHistory',JSON.stringify(getData));
}

var showHistoryData = function () {
    var getData = getHistoryData();
    if(getData.length == 0) {
        $('.empty-history').show();
        $('.search-history').hide();
    }else {
        var historyTemplate = template('historyTemplate',{getData:getData});
        $('.search-history-list').html(historyTemplate);
        $('.search-history').show();
        $('.empty-history').hide();
    }
}

