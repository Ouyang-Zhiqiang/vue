<template>
  <div id="container" style="padding:15px">
    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="动作库管理">
        <!-- <el-input  placeholder="关键词" style="width:180px;margin-top:5px" />
        <el-button type="success" @click="clickSearchs">搜索</el-button> -->
        <el-button type="success" @click="toOpen()">新增训练表现</el-button>
        <el-button type="success">导出Excel</el-button>
        <el-dialog title="新增训练表现" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
          <el-form :model="insertForm">
            <el-form-item label="训练表现名称" :label-width="formLabelWidth">
              <el-input v-model="insertForm.grades" style="width:270px;float:left" />
            </el-form-item>
           
            <el-form-item label="推送文案" :label-width="formLabelWidth">
              <el-input
                v-model="insertForm.reviews"
                style="width:270px;float:left;height:100px"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="toTrueClose()">确 定</el-button>
          </div>
        </el-dialog>
                
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="等级名称" width="350">
            <template slot-scope="scope">
              <span>{{ scope.row.grades }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="推送文案" width="650">
            <template slot-scope="scope">
              <span>{{ scope.row.reviews }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="350">
            <template slot-scope="scope">
              <el-button type="text" @click="toOpen2(scope.row)">编辑</el-button>
              <el-dialog title="训练表现编辑" :visible.sync="dialogFormVisible2" style="width:1200px;margin:0 auto">
                <el-form :model="updateForm">
                  <el-form-item label="训练表现名称" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.grades" style="width:270px;float:left" />
                  </el-form-item>
                
                  <el-form-item label="推送文案" :label-width="formLabelWidth">
                    <el-input
                      v-model="updateForm.reviews"
                      style="width:270px;float:left;height:100px"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                    />
                  </el-form-item>
                  
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="toTrueClose2()">确 定</el-button>
                </div>
              </el-dialog>
              
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
  },
  methods: {
    
    getAllComment(data){
      this.listLoading=true
      data.page=this.listQuery.page-1
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWV6DW', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
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
      this.insertForm.id=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
      var data = this.insertForm
      this.dialogFormVisible=false
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWV6FG', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
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
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWV6E8', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    teDelete(data, index){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWV6ES', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
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
