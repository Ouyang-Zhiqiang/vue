<template>
  <div id="container" style="padding:15px">

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="预约签到设置">
        <el-row :gutter="10" type="flex" justify="center">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple" style="height:500px">
              <el-form ref="form" :model="form" label-width="230px">
                <el-form-item label="绑定手机送积分">
                  <el-input v-model="form.pointsbindmobile" style="width:250px" />&nbsp;个
                </el-form-item>
                <el-form-item label="团课签到送积分">
                  <el-input v-model="form.pointsteamsign" style="width:250px" />&nbsp;个/次 
                </el-form-item>
                <el-form-item label="私教签到送积分">
                  <el-input v-model="form.pointsprivsign" style="width:250px" />&nbsp;个/次 
                </el-form-item>
                <el-form-item label="会员评价送积分">
                  <el-input v-model="form.pointscomment" style="width:250px" />&nbsp;个/次 
                </el-form-item>
                <el-form-item label="取消预约扣积分">
                  <el-input v-model="form.pointscancelpre" style="width:250px" />&nbsp;个/次 
                </el-form-item>
                <el-form-item label="推荐一人并注册奖励积分">
                  <el-input v-model="form.pointsrefreg" style="width:250px" />&nbsp;个
                </el-form-item>
                <el-form-item label="被推荐人消费后，推荐人获得消费金额对应积分(单位：%)">
                  <el-input v-model="form.pointsregusercon" style="width:250px;margin-top:20px" />&nbsp;个
                </el-form-item>

                <el-form-item>
                  <el-button type="success" @click="updateCompany">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
    data(){
        return{ 
            radio:'课程开始自动签到',
            form: {
            }
        }
    },
    mounted() {
    },
    created(){
      this.getCompany()
    },
    methods:{
        handleChange(value) {
            console.log(value)
        },
        getCompany(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG23UR', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.form=res.data.rows[0]
          })
        },
        updateCompany(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG23W1', this.$qs.stringify(this.form), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
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
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
