<template>
  <div id="container" style="padding:15px">
    <el-tabs type="border-card">
      <el-tab-pane label="会员绑卡">
        <el-select v-model="selectForm.state" placeholder="会员卡状态" style="margin-top:5px;">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-input v-model="selectForm.cardname" placeholder="会员卡名称" style="width:180px;margin-top:5px;" />

        <el-select v-model="selectForm.isopen" placeholder="开卡状态" style="margin-top:5px;">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-input v-model="selectForm.tel" placeholder="手机号" style="width:180px;margin-top:5px;" />

        <el-input v-model="selectForm.name" placeholder="姓名" style="width:180px;margin-top:5px;" />

        <el-button type="success" style="margin-top:5px;" @click="toClickSearch">查询</el-button>
        <el-button type="success" style="margin-top:5px;">导出Excel</el-button>
        <el-button type="success" style="margin-top:5px;" @click="toUrl">添加会员绑卡</el-button>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="卡名" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.cardname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="250" label="姓名">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="300" align="center" label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.tel }}</span>
            </template>
          </el-table-column>

          <el-table-column width="250" label="余额" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.curtimes }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>
          
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAllBindCards" />

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
            listQuery: {
              page: 1,
              limit:20
            },
            listLoading: true,
            clickSeearch:false,
            list:[],
            total:0,
            options1: [{
            value: 'A',
            label: '全部'
            }, {
            value: '0',
            label: '停卡'
            }, {
            value: '1',
            label: '正常'
            }],
            options3: [{
            value: 'C',
            label: '全部'
            }, {
            value: '1',
            label: '已开卡'
            }, {
            value: '0',
            label: '未开卡'
            }],
            selectForm:{
              state:'',
              isopen:'',
              cardname:'',
              name:'',
              tel:''
            }
        }
    },
    mounted(){
       
    },
    created(){
      this.getAllBindCards(this.listQuery)
    },
    methods:{
        getAllBindCards(data){
          if(this.clickSeearch){
            if(this.selectForm.state==''){
              data.state='A'
            }else{
              data.state=this.selectForm.state
            }
            if(this.selectForm.cardname==''){
              data.cardname='B'
            }else{
              data.cardname=this.selectForm.cardname
            }
            if(this.selectForm.isopen==''){
              data.isopen='C'
            }else{
              data.isopen=this.selectForm.isopen
            }
            if(this.selectForm.name==''){
              data.name='D'
            }else{
              data.name=this.selectForm.name
            }
            if(this.selectForm.tel==''){
              data.tel='E'
            }else{
              data.tel=this.selectForm.tel
            }
            this.listLoading=true
            data.page=this.listQuery.page-1

            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEV5AC', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.list=res.data.rows
              this.total=res.data.rows[0].counts
              // this.list.forEach((item)=>{
                //wxd预留
                // if(item.cardtype=='P'){

                // }
              // })
              this.listLoading=false
            });
          }else{
            if(this.selectForm.state==''){
              data.state='A'
            }else{
              data.state=this.selectForm.state
            }
            if(this.selectForm.cardname==''){
              data.cardname='B'
            }else{
              data.cardname=this.selectForm.cardname
            }
            if(this.selectForm.isopen==''){
              data.isopen='C'
            }else{
              data.isopen=this.selectForm.isopen
            }
            if(this.selectForm.name==''){
              data.name='D'
            }else{
              data.name=this.selectForm.name
            }
            if(this.selectForm.tel==''){
              data.tel='E'
            }else{
              data.tel=this.selectForm.tel
            }
            this.listLoading=true
            data.page=this.listQuery.page-1
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEV5AC', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.list=res.data.rows
              this.total=res.data.rows[0].counts
              // this.list.forEach((item)=>{
                //wxd预留
                // if(item.cardtype=='P'){

                // }
              // })
              this.listLoading=false
            });
          }
        },
        toClickSearch(data){
          this.listQuery.page=1
          this.clickSeearch=true
          this.getAllBindCards(this.listQuery)
        },
        toUrl(){
          this.$router.push({
              path:'/afcbdhygl/tohybk'
          })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
