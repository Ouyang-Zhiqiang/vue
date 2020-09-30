<template>
  <div id="container" style="padding:15px">
    <el-button type="success" style="margin-top:5px;" @click="open">新增品类</el-button>
    <el-dialog title="新增品类" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
      <el-form :model="form">
        <el-form-item label="类别名称" :label-width="formLabelWidth" required>
          <el-input v-model="form.name" style="width:270px;float:left" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toTrue()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑品类" :visible.sync="dialogFormVisible2" style="width:1200px;margin:0 auto">
      <el-form :model="updateform">
        <el-form-item label="类别名称" :label-width="formLabelWidth">
          <el-input v-model="updateform.name" style="width:270px;float:left" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="toTrue()">确 定</el-button>
      </div>
    </el-dialog>
    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="品类列表">
        
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="品类编号" width="400">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="400" label="品类名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="操作" width="400">
            <template slot-scope="scope">
              <el-button type="text" @click="toOpen(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    data(){
        return{ 
          list:[],
          listLoading:false,
          form:{},
          updateform:{id:'', name:''},
          dialogFormVisible:false,
          formLabelWidth:'150px',
          dialogFormVisible2:false
        }
    },
    mounted() {
   
    },
    created(){
        this.getAllgoods()
    },
    methods:{
      getAllgoods(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNFMAJ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
        });
      },
      open(){
        this.dialogFormVisible=true
      },
      toTrue(){
        var data={}
        data.name=this.form.name
        data.id=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNGAB3', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.dialogFormVisible=false
        this.getAllgoods()
        this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
      });
      },
      toOpen(e){
          this.updateform.name=e.name
          this.updateform.id=e.id
          console.log(this.updateform)
          this.dialogFormVisible2=true
      },
      update(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNGAC3', this.$qs.stringify(this.updateform), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.dialogFormVisible2=false
            this.getAllgoods()
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
    
</style>
