<template>
  <div id="container" style="padding:15px">
    <el-tabs type="border-card">
      <el-tab-pane label="教练信息列表">
        <el-button type="success">导出Excel</el-button>
        <el-button type="success">新增教练</el-button>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="教练" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="150" label="照片数量">
            <template>
              <span>1</span>
            </template>
          </el-table-column>

          <el-table-column width="400" align="center" label="简介">
            <template slot-scope="scope">
              <span>{{ scope.row.intrtext }}</span>
            </template>
          </el-table-column>

          <el-table-column width="150" label="评价数量" align="center">
            <template>
              <span>0</span>
            </template>
          </el-table-column>

        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAllCoach" />

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
          total:0,
          listQuery: {
            page: 1,
            limit:20
          },
          listLoading:false
        }
    },
    mounted() {
      
    },
    created(){
      this.getAllCoach(this.listQuery)
    },
    methods:{
      getAllCoach(data){
        this.listLoading=true
        data.page=this.listQuery.page-1
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVJF6', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.rows[0].counts
          this.listLoading=false
        });
      }
    }
}
</script>

<style scoped>
    
</style>
