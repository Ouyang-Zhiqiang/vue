<template>
  <div id="container" style="padding:15px;padding-top:25px;">
    
    <div style="width:650px;margin-left:25%;margin-top:40px;">
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

        <el-form-item v-show="showNow" label="基本信息">
          <img :src="user.imgurl" style="width:70px;height:70px;border-radius:50%;float:left">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ user.name }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span v-show="user.name==0">男</span><span v-show="user.name==1">女</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ user.tel }}</span>
        </el-form-item>

        <!-- <el-form-item label="当前排名分">
                <el-input
                placeholder=""
                :value="form.currentpoints1"
                :disabled="true" style="width:300px">
                </el-input>
            </el-form-item> -->
            
        <el-form-item label="排名分">
          <div style="width:300px;height:150px;border:1px #cccccc solid;">
            <div style="margin-top:15px;margin-left:15px;">
              <span style="font-size:25px;">+</span>
              <el-input v-model="form.add" placeholder="" style="width:200px;" :input="tochange()" />
            </div>
            <div style="margin-top:15px;margin-left:15px;">
              <span style="font-size:39px">-</span>
              <el-input v-model="form.pre" placeholder="" style="width:200px" :input="tochange()" />
            </div>
          </div>
        </el-form-item>
            
        <!-- <el-form-item label="更改后排名分">
                <el-input
                placeholder=""
                :value="form.surpluspoints1"
                :disabled="true" style="width:300px">
                </el-input>
            </el-form-item> -->
        <el-form-item label="备注">
          <el-input v-model="form.remarks" type="textarea" style="width:300px" />
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
          userid:'',
          currentpoints1:0,
          currentpoints:0,
          points:0,
          add:0,
          pre:0,
          gamepoints:0,
          surpluspoints:0,
          surpluspoints1:0,
          actionstate:'',
          remarks:''
        }
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    onLoad(){
      this.getAllUsers()
    },
    methods:{
      tochange(){
        if(this.form.add>0&&this.form.pre>0){
            this.$message.error('错了哦，这是一条错误消息');
          }else if(this.form.add>0&&this.form.pre==0){
            this.form.points=this.form.add
            this.form.surpluspoints1=parseInt(this.form.add)+parseInt(this.form.currentpoints1)
          }else if(this.form.add==0&&this.form.pre>0){
            this.form.points=this.form.pre
            this.form.surpluspoints1=parseInt(this.form.currentpoints1)-parseInt(this.form.points)
          }else if(this.form.add<0||this.form.pre<0){
            this.$message.error('错了哦，这是一条错误消息');
          }
      },
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
      updateGamePoints(e){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW6MD', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
           location.reload()
          }, 100);
        });
      },
      insertGamePoints(e){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW6LO', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            location.reload()
          }, 100);
        });
      },
      onSubmit() {
        if(this.form.add>0&&this.form.pre>0){
            this.$message.error('错了哦，这是一条错误消息');
          }else if(this.form.add>0&&this.form.pre==0){
            this.form.points=this.form.add
            this.form.actionstate='+'
            this.form.surpluspoints=parseInt(this.form.add)+parseInt(this.form.currentpoints)
            if(this.form.currentpoints>0){
              this.updateGamePoints(this.form)
            }else if(this.form.currentpoints==0){
                this.insertGamePoints(this.form)
            }
          }else if(this.form.add==0&&this.form.pre>0){
            this.form.points=0-this.form.pre
            this.form.actionstate='-'
            this.form.surpluspoints=parseInt(this.form.currentpoints)+parseInt(this.form.points)
            if(this.form.currentpoints>0){
              this.updateGamePoints(this.form)
            }else if(this.form.currentpoints==0){
              if(this.form.pre>0){
                this.$message.error('比赛积分为负了');
              }else{
                this.insertGamePoints(this.form)
              }
            }
          }else if(this.form.add<0||this.form.pre<0){
            this.$message.error('错了哦，这是一条错误消息');
          }
      },
      querySearchAsync(queryString, cb) {
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        // clearTimeout(this.timeout);
        // this.timeout = setTimeout(() => {
        //   cb(results);
        // }, 3000 * Math.random());
        var data={}
        data.name=queryString
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAD8', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          var results=res.data.rows
          cb(results)
        });
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAR9', this.$qs.stringify(item), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.user=res.data.rows[0]
          this.form.currentpoints=this.user.currentpoints
          this.form.currentpoints1=this.user.points
          this.form.userid=this.user.userid
          if(res.data.rows.length){
            this.showNow=true
          }
        });
      },
      loadAll() {
        return [];
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
