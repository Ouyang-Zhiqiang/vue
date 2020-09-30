<template>
  <div id="container" style="padding:15px">
    <el-dialog title="banner编辑" :visible.sync="dialogFormVisible2" style="width:1200px;margin:0 auto">
      <el-form :model="updateForm">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="updateForm.name" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="可报人数" :label-width="formLabelWidth">
          <el-input v-model="updateForm.pnumber" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="报名费用" :label-width="formLabelWidth">
          <el-input v-model="updateForm.cost" style="width:270px;float:left" />
        </el-form-item>
           
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="toTrueClose2()">确 定</el-button>
      </div>
    </el-dialog>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="活动列表">
        <el-button type="success" @click="toOpen()">新增banner</el-button>
        <el-button type="success">导出Excel</el-button>
        <el-dialog title="新增banner" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
          <el-form :model="insertForm">
            <el-form-item label="banner上传:" :label-width="formLabelWidth">
              <el-upload
                action="https://www.facebodyfitness.com/uploadimg"
                name="upload_file"
                list-type="picture-card"
                :on-success="handleSuccess"
                style="float:left;width:100px;margin-left:15px"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </el-form-item>
            <el-form-item label="活动" :label-width="formLabelWidth">
              <el-input v-model="insertForm.activityname" style="width:270px;float:left" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="toTrueClose()">确 定</el-button>
          </div>
        </el-dialog>
                
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="banner地址" width="350">
            <template slot-scope="scope">
              <a :href="scope.row.resurl" target="_blank"><img :src="scope.row.resurl" width="30" height="30"></a>
            </template>
          </el-table-column>

          <el-table-column align="center" label="绑定活动" width="300">
            <template slot-scope="scope">
              <el-select v-model="scope.row.activityid" style="width:200px;display:inline" placeholder="无绑定" @change="tochange(scope.row)">
                <el-option v-for="item in aclist" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="290">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="toOpen2(scope.row)">编辑</el-button> -->
              
              <el-button v-if="scope.row.isshow==false" type="text" @click="toShow(scope.row)">显示</el-button>
              <el-button v-if="scope.row.isshow==true" type="text" @click="toShow(scope.row)">隐藏</el-button>
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
      aclist:[],
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
    this.getAllactivity()
  },
  methods: {
    handleSuccess(file){
      var arr=file.split(',')
      var obj={}
      obj.resurl=arr[0]
      obj.resname=arr[1]
      this.insertForm=obj
    },
    getAllactivity(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBZBMN', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          if(res.data.rows.length==0){
              this.aclist=[]
              this.listLoading=false
          }else{
            this.aclist=res.data.rows
            var obj={}
            obj.id=''
            obj.name='无绑定'
            this.aclist.unshift(obj)
            this.listLoading=false
          }
      })
    },
    getAllComment(data){
      this.listLoading=true
      data.page=this.listQuery.page-1
      data.limit=this.listQuery.limit
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBZB1U', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          if(res.data.rows.length==0){
              this.list=[]
              this.listLoading=false
          }else{
            this.list=res.data.rows
            this.total=res.data.rows[0].count
            this.listLoading=false
          }
      })
    },
    tochange(e){
      console.log(e)
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBZB4L', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
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
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBZB3I', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.dialogFormVisible=false
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
        this.listQuery.page=1
        this.getAllComment(this.listQuery)
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    //编辑
    toTrueClose2(){
      var data = this.updateForm
      this.dialogFormVisible2=false
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBYYCE', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
        this.listQuery.page=1
        this.getAllComment(this.listQuery)
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    teDelete(data, index){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBYYCM', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
        this.listQuery.page=1
        this.getAllComment(this.listQuery)
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    toShow(e){
      if(e.isshow==false){
        e.isshow=true
      }else{
        e.isshow=false
      }
      this.tochange(e)
    }
  }
}

</script>

<style scoped>
.el-button{
    margin-top: 5px;
}

</style>
