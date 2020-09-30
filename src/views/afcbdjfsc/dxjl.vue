<template>
  <div id="container" style="padding:15px">
    <el-button>全部运动馆</el-button>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="兑现记录">
        <el-date-picker
          v-model="datevalue1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        />
        <el-input v-model="selectForm.name" placeholder="商品名称" style="width:180px;margin-top:5px" />
        <el-button type="success" style="margin-top:5px;" @click="clickSearch">搜索</el-button>
        <el-button type="success" style="margin-top:5px;">导出Excel</el-button>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          
          <el-table-column width="150" align="center" label="积分商品名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="150" label="会员" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.username }}</span>
            </template>
          </el-table-column>

          <el-table-column width="150" label="手机号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userphone }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="运动馆" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.storename }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.createdon }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="操作人" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.createdname }}</span>
            </template>
          </el-table-column>

        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAllSp" />

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
          datevalue1:'',
          listLoading:false,
          theAllStores:[],
          list:[],
          total:0,
          listQuery: {
            page: 1,
            limit:20
          },
          selectForm:{
            name:''
          }
        }
    },
    mounted() {
   
    },
    created(){
      this.getAllSp(this.listQuery)
    },
    methods:{
      getAllSp(data){
        if(this.selectForm.name==''){
          data.name='A'
        }else{
          data.name=this.selectForm.name
        }
        this.listLoading=true
        data.page=this.listQuery.page-1
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1VPK', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.rows[0].counts
          this.listLoading=false
        });
      }, 
      clickSearch(){
        this.listQuery.page=1
        this.getAllSp(this.listQuery)
      }
    }
}
</script>

<style scoped>
    
</style>
