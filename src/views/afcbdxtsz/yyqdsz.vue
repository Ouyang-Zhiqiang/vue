<template>
  <div id="container" style="padding:15px">

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="预约签到设置">
        <el-row :gutter="10" type="flex" justify="center">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple" style="height:500px">
              <el-form ref="form" :model="form" label-width="220px">
                <el-form-item label="会员预约需提前时间(团课)">
                  <el-input v-model="form.orderpretime" style="width:250px" />&nbsp;小时
                </el-form-item>
                <el-form-item label="会员可自主取消预约时间(团课)">
                  <el-input v-model="form.orderusercanceltime" style="width:250px" />&nbsp;小时
                </el-form-item>
                <el-form-item label="团课人数不足自动取消时间">
                  <el-input v-model="form.orderautocanceltime" style="width:250px" />&nbsp;小时
                </el-form-item>
                <el-form-item label="会员预约需提前时间(私教)">
                  <el-input v-model="form.orderpreprivtime" style="width:250px" />&nbsp;小时
                </el-form-item>
                <el-form-item label="会员可自主取消预约时间(私教)">
                  <el-input v-model="form.orderusercancelprivtime" style="width:250px" />&nbsp;小时
                </el-form-item>
                <el-form-item label="会员最多可预约天数">
                  <el-input-number v-model="form.ordermaxday" style="width:250px" />&nbsp;天
                </el-form-item>
                <el-form-item label="自动签到">
                  <el-radio-group v-model="form.signauto" :min="1" style="float:left;margin-top:10px;">
                    <el-radio :label="1">课程开始自动签到</el-radio>
                    <el-radio :label="2">下课</el-radio>
                  </el-radio-group><br>
                  <el-input-number v-model="form.signclassoverhour" style="width:230px" />&nbsp;小时
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateCompany">保存</el-button>
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
                OrderPreTime:'',          //会员预约需提前时间（团课）
                OrderUserCancelTime:'',   //会员可自主取消预约时间（团课）
                OrderAutoCancelTime:'',   //团课人数不足自动取消时间
                OrderPrePrivTime:'',        //会员预约需提前时间（私教）
                OrderUserCancelPrivTime:'', //会员可自主取消预约时间（私教）
                OrderMaxDay:'',             //会员最多可预约天数
                SignAuto:'',                //自动签到（课程开始签到：1；下课自动签到：2）
                SignClassOverHour:''        //自动签到-下课几小时后自动签到
            },
            num1: 1
        }
    },
    mounted() {
    },
    created(){
      this.getCompany()
    },
    methods:{
        getCompany(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG23UR', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.form=res.data.rows[0]
            console.log(this.form)
          })
        },
        updateCompany(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEV5GQ', this.$qs.stringify(this.form), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
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
