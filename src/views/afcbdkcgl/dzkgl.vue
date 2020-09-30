<template>
  <div id="container" style="padding:15px">
  
    <el-dialog title="动作库编辑" :visible.sync="dialogFormVisible2" style="width:1200px;margin:0 auto">
      <el-form :model="updateForm">
        <el-form-item label="动作名称" :label-width="formLabelWidth">
          <el-input v-model="updateForm.name" style="width:270px;float:left" />
        </el-form-item>
        <!-- <el-form-item label="单位" :label-width="formLabelWidth">
          <el-select v-model="updateForm.unit" style="width:270px;float:left">
            <el-option v-for="item in units" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="updateForm.category" style="width:270px;float:left">
            <el-option v-for="item in categorys" :key="item.name" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="强度" :label-width="formLabelWidth">
          <el-select v-model="updateForm.strength" style="width:270px;float:left">
            <el-option v-for="item in strengths" :key="item.name" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="toTrueClose2()">确 定</el-button>
      </div>
    </el-dialog>
    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="动作库管理">
        <!-- <el-input  placeholder="关键词" style="width:180px;margin-top:5px" />
        <el-button type="success" @click="clickSearchs">搜索</el-button> -->
        <el-button type="success" @click="toOpen()">新增动作</el-button>
        <el-button type="success">导出Excel</el-button>
        <el-dialog title="新增动作" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
          <el-form :model="insertForm">
            <el-form-item label="动作名称" :label-width="formLabelWidth">
              <el-input v-model="insertForm.name" style="width:270px;float:left" />
            </el-form-item>
            <!-- <el-form-item label="单位" :label-width="formLabelWidth">
              <el-select v-model="insertForm.unit" style="width:270px;float:left">
                <el-option v-for="item in units" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="类别" :label-width="formLabelWidth">
              <el-select v-model="insertForm.category" style="width:270px;float:left">
                <el-option v-for="item in categorys" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="强度" :label-width="formLabelWidth">
              <el-select v-model="insertForm.strength" style="width:270px;float:left">
                <el-option v-for="item in strengths" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="toTrueClose()">确 定</el-button>
          </div>
        </el-dialog>
                
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="动作名称" width="350">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column align="center" label="单位" width="250">
            <template slot-scope="scope">
                <span>{{ scope.row.unit }}</span>
            </template>
          </el-table-column> -->

          <el-table-column align="center" label="类别" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.category }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="强度" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.strength }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="290">
            <template slot-scope="scope">
              <el-button type="text" @click="toOpen2(scope.row)">编辑</el-button>
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
      units:[]
    }
  },
  mounted() {

   },
  created(){
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '电话', '卡名称', '开卡时间', '卡到期时间', '门店']
        const filterVal = ['name', 'tel', 'cardname', 'cardbegin', 'cardend', 'storename']
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
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWTVS5', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
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
      this.dialogFormVisible2=false
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWTWE2', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    teDelete(data, index){
      console.log(index)
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWTWE9', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.list.splice(index, 1)
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
.el-button{
    margin-top: 5px;
}

</style>
