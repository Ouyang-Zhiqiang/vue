<template>
  <div class="container" style="padding:15px">
    <div>
      <el-button v-for="(item,index) in theAllstores" :key="index" @click="toGetAllByStore(item.id)">{{ item.name }}</el-button>
    </div>


    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="营收报表">

        <el-select v-model="saleid" placeholder="全部销售" style="margin-top:5px">
          <el-option
            v-for="item in xs"
            :key="item.userid"
            :label="item.name"
            :value="item.userid"
          />
        </el-select>

        <el-date-picker
          v-model="datetimerange"
          style="margin-top: 5px;"
          type="daterange"
          range-separator="to"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
        <el-input  placeholder="姓名" v-model="name" style="width:180px;margin-top:5px" />

        <el-button type="success" style="margin-top:5px" @click="getFxlist">查询</el-button>
        <el-button type="success" style="margin-top:5px" @click="daochu">导出Excel</el-button>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px" id="out-table">
          <el-table-column align="center" label="时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.createdon }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="180" label="商品">
            <template slot-scope="scope">
              <span>{{ scope.row.cardname }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120" align="center" label="会员">
            <template slot-scope="scope">
              <span v-html="scope.row.name " />
            </template>
          </el-table-column>

          <el-table-column width="100" label="实付金额" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.sellingfee>=0" style="color:green;font-weight:600">+{{ scope.row.sellingfee }}</span>
              <span v-if="scope.row.sellingfee<0" style="color:red;font-weight:600">{{ scope.row.sellingfee }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="支付方式" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.payment }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="变更" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.buytimes }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="销售" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.salername }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="运动馆" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.storename }}</span>
            </template>
          </el-table-column>
          
          <el-table-column align="center" label="卡阶段" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.buytype }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作人" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.lastedname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>
          
        </el-table>  
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getFxlist" />

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { date } from 'jszip/lib/defaults'
import data from '../pdf/content';
import { fetchList } from '@/api/hy';
import Pagination from '@/components/Pagination';
import FileSaver from "file-saver";
import XLSX from "xlsx";
import $ from "jquery";

export default {
    components: { Pagination },
    data(){
        return{ 
            datetimerange:'',
            xs:[],
            list:[],
            storeid:'',
            saleid:'',
            name:'',
            theAllstores:[],
            xsvalue:'',
            listLoading:false,
            listQuery: {
              page: 1,
              limit:20
            },
            total:0
        }
    },
    created(){
      this.getAllStore2()
      this.getAllxs5()
      this.getFxlist()
    },
    mounted() {
    },
    methods:{
      toGetAllStoreYs(){
        this.storeid=''
        this.getFxlist()
      },
      toGetAllByStore(e){
        this.storeid=e
        this.getFxlist()
      },
      getAllStore2(){
            if(localStorage.getItem('username')=='系统管理员'||localStorage.getItem('username')=='金慧慧'){
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.theAllstores=res.data.rows
                    var obj={}
                    obj.id=''
                    obj.name='全部运动馆'
                    this.theAllstores.unshift(obj)
                })
            }else if(localStorage.getItem('storenumber')==localStorage.getItem('storeid').split(',').length-1){
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.theAllstores=res.data.rows
                    var obj={}
                    obj.id=''
                    obj.name='全部运动馆'
                    this.theAllstores.unshift(obj)
                })
            }else{
                this.storeid=localStorage.getItem('storeid').split(',')[0]
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    var userStore=localStorage.getItem('storeid').split(',')
                    var storeArr=res.data.rows
                    var mystore=[]
                    userStore.forEach(item1=>{
                        storeArr.forEach(item => {
                            if(item1==item.id){
                                mystore.push(item)
                            }
                        })
                    })
                    this.theAllstores=mystore
                    this.storeid=this.theAllstores[0].id
                })
            }    
        },
      getAllxs5(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFT1UZ', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.xs=res.data.rows
            var obj={name:'全部销售', userid:''}
            this.xs.unshift(obj)
          });
      },
      getFxlist(){
        var data={}
        if(this.datetimerange==''){
          this.datetimerange=[]
          this.datetimerange[1]=new Date().toLocaleDateString().replace(/\//g, '-')
          this.datetimerange[0]=new Date(new Date().getTime()-1000*60*60*24*6).toLocaleDateString().replace(/\//g, '-')
          console.log(this.datetimerange)
          data.datebegin=this.datetimerange[0]
          data.dateend=this.datetimerange[1]
        }else if(typeof this.datetimerange[0]==='string'){
          data.datebegin=this.datetimerange[0]
          data.dateend=this.datetimerange[1]
        }else{
          data.datebegin=this.datetimerange[0].toLocaleDateString().replace(/\//g, '-')
          data.dateend=this.datetimerange[1].toLocaleDateString().replace(/\//g, '-')
        }
        data.storeid=this.storeid
        data.saleuserid=this.saleid
        data.page=this.listQuery.page
        data.limit=this.listQuery.limit
        data.name=this.name
        
        this.$axios.post('https://www.facebodyfitness.com/selectMemberCardList', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data
          this.total=this.list[0].total
        });
      },
    daochu() {
      this.listQuery.limit = 99999;
      this.getFxlist();
      setTimeout(this.daochuexcel, 3500);
      this.listQuery.limit = 20;
      setTimeout(this.getFxlist,4000);
    },
    daochuexcel() {
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "营收报表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
    }
    }
}
</script>

<style scoped>
    
</style>
