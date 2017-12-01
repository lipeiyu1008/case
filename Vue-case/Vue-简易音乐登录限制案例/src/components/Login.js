export default {
    template:`
        <div>
            用户名:<input type="text" v-model="username"/>
            密码:<input type="text" v-model="password"/>
            <button @click="doLogin">登录</button>
        </div>
    `,
    data() {
        return {
            username:'',
            password:''
        }
    },
    methods:{
        doLogin() {
            this.$.ajax({
                type:'put',
                url:'http://localhost:3000/users/' + this.username,
                dataType:'json',
                data:'isLogin=true',
                success: () => {
                    window.localStorage.setItem('username',this.username);
                    
                    console.log('登录成功')
                }
            })
        }
    }
}