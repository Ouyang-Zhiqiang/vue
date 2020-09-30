<template>
  <div id="container" style="padding:15px">
    <el-button @click="clickButton1">全部运动馆</el-button>
    <el-button v-for="(item,index) in theAllStores" :key="index" @click="clickButton2(item.id)">{{ item.name }}</el-button>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="调货记录">
        <el-date-picker
          v-model="selectForm.datevalue"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        />
        <el-button type="success" style="margin-top:5px;">搜索</el-button>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.createdon }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="150" label="商品编号">
            <template slot-scope="scope">
              <span>{{ scope.row.goodscode }}</span>
            </template>
          </el-table-column>

          <el-table-column width="150" align="center" label="商品名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="150" label="规格" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.spec }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="颜色" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.colors }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="数量" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.changeamount }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="进价" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.changeprice }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="总价" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.allprice }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="备注" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="操作人" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.lastedname }}</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAlljl" />

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
            storeid:'',
            datevalue:''
          }
        }
    },
    mounted() {
   
    },
    created(){
      this.getAllStore2()
      this.getAlljl(this.listQuery)
    },
    methods:{
      getAllStore2(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.theAllStores=res.data.rows
        });
      },
      getAlljl(data){
        if(this.selectForm.storeid==''){
          data.storeid='A'
        }else{
          data.storeid=this.selectForm.storeid
        }
        this.listLoading=true
        data.page=this.listQuery.page-1
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1VNY', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.rows[0].counts
          this.listLoading=false
        });
      },
      clickButton1(){
        this.selectForm.storeid='A'
        this.listQuery.page=1
        this.getAlljl(this.listQuery)
      },
      clickButton2(e){
        this.selectForm.storeid=e
        this.listQuery.page=1
        this.getAlljl(this.listQuery)
      }
    }
}
</script>

<style scoped>
    
</style>
