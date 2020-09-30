<template>
  <div id="container" style="padding:15px">
    <el-button @click="clickButton1">全部运动馆</el-button>
    <el-button v-for="(item,index) in theAllStores" :key="index" @click="clickButton2(item.id)">{{ item.name }}</el-button>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="零售商品">
        <el-input v-model="selectForm.goodscode" placeholder="商品编号" style="width:180px;margin-top:5px" />
        <el-input v-model="selectForm.name" placeholder="商品名称" style="width:180px;margin-top:5px" />
        <el-button type="success" style="margin-top:5px;" @click="clickSearch">搜索</el-button>
        <el-button type="success" style="margin-top:5px;">新增商品</el-button>
        <el-button type="success" style="margin-top:5px;">已下架商品</el-button>
        <el-button type="" style="margin-top:5px;float:right" @click="topl">查看品类</el-button>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="商品编号" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.goodscode }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="150" label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.imgurl" width="30" height="30">
            </template>
          </el-table-column>

          <el-table-column width="150" align="center" label="商品名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="150" align="center" label="商品类别">
            <template slot-scope="scope">
              <span>{{ scope.row.typename }}</span>
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

          <el-table-column class-name="status-col" label="进价" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.costprice }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="售价" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.salesprice }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="数量" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.stock }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.salesstate == '1'">已上架</span>
              <span v-else-if="scope.row.salesstate == '0'">已下架</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAllgoods" />

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
          theAllStores:[],
          list:[],
          total:0,
          listQuery: {
            page: 1,
            limit:20
          },
          listLoading:false,
          selectForm:{
            storeid:'A',
            goodscode:'',
            name:''
          }
        }
    },
    mounted() {
   
    },
    created(){
      this.getAllStore2()
      this.getAllgoods(this.listQuery)
    },
    methods:{
      getAllStore2(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.theAllStores=res.data.rows
        });
      },
      getAllgoods(data){
        if(this.selectForm.storeid==''){
          data.storeid='A'
        }else{
          data.storeid=this.selectForm.storeid
        }
        if(this.selectForm.name==''){
          data.name='C'
        }else{
          data.name=this.selectForm.name
        }
        if(this.selectForm.goodscode==''){
          data.goodscode='B'
        }else{
          data.goodscode=this.selectForm.goodscode
        }
        data.page=this.listQuery.page-1
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1VN2', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.rows[0].counts
        });
      },
      clickButton1(){
        this.selectForm.storeid='A'
        this.listQuery.page=1
        this.getAllgoods(this.listQuery)
      },
      clickButton2(e){
        this.selectForm.storeid=e
        this.listQuery.page=1
        this.getAllgoods(this.listQuery)
      },
      clickSearch(){
        this.listQuery.page=1
        this.getAllgoods(this.listQuery)
      },
      topl(){
        this.$router.push({
                path:'/afcbdlsgl/pllb',
                query: {
                  
                }
            })
      }
    }
}
</script>

<style scoped>
    
</style>
