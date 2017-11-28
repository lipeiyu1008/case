export default {
    template:`
        <div style="background-color:skyblue">
            ID:<input type="text" v-model="addId">
            英雄名称:<input type="text" v-model="addName">
            <button @click="addHero">添加英雄</button>
        </div>
    `,
    props:['heros'],
    data() {
        return {
            addId:'',
            addName:''
        }
    },
    methods:{
        addHero() {
            this.heros.push({
                id:this.addId,
                name:this.addName
            });
            this.addId = '';
            this.addName = ''
        }
    }
}