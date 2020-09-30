<template>
  <div id="container" style="padding:15px">
    <el-button type="success" @click="createActivity()">新增抽奖活动</el-button>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
      <el-table-column align="center" label="抽奖活动名称" width="200">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.luckdrawname }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="时间" width="200">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.starttime }}~{{ scope.row.endtime }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="最多中奖数" width="120">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.winningtimes }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动规则" width="200">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.activityrules }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享标题" width="150">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.sharetitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享描述" width="200">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.luckdrawdescription }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="奖品" width="120">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.awardsetting }}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="text" @click="toUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="toGetAll" />
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
        dialogFormVisible:false,
        form:{
        },
        cards:[],
        formLabelWidth:'150px',
        list: [],
        total: 0,
        listQuery: {
          page: 1,
          limit:20
        },
        dialogFormVisible2:false,
        updateform:{}
      }
    },
    mounted() {
    },
    created(){
      this.getcards()
      this.toGetAll()
    },
    methods:{
      createActivity(){
        this.$router.push({
          path:'/afcbdcjgl/xjcj'
          
        })
      },
      getcards(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFT2AA', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.cards=res.data.rows
        })
      },

      topase1(){
        this.form.effectivestartdate=this.form.effectivestartdate.toLocaleDateString().replace(/\//g, '-')
      },
      topase2(){
        this.form.effectiveenddate=this.form.effectiveenddate.toLocaleDateString().replace(/\//g, '-')
      },
      topase3(){
        this.updateform.effectivestartdate=this.updateform.effectivestartdate.toLocaleDateString().replace(/\//g, '-')
      },
      topase4(){
        this.updateform.effectiveenddate=this.updateform.effectiveenddate.toLocaleDateString().replace(/\//g, '-')
      },
      selectCard(){//查询梯度
        var data={}
        // this.form.fee=''
        data.cardid=this.form.cardid
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNJANP', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            if(res.data.rows[0].fee){
              this.form.membershipcardprice=res.data.rows[0].fee
            }else{
              this.form.membershipcardprice=''
            }
        })
      },
      selectCard2(){
        var data={}
        data.cardid=this.updateform.cardid
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNJANP', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            if(res.data.rows[0].fee){
              this.updateform.membershipcardprice=res.data.rows[0].fee
            }else{
              this.updateform.membershipcardprice=''
            }
        })
      },
      toGetAll(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNQ16M', this.$qs.stringify(this.listQuery), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.total
        })
      },
      toOpen(e){
        this.updateform=e
        this.dialogFormVisible2=true
      },
      toUpdate(e){
        this.$router.push({
          path:'/afcbdcjgl/bjcj',
          query: {
            item: e
          }
        })
      }
    }
}
</script>

<style scoped>
    
</style>
