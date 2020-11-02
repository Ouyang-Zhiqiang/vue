<template>
  <div id="container" style="padding:15px;padding-top:25px;">
    
    <div style="width:800px;margin-left:15%;margin-top:40px;">
      <el-form label-width="100px">
        <el-form-item label="姓名">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            style="width:300px;"
            @select="handleSelect"
          />
        </el-form-item>

        <i class="el-icon-circle-plus" style="font-size:30px;position:fixed;top:370px;right:200px;cursor:pointer" @click="toadd" />

        <el-form-item v-show="showNow" label="基本信息">
          <img :src="user.imgurl" style="width:70px;height:70px;border-radius:50%;float:left">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ user.name }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span v-show="user.sex==0">男</span><span v-show="user.sex==1">女</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ user.tel }}</span>
          <el-button type="success" size="mini" style="margin-left:40px" @click="selectMyCourse">查看私教</el-button>
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
        content:[{action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}]
      }
    },
    created(){
 
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
        this.form.userid=this.user.userid
        // console.log(this.form)
        this.form.context=JSON.stringify(this.content)
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNOI9U', this.$qs.stringify(this.form), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.form.context=''
            this.form.title=''
            this.content=[{action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}, {action:'', quantity:'', descs:''}]
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
            item: this.user.userid,
            item2:this.user.imgurl
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
