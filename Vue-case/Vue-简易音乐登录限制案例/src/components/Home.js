export default {
    template:`

        <div>
            <router-link :to="{name:'login'}">登录</router-link>
            <button @click="exit">退出</button>
            <router-link :to="{name:'music'}">音乐首页</router-link>
            <router-link :to="{name:'music.list'}">音乐列表</router-link>
            <router-view></router-view>
        </div>
    `,
    methods:{
        exit() {
            var username = window.localStorage.getItem('username');
            this.$.ajax({
                type:'put',
                url:'http://localhost:3000/users/' + username,
                data:'isLogin=false',
                dataType:'json',
                success:() => {
                    this.$router.push({
                        name:'login'
                    })
                }
            })
        }
    }
}