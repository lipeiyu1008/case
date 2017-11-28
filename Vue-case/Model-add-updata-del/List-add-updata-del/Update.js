export default {
    template:`
        <div style="background-color:red">
            ID:<input type="text" v-model="updateId">
            英雄名称:<input type="text" v-model="updateName">
            <button @click="updateHero">更新英雄</button>
        </div>
    `,
    props:['heros'],
    data() {
        return {
            updateId:'',
            updateName:''
        }
    },
    methods:{
        updateHero() {
            var hero = this.heros.find(ele => ele.id == this.updateId);
            if(!hero) {
                alert('没有此英雄');
                return
            }
            hero.name = this.updateName;
            this.updateId = '';
            this.updateName = ''
        }
    }
}