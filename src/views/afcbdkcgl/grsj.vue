<template>
  <div id="container" style="padding:15px">
  
    <el-dialog title="评价" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
      <el-form :model="updateForm">
        <el-form-item label="评价">
          <el-input v-model="updateForm.feedback" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toTrueClose2()">确 定</el-button>
      </div>
    </el-dialog>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="个人私教">
                
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="姓名" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="手机号" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.tel }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="标题" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="课程内容" width="450">
            <template slot-scope="scope">
              <span>{{ scope.row.context }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="评价" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.feedback }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="290">
            <template slot-scope="scope">
              <el-button type="text" @click="toconcle(scope.row)">评价</el-button>
              <el-button type="text" @click="toupdate(scope.row)">编辑</el-button>
              <el-button type="text" @click="teDelete(scope.row,scope.$index)">删除</el-button>
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
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      mylist:[],
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
        
      },
      categorys:[],
      strengths:[],
      units:[],
      query:{},
      imgurl:''
    }
  },
  mounted() {
    
  },

  created(){
    this.query=this.$route.query.item
    this.imgurl=this.$route.query.item2
    // console.log(this.imgurl)
    this.getAllComment(this.listQuery)
    this.getCategory()
    this.getStrength()
    this.getUnits()
    this.getAll()
  },
  methods: {
    getAll(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBZCZ0', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.mylist=res.data.rows 
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
    getCategory(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWTWHF', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.categorys=res.data.rows
      })
    },
    getStrength(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWTWHU', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.strengths=res.data.rows
      })
    },
    getUnits(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU1C1', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.units=res.data.rows
      })
    },
    getAllComment(data){
      this.listLoading=true
      data.page=this.listQuery.page-1
      data.limit=this.listQuery.limit
      data.userid=this.query
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNOIB1', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.list=res.data.rows
        this.total=res.data.rows[0].counts
        this.listLoading=false
      })
    },
    clickSearchs(){
      this.listQuery.page=1
      this.getAllComment(this.listQuery)
    },
    updateToDisEn(){
      var status=true
      if(e==true){
        status=false
        this.updateStatus(status, id, index);
      }else if(e==false){
        status=true
        this.updateStatus(status, id, index);
      }
    },
    updateStatus(e, id, index){
      var data={
        isshow:e,
        commentid:id
      }
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1WEG', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.list[index].isshow=e
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    toOpen(){
      this.insertForm={}
      this.dialogFormVisible=true
    },
    toOpen2(item){
        this.dialogFormVisible2=true
        this.updateForm=item
    },
    toTrueClose(){
      var data = this.insertForm
      this.dialogFormVisible=false
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWTWDE', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.list.unshift(this.insertForm)
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    //编辑
    toTrueClose2(){
      var data = this.updateForm
      this.dialogFormVisible=false
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNOXUU', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    teDelete(data, index){
      // console.log(index)
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNORBQ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.getAllComment(this.listQuery)
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    toupdate(e){
      e.imgurl=this.imgurl
      console.log(e)
      this.$router.push({
        path:'/afcbdkcgl/updatesj',
        query: {
          item: e
        }
      })
    },
    toconcle(e){
      this.dialogFormVisible = true
      this.updateForm = e
    }
  }
}

</script>

<style scoped>
.el-button{
    margin-top: 5px;
}

</style>
