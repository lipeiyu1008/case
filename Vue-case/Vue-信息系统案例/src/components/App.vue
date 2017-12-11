<template>
  <div>
       <!-- 头部 -->
      <mt-header title="信息管理系统" ref="header"></mt-header>
      <transition name="rv"  mode="out-in">
            <router-view :appRefs="$refs"></router-view>
       </transition>
      <!-- 底部导航 -->
      <mt-tabbar v-model="selected" ref="footer">
              <mt-tab-item id="home">
                <img slot="icon" src="../static/img/index.png">
                首页
              </mt-tab-item>
              <mt-tab-item id="member">
                <img slot="icon" src="../static/img/vip.png">
                会员
              </mt-tab-item>
              <mt-tab-item id="shopcart">
                <img slot="icon" src="../static/img/shopcart.png">
                购物车<mt-badge type="error" size="small">{{num}}</mt-badge>
              </mt-tab-item>
              <mt-tab-item id="search">
                <img slot="icon" src="../static/img/find.png">
                查找
              </mt-tab-item>
      </mt-tabbar>
  </div>
</template>
<script>
import GoodsTools from './commons/GoodsTools.js';
import VueBus from './commons/VueBus.js';
export default {
  data() {
    return {
      selected:'',
      num:GoodsTools.getTotalCount()
    };
  },
  created() {
    VueBus.$on('addShopcart',pickNum => {
      this.num += pickNum;
    })



  },
  watch:{
      selected(newV) {
        this.$router.push({
          name:newV
        })
      }
  }
};
</script>
<style scoped>
.rv-enter-active,.rv-leave-active{
   transition: opacity .5s
}

/*元素移除的时候home,默认透明度1 --> 0*/
/*元素插入的时候news,默认透明度0 --> 1*/

/*插入元素之后的1不需要设置*/
.rv-entry,.rv-leave-to{
  opacity: 0;
}


 .mint-tabbar{
    position: fixed;
    bottom:0;
   } 
</style>


