export default {
    template:`
        <div>
            ID:<input type="text" v-model="delId">
            <button @click="delHero">删除英雄</button>
        </div>
    `,
    props:['heros'],
    data() {
        return {
            delId:''
        }
    },
    methods:{
        delHero() {
            var index = this.heros.findIndex(ele => ele.id == this.delId);
            if(index == -1) {
                alert('没有这个英雄');
                return;
            }
            this.heros.splice(index,1);
            this.delId = '';
            
        }
    }
}