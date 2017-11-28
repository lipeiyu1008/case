//启动  配置
//引入vue文件
import Vue from '../vue.js';
//引入父组件
import App from './App.js';
//引入子组件
import List from './List.js';
import Add from './Add.js';
import Update from './Update.js';
import Del from './Del.js';




//注册全局组件
Vue.component('list',List)
Vue.component('add',Add)
Vue.component('update',Update)
Vue.component('del-vue',Del)




new Vue({
    el:'.app',
    render: c => c(App)
})