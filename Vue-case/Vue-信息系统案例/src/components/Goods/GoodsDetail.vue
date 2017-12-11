<template>
    <div>
        <nav-bar title="商品详情"></nav-bar>
        <div class="outer-swiper">
            <div class="swiper">
                <my-swipe :url="swipeUrl"></my-swipe>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{goodsInfo.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{goodsInfo.market_price}}</s> 销售价：<span>￥{{goodsInfo.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click="sub">-</span><span>{{pickNum}}</span><span @click="odd">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addShopcart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
                <!-- 过渡效果必须被内置组件transition包裹。v是指的其name属性 -->
            <transition name="myball" v-on:after-enter="afterEnter">
                <div class="ball" v-if="showBall"></div>
            </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{goodsInfo.goods_no}}</li>
                <li>库存情况：{{goodsInfo.stock_quantity}}件</li>
                <li>上架时间：{{goodsInfo.add_time|convert-time}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain>商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import GoodsTools from '../commons/GoodsTools.js';
import VueBus from '../commons/VueBus.js';

export default {
    data() {
        return {
            goodsInfo:{},//商品详情数据
            swipeUrl:`getthumimages/${this.$route.params.goodsId}`,
            showBall:false,
            pickNum:1,//购物车数量
        }
    },
    methods:{
        addShopcart() {
            this.showBall = true;

            GoodsTools.addOrUpdate({
                id:this.goodsInfo.id,
                num:this.pickNum
            })


            // GoodsTools.addOrUpdate({
            //     id:88,num:50
            // })
            // GoodsTools.addOrUpdate({
            //     id:88,num:40
            // })
            // console.log(GoodsTools.getGoods())
            // console.log(GoodsTools.getTotalCount())



        },
        afterEnter() {
            //动画完毕，将小球移除
            this.showBall = false;
            VueBus.$emit('addShopcart',this.pickNum);


        },
        sub() {
            if(this.pickNum < 2) return;
            this.pickNum --;
        },
        odd() {
            this.pickNum ++;
        }



    },
    created() {
        let goodsId = this.$route. params.goodsId;
        this.$axios.get(`goods/getinfo/${goodsId}`)
        .then(res => {
            this.goodsInfo = res.data.message[0];
        })

    }
}



</script>
<style scoped>
/* 移除中设置透明，清楚Bug */
.myball-leave{
    opacity: 0;
}

.myball-enter-active {
    animation: bounce-in 1s;
}

@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
