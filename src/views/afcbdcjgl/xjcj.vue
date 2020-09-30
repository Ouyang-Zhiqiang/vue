<template>
  <div id="container" style="padding:15px">
    <el-tabs type="border-card" style="margin-top:20px;">
      <el-tab-pane label="基本设置" style="padding:20px">   
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.luckdrawname" style="width:270px;float:left" />
          </el-form-item>

          <el-form-item label="活动开始时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.starttime"
              type="date"
              placeholder="开始时间"
              style="width:270px;"
              @change="topase1()"
            />
          </el-form-item>

          <el-form-item label="活动截止时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.endtime"
              type="date"
              placeholder="截止时间"
              style="width:270px;"
              @change="topase2()"
            />
          </el-form-item>

          <el-form-item label="最多中奖次数" :label-width="formLabelWidth">
            <el-input v-model="form.winningtimes" style="width:270px;float:left" />
          </el-form-item>

          <el-form-item label="分享标题" :label-width="formLabelWidth">
            <el-input v-model="form.sharetitle" style="width:270px;float:left" />
          </el-form-item>

          <el-form-item label="分享描述" :label-width="formLabelWidth">
            <el-input v-model="form.luckdrawdescription" style="width:270px;float:left" />
          </el-form-item>

          <el-form-item label="活动规则" :label-width="formLabelWidth">
            <el-input
              v-model="form.activityrules"
              style="width:270px;float:left;"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="抽奖设置">   
        <div v-for="(item,index) in prizeList" :key="index" style="width:250px;height:250px;border:1px solid #e6e6e6;float:left;padding:14px;margin-top:10px;margin-left:10px">
          <span style="font-size:13px">{{ item.lvname }}</span>
          <el-input v-model="item.name" style="width:220px;margin-top:8px;margin-bottom:12px" />
          <span style="font-size:13px">数量</span>
          <el-input v-model="item.count" style="width:220px;margin-top:8px;margin-bottom:12px" />
          <span style="font-size:13px">中奖率</span>
          <el-input v-model="item.rate" style="width:220px;margin-top:8px" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-button type="success" style="margin:40px auto;width:120px" @click="toTrue()">保存</el-button>
  </div>

</template>

<script>
import { Input } from 'element-ui'
import data from '../pdf/content';
import { fetchList } from '@/api/hy';
import Pagination from '@/components/Pagination';
export default {
  components: { Pagination },
  data() {
    return {
        form:{},
        formLabelWidth:'200px',
        prizeList:[
            {lv:'1', lvname:'一等奖奖品', name:'', count:'', rate:''},
            {lv:'2', lvname:'二等奖奖品', name:'', count:'', rate:''},
            {lv:'3', lvname:'三等奖奖品', name:'', count:'', rate:''},
            {lv:'4', lvname:'四等奖奖品', name:'', count:'', rate:''},
            {lv:'5', lvname:'五等奖奖品', name:'', count:'', rate:''},
            {lv:'6', lvname:'六等奖奖品', name:'', count:'', rate:''},
            {lv:'7', lvname:'七等奖奖品', name:'', count:'', rate:''},
            {lv:'0', lvname:'未中奖', name:'', count:'', rate:''}
        ]
    }
  },
  mounted() {

   },
  created(){
    
  },
  methods: {
    toTrue(){
      this.form.awardsetting=JSON.stringify(this.prizeList)
      this.form.createdname=localStorage.getItem('username')
      this.form.lastedname=localStorage.getItem('username')
      // console.log(this.form)
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNXH7D', this.$qs.stringify(this.form), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
          })
          this.$router.push({
          path:'/afcbdcjgl/cjhdlb'
          
          })
          // this.form={}
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    topase1(){
      this.form.starttime=this.form.starttime.toLocaleDateString().replace(/\//g, '-')
    },
    topase2(){
        this.form.endtime=this.form.endtime.toLocaleDateString().replace(/\//g, '-')
      }
  }
}

</script>

<style scoped>

</style>
