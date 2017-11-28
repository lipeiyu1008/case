export default {
    template:`
        <div>
            <list :heros="appHeros"></list>
            <add :heros="appHeros"></add>
            <update :heros="appHeros"></update>
            <del-vue :heros="appHeros"></del-vue>
        </div>
    `,
    data() {
        return {
            appHeros:[{id:1,name:'李白'},{id:2,name:'貂蝉'},{id:3,name:'周瑜'},{id:4,name:'小乔'}]
        }
    }
}