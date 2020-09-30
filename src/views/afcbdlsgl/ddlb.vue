<template>
  <div id="container" style="padding:15px">

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="订单列表">

        <el-select v-model="selectForm.storeid" placeholder="运动馆" style="margin-top:5px">
          <el-option
            v-for="item in theAllStores"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>   

        <el-input v-model="selectForm.goodscode" placeholder="商品编号" style="width:180px;margin-top:5px" />
        <el-input v-model="selectForm.name" placeholder="商品名称" style="width:180px;margin-top:5px" />

        <el-date-picker
          v-model="selectForm.datevalue"
          style="margin-top:5px"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />

        <el-button type="success" style="margin-top:5px" @click="clickSearch">查询</el-button>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="订单编号" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.orderid }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="150" label="商品名称">
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
              <span>{{ scope.row.salescount }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="售价" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.salesprice }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="店铺" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.storename }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.createdon }}</span>
            </template>
          </el-table-column>
          
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAlldh" />
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
            name:'',
            goodscode:'',
            datevalue:''
          }
        }
    },
    mounted() {
    },
    created(){
      this.getAllStore2()
      this.getAlldh(this.listQuery)
    },
    methods:{
      getAllStore2(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.theAllStores=res.data.rows
          var obj={id:'A', name:'全部运动馆'}
          this.theAllStores.unshift(obj)
        });
      },
      getAlldh(data){
        if(this.selectForm.storeid==''){
          data.storeid='A'
        }else{
          data.storeid=this.selectForm.storeid
        }

        if(this.selectForm.goodscode==''){
          data.goodscode='B'
        }else{
          data.goodscode=this.selectForm.goodscode
        }

        if(this.selectForm.name==''){
          data.name='C'
        }else{
          data.name=this.selectForm.name
        }
        this.listLoading=true
        data.page=this.listQuery.page-1
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1VNT', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.rows[0].counts
          this.listLoading=false
        });
      },
      clickSearch(){
        this.listQuery.page=1
        this.getAlldh(this.listQuery)
      }
    }
}
</script>

<style scoped>
    
</style>
