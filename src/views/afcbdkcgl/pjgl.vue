<template>
  <div id="container" style="padding:15px">
    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="评价管理">
        <el-select v-model="selectForm.coachid" placeholder="教练">
          <el-option
            v-for="item in options1"
            :key="item.userid"
            :label="item.name"
            :value="item.userid"
          />
        </el-select>

        <el-button type="success" @click="clickSearchs">搜索</el-button>
        <el-button type="success">导出Excel</el-button>
                
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="评价">
            <template slot-scope="scope">
              <span>{{ scope.row.contents }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="评价人" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.createdname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="课程" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.coursename }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="教练" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.coachname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="状态" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.isshow==true">已显示</span>
              <span v-if="scope.row.isshow==false">已隐藏</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.createdon }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button v-if="scope.row.isshow==true" type="text" @click="updateToDisEn(scope.row.isshow,scope.row.commentid,scope.$index)">隐藏</el-button>
              <el-button v-else-if="scope.row.isshow==false" type="text" @click="updateToDisEn(scope.row.isshow,scope.row.commentid,scope.$index)">显示</el-button>
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
      }
    }
  },
  mounted() {

   },
  created(){
    this.getAllCoach()
    this.getAllComment(this.listQuery)
  },
  methods: {
    getAllCoach(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW860', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          var obj = {userid:'A', name:'全部教练'}
          this.options1=res.data.rows
          this.options1.unshift(obj)
      })
    },
    getAllComment(data){
      this.listLoading=true
      if(this.selectForm.coachid==''){
        data.coachid='A'
      }else{
        data.coachid=this.selectForm.coachid
      }
      data.page=this.listQuery.page-1
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVEHN', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.rows[0].counts
          this.listLoading=false
      })
    },
    clickSearchs(){
      this.listQuery.page=1
      this.getAllComment(this.listQuery)
    },
    updateToDisEn(e, id, index){
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
    }
  }
}

</script>

<style scoped>
.el-button{
    margin-top: 5px;
}

</style>
