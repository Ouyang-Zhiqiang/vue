<template>
  <div id="container" style="padding:15px">
    <el-button @click="clickButton1">全部运动馆</el-button>
    <el-button v-for="(item,index) in theAllStores" :key="index" @click="clickButton2(item.id)">{{ item.name }}</el-button>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="商城列表">
        <el-input v-model="selectForm.name" placeholder="商品名称" style="width:180px;margin-top:5px" />
        <el-button type="success" style="margin-top:5px;" @click="clickSearch">搜索</el-button>
        <el-button type="success" style="margin-top:5px;">导出Excel</el-button>
        <el-button type="success" style="margin-top:5px;">新增积分商城</el-button>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" width="150" label="积分商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.imgurl" width="30" height="30">
            </template>
          </el-table-column>

          <el-table-column width="150" align="center" label="积分商品名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="150" label="积分价" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.salespoint }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="有效期" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.usedvaliditybegin }}~{{ scope.row.usedvalidityend }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="运动馆" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.storename }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="排序" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.seqnum }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.salesstate==1">已上架</span>
              <span v-if="scope.row.salesstate==2">已下架</span>
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
            name:''
          }
        }
    },
    mounted() {
   
    },
    created(){
      this.getAllStore2()
      this.getAllSp(this.listQuery)
    },
    methods:{
      getAllStore2(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.theAllStores=res.data.rows
        });
      },
      getAllSp(data){
        if(this.selectForm.storeid==''){
          data.storeid='A'
        }else{
          data.storeid=this.selectForm.storeid
        }
        if(this.selectForm.name==''){
          data.name='B'
        }else{
          data.name=this.selectForm.name
        }
        this.listLoading=true
        data.page=this.listQuery.page-1
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1VOF', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.rows[0].counts
          this.listLoading=false
        });
      },
      clickButton1(){
        this.selectForm.storeid='A'
        this.listQuery.page=1
        this.getAllSp(this.listQuery)
      },
      clickButton2(e){
        this.selectForm.storeid=e
        this.listQuery.page=1
        this.getAllSp(this.listQuery)
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
