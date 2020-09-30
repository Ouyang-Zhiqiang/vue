<template>
  <div id="container" style="padding:15px;padding-top:25px;">
    
    <div style="width:650px;margin-left:25%;margin-top:60px;">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="团队名称">
          <el-input v-model="form.name" style="width:300px" placeholder="六字以内" />
        </el-form-item>
        <el-form-item label="教练">
          <el-select v-model="form.coachId" placeholder="请选择教练" style="width:300px">
            <el-option v-for="item in allCoachs" :key="item.userid" :label="item.name" :value="item.userid" />
          </el-select>
        </el-form-item>
        <el-form-item label="场馆">
          <el-select v-model="form.storeId" placeholder="请选择场馆" style="width:300px">
            <el-option v-for="item in allStores" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-top:20px" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        allCoachs:[],
        allStores:[],
        form:{
            name:'',
            storeId:'',
            coachId:''
        }
      }
    },
    mounted() {
      
    },
    created(){
      this.getAllCoach()
      this.getAllStore()
    },
    methods:{
      onSubmit() {
        this.addClan(this.form)
      },
      getAllStore(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.allStores=res.data.rows
        });
      },
      getAllCoach(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW860', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.allCoachs=res.data.rows
        });
      },
      addClan(e){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW6OP', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.allStores=res.data.rows
          this.form.name=''
          this.coachId=''
          this.storeId=''
          this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
        });
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
