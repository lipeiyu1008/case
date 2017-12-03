//引入包
import Vue from 'vue';

import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Member from './components/Member/Member.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import Search from './components/Search/Search.vue';
//注册全局组件------开始
import MyUl from './components/commons/MyUl.vue'
import MyLi from './components/commons/MyLi.vue'
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);


//注册全局组件------结束

//引入路由-------开始
import VueRouter from 'vue-router'
//挂载
Vue.use(VueRouter);
//创建路由
let router = new VueRouter();
//加载组件
router.addRoutes([
    {path:'/',redirect:{
        name:'home'
    }},
    {name:'home',path:'/home',component:Home},
    {name:'member',path:'/member',component:Member},
    {name:'shopcart',path:'/shopcart',component:Shopcart},
    {name:'search',path:'/search',component:Search}
])

//引入路由-------结束


//引入mint-ui----开始
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(MintUi)
//引入mint-ui----结束

//引入公共样式
import './static/css/global.css';



//Axios    开始
import Axios from 'axios';
Vue.prototype.$axios = Axios

//设置默认URL请求基础路径
Axios.defaults.baseURL = 'http://vue.studyit.io/api/';

//Axios    结束


//启动
new Vue({
    el:'#app',
    render: c => c(App),
    router
})
