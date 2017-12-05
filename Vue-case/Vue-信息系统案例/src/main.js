//引入包
import Vue from 'vue';


//过滤器    开始
import Moment from 'moment';

Vue.filter('convert-time',(value) => {
    return Moment(value).format('YYYY-MM-DD');
})
//处理title 太长
Vue.filter('convert-title',(value,limit) => {
    if(!value) return;
    if(value.length > limit) {
        return value.substr(0,limit) + '...';
    }

    return value;

})


//过滤器    结束

//缩略图包      开始
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//缩略图包      结束



//注册组件相关------开始
import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Member from './components/Member/Member.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import Search from './components/Search/Search.vue';
import MyUl from './components/commons/MyUl.vue';
import MyLi from './components/commons/MyLi.vue';
import NewsList from './components/News/NewsList.vue';
import NewsDetail from './components/News/NewsDetail.vue';
import NavBar from './components/commons/NavBar.vue';
import PhotoList from './components/PhotoList/PhotoList.vue';
import PhotoDetail from './components/PhotoDetail/PhotoDetail.vue';
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);
Vue.component(NavBar.name,NavBar);


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
    {name:'search',path:'/search',component:Search},
    {name:'news.list',path:'/news/list',component:NewsList},//新闻列表
    {name:'news.detail',path:'/news/detail',component:NewsDetail},//新闻详情
    {name:'photo.list',path:'/photo/list/:categoryId',component:PhotoList},//图文分享
    {name:'photo.detail',path:'/photo/detail/:imgId',component:PhotoDetail},//图文详情
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
