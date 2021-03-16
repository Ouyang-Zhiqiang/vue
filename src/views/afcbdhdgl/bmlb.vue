<template>
  <div id="container" style="padding:15px">
    

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="报名列表">          
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="姓名" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="电话" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.tel }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="性别" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.sex==1">男</span>
              <span v-if="scope.row.sex==0">女</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="人数" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.number }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="费用" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.totalfee }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="活动" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.acname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="付款时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.createdtime }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="备注" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>
         
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAllComment" />

      </el-tab-pane>
    </el-tabs>

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
      storeid:[],
      updateStoreid:[],
      dialogFormVisible:false,
      dialogFormVisible2:false,
      formLabelWidth:'150px',
      kcmcinput:'',
      list:[],
      total:0,
      listQuery: {
        page: 1,
        limit:20
      },
      clickSearch:false,
      listLoading:false,
      options1:[],
      selectForm:{
        coachid:''
      },
      updateForm:{
      },
      insertForm:{
        name:'',
        pnumber:'',
        cost:'',
        stores:[],
        starttime:'',
        endtime:''
      },
      categorys:[],
      strengths:[],
      units:[],
      theAllStores:[],
      query:{}
    }
  },
  mounted() {

   },
  created(){
    this.query=this.$route.query.item
    this.getAllComment(this.listQuery)
    this.getAllStore2()
  },
  methods: {
    getAllStore2(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.theAllStores=res.data.rows
      });
    },
    getAllComment(data){
      this.listLoading=true
      data.page=this.listQuery.page-1
      data.limit=this.listQuery.limit
      data.activityid=this.query.id
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLN9TWU', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          if(res.data.rows.length==0){
              this.list=[]
              this.listLoading=false
          }else{
            this.list=res.data.rows
            this.total=res.data.rows[0].counts
            this.listLoading=false
          }
      })
    },
    clickSearchs(){
      this.listQuery.page=1
      this.getAllComment(this.listQuery)
    }
    
  }
}

</script>

<style scoped>
.el-button{
    margin-top: 5px;
}

</style>
