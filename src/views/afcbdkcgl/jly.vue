<template>
  <div style="width:100%;padding:10px">
 
    <el-popover
      placement="right"
      width="400"
      trigger="click"
    >
      <audio v-for="item in music" :key="item.index" :src="item.url" controls />
    
      <el-button slot="reference" style="position:absolute;right:20px">音乐包</el-button>
    </el-popover>
    <div style="clear:both" />
    <div v-for="(item,index) in parts" :key="index" style="width:25%;padding:5px;float:left">
      <h1>{{ item.partname }}</h1>
      <p v-for="(item1,index1) in item.actions" :key="index1">{{ item1.name }} {{ item1.number }} {{ item1.unit }}</p>
    </div>
    
    <div style="clear:both" />
    <div v-for="item in users" :key="item.index" style="width:10%;float:left;text-align:center;margin-top:15px">
      <img :src="item.resurl" style="width:65px;height:65px;border-radius:50%"><br>
      <span>{{ item.name }}</span>
    </div>
    
  </div>    
</template>

<script>

export default {
    data() {
        return {
           query:{},
           users:[],
           music:[],
           parts:[]
        }
    },
    created(){
        this.query=this.$route.query.item
        console.log(this.query)
        this.getusers()
        this.getmusic()
        this.getparts()
    },
    methods:{
        getusers(){
          var e={}
          e.courseid=this.query.courseid
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU5PM', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.users=res.data.rows
          })
        },
        getmusic(){
          var e={}
          e.cid=this.query.cid
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU5QM', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              if(res.data.rows[0]){
                  this.music=JSON.parse(res.data.rows[0])
              }
          })
        },
        getparts(){
          var e={}
          e.sid=this.query.sid
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU5QH', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              if(res.data.rows[0]){
                  this.parts=JSON.parse(res.data.rows[0])
              }
          })
        }
    }
}
</script>

<style>   
   
</style>
