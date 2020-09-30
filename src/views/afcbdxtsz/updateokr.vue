<template>
  <div id="container" style="padding:8px">
    <el-card class="box-card" style="padding-bottom:8px;margin-bottom:12px">
      <div slot="header" class="clearfix">
        <span>{{ okr.title }}</span>
      </div>
      <div style="width:98%;margin:0 auto;text-align:center;margin-bottom:8px;font-size:15px" class="">
        {{ okr.current }}
      </div>
      <div style="width:98%;margin:0 auto" class="text item">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="okr.targetround" color="rgba(142, 113, 199, 0.7)" />
      </div>
      <div style="width:98%;margin:0 auto;margin-top:20px;margin-bottom:5px" class="text item">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="okr.dateround" status="success" />
      </div>
      <span style="float:left;margin-left:1.5%;font-size:11px">{{ okr.starttime }}</span>
      <span style="float:right;margin-right:1.5%;font-size:11px">{{ okr.endtime }}</span>
    </el-card>

    <el-row :gutter="10" style="margin-top:40px">
      <div style="display: flex;justify-content: center;">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple-light">
            <el-form ref="form" :model="form" label-width="30%">
              <el-form-item label="标题">
                <el-input v-model="form.title" style="width:70%" />
              </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="30%">
              <el-form-item label="目标">
                <el-input v-model="form.target" style="width:70%" />
              </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="30%">
              <el-form-item label="当前值">
                <el-input v-model="form.current" style="width:70%" />
              </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="30%">
              <el-form-item label="起始日期">
                <el-date-picker
                  v-model="form.starttime"
                  type="date"
                  placeholder="起始日期"
                  style="width:70%"
                  @change="topase1"
                />
              </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="30%">
              <el-form-item label="截止日期">
                <el-date-picker
                  v-model="form.endtime"
                  type="date"
                  placeholder="截止日期"
                  style="width:70%"
                  @change="topase2"
                />
              </el-form-item>
            </el-form>
          </div>
          <el-button type="success" style="margin-left:30%" @click="toupdate">确认修改</el-button>
        </el-col>
      </div>
    </el-row>
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
        query:{},
        okr:{},
        form:{}
    }
  },
  mounted() {

   },
  created(){
    this.query=this.$route.query.item
    this.getOkr()
  },
  methods: {
    getOkr(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBY39D', this.$qs.stringify(this.query), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.okr=res.data.rows[0]
          this.form=this.okr
          if(this.okr.id){
              this.okr.dateround=parseInt(this.okr.dateround)
              if(this.okr.dateround>=100){
                  this.okr.dateround=100
              }
              if(this.okr.dateround>=100){
                  this.okr.targetround=100
              }
              if(this.okr.dateround<=0){
                  this.okr.dateround=0
              }
          }
      })
    },
    toupdate(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBXZUV', this.$qs.stringify(this.form), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
          this.getOkr()
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

<style>

</style>
