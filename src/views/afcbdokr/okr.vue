<template>
  <div id="container" style="padding:8px">
    <el-button style="margin-bottom:10px" type="text" @click="toOpen">新增OKR</el-button>
    <!-- <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        Export Excel
      </el-button> -->

    <!-- <el-row :gutter="10">
            <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6"> -->
    <el-dialog title="新增OKR" :visible.sync="dialogFormVisible" style="margin:0 auto">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" style="float:left;width:70%" />
        </el-form-item>
        <el-form-item label="目标" :label-width="formLabelWidth">
          <el-input v-model="form.target" style="float:left;width:70%" />
        </el-form-item>
        <el-form-item label="起始日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.starttime"
            type="date"
            placeholder="起始日期"
            style="width:70%"
          />
        </el-form-item>
                   
        <el-form-item label="截止日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.endtime"
            type="date"
            placeholder="截止日期"
            style="width:70%"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toTrue()">确 定</el-button> 
      </div>
                    
    </el-dialog>
    <!-- </el-col>
        </el-row> -->
        

    <el-card v-for="(item,index) in list" :key="index" class="box-card" style="padding-bottom:8px;margin-bottom:12px">
      <div slot="header" class="clearfix">
        <span>{{ item.title }}</span>
        <el-button type="text" style="float: right; padding: 3px 0" @click="dialogVisible = true">删除</el-button>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>确定要删除这条OKR吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="toDelete(item)">确 定</el-button>
          </span>
        </el-dialog>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toupdate(item)">编辑</el-button>
      </div>
      <div style="width:98%;margin:0 auto;text-align:center;margin-bottom:8px;font-size:15px" class="">
        {{ item.current }}
      </div>
      <div style="width:98%;margin:0 auto" class="text item">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="item.targetround" color="rgba(142, 113, 199, 0.7)" />
      </div>
      <div style="width:98%;margin:0 auto;margin-top:20px;margin-bottom:5px" class="text item">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="item.dateround" status="success" />
      </div>
      <span style="float:left;margin-left:1.5%;font-size:11px">{{ item.starttime }}</span>
      <span style="float:right;margin-right:1.5%;font-size:11px">{{ item.endtime }}</span>
    </el-card>
  </div>
</template>

<script>
import { Input } from 'element-ui'
import data from '../pdf/content';


export default {
  name: 'ExportExcel',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
        list:[],
        form:{},
        dialogFormVisible:false,
        dialogVisible:false,
        formLabelWidth:'25%',
        downloadLoading: false,
        filename: '',
        autoWidth: true,
        bookType: 'xlsx',
        mylist:[]
    }
  },
  mounted() {

   },
  created(){
    this.getAllOkr()
    // this.getAll()
  },
  methods: {
    getAll(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBYZOA', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.mylist=res.data.rows 
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '电话', '卡名称', '消费', '时间']
        const filterVal = ['name', 'tel', 'cardname', 'sellingfee', 'createdon']
        const list = this.mylist
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },

    getAllOkr(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBXZU9', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows 
          this.list.forEach((item)=>{
              item.dateround=parseInt(item.dateround)
              if(item.dateround>=100){
                  item.dateround=100
              }
              if(item.targetround>=100){
                  item.targetround=100
              }
              if(item.dateround<=0){
                  item.dateround=0
              }
          })
      })
    },
    insertOkr(){
        this.form.id=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)+''
        this.form.starttime=this.form.starttime.toLocaleDateString().replace(/\//g, '-')
        this.form.endtime=this.form.endtime.toLocaleDateString().replace(/\//g, '-')
        console.log(this.form)
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBXZSJ', this.$qs.stringify(this.form), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
          this.form={}
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    toOpen(){
        this.dialogFormVisible=true
    },
    toTrue(){
        this.insertOkr()
        this.getAllOkr()
        this.dialogFormVisible=false
    },
    toupdate(e){
        this.$router.push({
          path:'/afcbdxtsz/updateokr',
          query: {
            item: e
          }
        })
    },
    toDelete(e){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBXZVM', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
          this.dialogVisible=false
          this.getAllOkr()
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    }
  }
}

</script>

<style scoped>
.el-button{
    margin-right:10px;
}
.el-dialog{
    width: 85%;
}
</style>
