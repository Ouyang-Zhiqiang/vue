<template>
  <div id="container" style="padding:15px;padding-top:25px;">
    
    <div style="width:800px;margin-left:15%;margin-top:40px;">
      <el-form label-width="100px">

        <i class="el-icon-circle-plus" style="font-size:30px;position:fixed;top:370px;right:200px;cursor:pointer" @click="toadd" />

        <el-form-item label="基本信息">
          <img :src="form.imgurl" style="width:70px;height:70px;border-radius:50%;float:left">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ form.name }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ form.tel }}</span>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="form.title" style="width:300px" />
        </el-form-item>
        <el-form-item label="训练内容">
          <div v-for="(item,index) in content" :key="index">
            <el-input v-model="item.action" placeholder="动作" style="width:150px;padding-right:5px;padding-top:8px" />
            <el-input v-model="item.quantity" placeholder="数量" style="width:150px;padding-right:5px;padding-top:8px" />
            <el-input v-model="item.descs" placeholder="描述" style="width:300px;padding-right:5px;padding-top:8px" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        restaurants: [],
        state: '',
        timeout:  null,
        results:[],
        showNow:false,
        user:{},
        form: {
          userid:''
        },
        selectedCardno:'',
        cardlist:[],
        content:[{action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}],
        query:{}
      }
    },
    created(){
        this.form=this.$route.query.item
        // console.log(this.form)
        this.content=JSON.parse(this.form.context)
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    onLoad(){
      this.getAllUsers()
    },
    methods:{
      getUsers(e){
        var data={name:''}
        data.name=e
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAD8', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.jfarr=res.data.rows
          this.listLoading=false
        });
      },
      getAllUsers(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAI3', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.results=res.data.rows
        });
      },
    
      onSubmit() {
        // console.log(this.form)
        this.form.context=JSON.stringify(this.content)
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNOIAK', this.$qs.stringify(this.form), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
        });
      },
      querySearchAsync(queryString, cb) {
        var data={}
        data.name=queryString
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAD8', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          var results=res.data.rows
          // console.log(results)
          cb(results)
        });
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.selectedCardno=''
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAR9', this.$qs.stringify(item), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.user=res.data.rows[0]
        //   console.log(this.user)
          if(res.data.rows.length){
            this.showNow=true
          }
        });
      },
      loadAll() {
        return [];
      },
      yycourse(e){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHI9', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.form={}
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
          this.$router.push({
              path:'/afcbdyyqd/afcbdyyqd',
              query: {
              }
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
      });
      },
      toadd(){
        for (let index = 0; index < 5; index++) {
            var obj={action:'', quantity:'', descs:''}
            this.content.push(obj)
        }
      },
      selectMyCourse(){
        this.$router.push({
          path:'/afcbdkcgl/grsj',
          query: {
            item: this.user.userid
          }
        })
      }
    }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
