<template>
  <div>
       <!-- 轮播图 -->
     <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(pic,index) in imgs" :key="index">
            <a :href="pic.url">
                <img :src="pic.img || pic.src" alt="">
            </a>
        </mt-swipe-item>
        
    </mt-swipe>
  </div>
</template>
<script>
export default {
    name:'my-swipe',
    props:['url'],
    data() {
        return {
            imgs:[]
        }
    },
  created() {
      this.$axios.get(this.url)
           .then(res => {
              this.imgs = res.data.message;
           })
           .catch(err => {
               console.log(err)
           })
  }
}
</script>
<style scoped>
/*轮播图样式*/
 .mint-swipe-item img {
    width: 100%;
    height: 100%;
 }
.mint-swipe{
    height: 30%;
}
</style>


