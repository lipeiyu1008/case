let obj = {};
let store = window.localStorage;


obj.addOrUpdate = function (newGoods) {
    //获取本地数据
    let goodsObj = this.getGoods();
    if(goodsObj[newGoods.id]) {
        //追加
        goodsObj[newGoods.id] += newGoods.num;
    }else{
        goodsObj[newGoods.id] = newGoods.num;
    }

    this.saveGoods(goodsObj);

}


//获取
obj.getGoods = function () {
    return JSON.parse(store.getItem('goods') || '{}')
}

//存储
obj.saveGoods = function (obj) {
    store.setItem('goods',JSON.stringify(obj));
}

//获取总数
obj.getTotalCount = function () {
    let goodsList = this.getGoods();
    let sum = 0;
    let arr = Object.values(goodsList);
    arr.forEach(ele => sum+=ele);
    return sum;
}


export default obj;