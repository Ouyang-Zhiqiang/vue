<template>
  <div id="container" style="padding:15px">
    <el-button @click="createActivity()">新增抽奖活动</el-button>
    
    <el-dialog title="新增抽奖活动" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
      <el-form :model="form">
        
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width:230px;float:left" />&nbsp;&nbsp;&nbsp;&nbsp;元
        </el-form-item>

        <el-form-item label="活动开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.starttime"
            type="date"
            placeholder="开始时间"
            style="width:270px;"
            @change="topase1()"
          />
        </el-form-item>

        <el-form-item label="活动截止时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.endtime"
            type="date"
            placeholder="截止时间"
            style="width:270px;"
            @change="topase2()"
          />
        </el-form-item>

        <el-form-item label="活动规则" :label-width="formLabelWidth">
          <el-input
            v-model="form.descs"
            style="width:270px;float:left;"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            :placeholder="form.descs"
          />
        </el-form-item>
        <el-form-item label="分享标题" :label-width="formLabelWidth">
          <el-input v-model="form.sharetitle" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="分享副标题" :label-width="formLabelWidth">
          <el-input v-model="form.sharedtitle" style="width:270px;float:left" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toTrueClose()">确 定</el-button>
      </div>
    </el-dialog>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
      <el-table-column align="center" label="会员卡" width="150">
        <template slot-scope="scope">
          <span style="color:#337AB7;cursor:pointer" />
        </template>
      </el-table-column>

      <el-table-column align="center" width="180" label="会员卡价格">
        <template slot-scope="scope">
          <span style="color:#337AB7;cursor:pointer" />
        </template>
      </el-table-column>

      <el-table-column width="220" align="center" label="秒杀价格">
        <template slot-scope="scope">
          <span />
        </template>
      </el-table-column>

      <el-table-column width="100" label="秒杀数量">
        <template slot-scope="scope">
          <span />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="时间" width="150">
        <template slot-scope="scope">
          <span />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="秒杀标题" width="120">
        <template slot-scope="scope">
          <span />
        </template>
      </el-table-column>
      <el-table-column align="center" label="秒杀描述" width="120">
        <template slot-scope="scope">
          <span />
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享标题" width="120">
        <template slot-scope="scope" />
      </el-table-column>
      <el-table-column align="center" label="分享副标题" width="180">
        <template slot-scope="scope">
          <span />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope" />
      </el-table-column>
    </el-table>
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
        formLabelWidth:'150px'
      }
    },
    mounted() {
    },
    created(){
      this.getcards()
    },
    methods:{
      createActivity(){
        this.dialogFormVisible=true
      },
      getcards(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFT2AA', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.cards=res.data.rows
        })
      },
      toTrueClose(){
        console.log('aaa')
      },
      topase1(){
        this.form.starttime=this.form.starttime.toLocaleDateString().replace(/\//g, '-')
      },
      topase2(){
        this.form.starttime=this.form.starttime.toLocaleDateString().replace(/\//g, '-')
      }
    }
}
</script>

<style scoped>
    
</style>
