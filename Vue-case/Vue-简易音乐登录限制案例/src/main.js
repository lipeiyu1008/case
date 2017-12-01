import Vue from '../vue.js'
import VueRouter from '../vue-router.js'
import $ from '../jquery.min.js'


import Home from './components/Home.js';
import Login from './components/Login.js';
import Music from './components/Music.js';
import List from './components/List.js';

var App = {
    template:`
        <div>
            <router-view></router-view>
        </div>
    `
}


Vue.prototype.$ = $;

Vue.use(VueRouter)


var router = new VueRouter();

router.addRoutes([
    {path:'/',redirect:{
        name:'home'
    }},
    {name:'home',path:'/home',component:Home,
        children:[
            {name:'login',path:'login',component:Login},
            {name:'music',path:'music',component:Music,meta:{check:true},
                children:[
                    {name:'music.list',path:'list',component:List}
                ]
        }

        ]
}
]);

router.beforeEach((to,from,next) => {
    var matched = to.matched;
    var checkLogin = false;
    for (var i = 0; i < matched.length; i++) {
        if(matched[i].meta.check) {
            checkLogin = true;
           
        }
        
    }
    if (!checkLogin) {
        return next()
        
    }

    var username = window.localStorage.getItem('username');

    if(username) {
        
    }else{
        username = ''
    }
    
    $.ajax({
        type:'get',
        url:'http://localhost:3000/users/' + username,
        dataType:'json',
        success:function(data) {
            console.log(data)
            if(data.isLogin == 'true') {
                next();
            }else {
                if(confirm('去登录?')) {
                    next({
                        name:'login'
                    })
                }
                
            }
        }
    })



})




new Vue({
    el:'.app',
    render:c => c(App),
    router
})