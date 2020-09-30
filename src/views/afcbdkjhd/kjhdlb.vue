<template>
  <div id="container" style="padding:15px">
    <el-button type="success" @click="createActivity()">新增砍价活动</el-button>
    
    <el-dialog title="新增砍价活动" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
      <el-form :model="form">
        <el-form-item label="会员卡" :label-width="formLabelWidth">
          <el-select v-model="form.cardid" style="width:270px;float:left" @change="selectCard">
            <el-option v-for="item in cards" :key="item.cardid" :label="item.cardname" :value="item.cardid" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员卡价格" :label-width="formLabelWidth">
          <el-input v-model="form.membershipcardprice" style="width:270px;float:left" disabled />
        </el-form-item>
        <el-form-item label="可砍价格" :label-width="formLabelWidth">
          <el-input v-model="form.bargainingprice" style="width:270px;float:left" />&nbsp;&nbsp;&nbsp;&nbsp;元
        </el-form-item>
        <el-form-item label="帮砍最低金额" :label-width="formLabelWidth">
          <el-input v-model="form.bargainingminprice" style="width:270px;float:left" />&nbsp;&nbsp;&nbsp;&nbsp;元
        </el-form-item>
        <el-form-item label="帮砍最高金额" :label-width="formLabelWidth">
          <el-input v-model="form.bargainingmaxprice" style="width:270px;float:left" />&nbsp;&nbsp;&nbsp;&nbsp;元
        </el-form-item>
        <el-form-item label="砍价数量" :label-width="formLabelWidth">
          <el-input v-model="form.bargainingnumber" style="width:270px;float:left" />
        </el-form-item>

        <el-form-item label="活动开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.effectivestartdate"
            type="date"
            placeholder="开始时间"
            style="width:270px;"
            @change="topase1()"
          />
        </el-form-item>

        <el-form-item label="活动截止时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.effectiveenddate"
            type="date"
            placeholder="截止时间"
            style="width:270px;"
            @change="topase2()"
          />
        </el-form-item>
        <el-form-item label="砍价标题" :label-width="formLabelWidth">
          <el-input v-model="form.bargainingtitle" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="砍价描述" :label-width="formLabelWidth">
          <el-input
            v-model="form.bargainingdescription"
            style="width:270px;float:left;"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
          />
        </el-form-item>
        <el-form-item label="分享标题" :label-width="formLabelWidth">
          <el-input v-model="form.sharetitle" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="分享副标题" :label-width="formLabelWidth">
          <el-input v-model="form.sharesubtitle" style="width:270px;float:left" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toTrueClose()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑砍价活动" :visible.sync="dialogFormVisible2" style="width:1200px;margin:0 auto">
      <el-form :model="updateform">
        <el-form-item label="会员卡" :label-width="formLabelWidth">
          <el-select v-model="updateform.cardid" style="width:270px;float:left" @change="selectCard2">
            <el-option v-for="item in cards" :key="item.cardid" :label="item.cardname" :value="item.cardid" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员卡价格" :label-width="formLabelWidth">
          <el-input v-model="updateform.membershipcardprice" style="width:270px;float:left" disabled />
        </el-form-item>
        <el-form-item label="可砍价格" :label-width="formLabelWidth">
          <el-input v-model="updateform.bargainingprice" style="width:270px;float:left" />&nbsp;&nbsp;&nbsp;&nbsp;元
        </el-form-item>
        <el-form-item label="帮砍最低金额" :label-width="formLabelWidth">
          <el-input v-model="updateform.bargainingminprice" style="width:270px;float:left" />&nbsp;&nbsp;&nbsp;&nbsp;元
        </el-form-item>
        <el-form-item label="帮砍最高金额" :label-width="formLabelWidth">
          <el-input v-model="updateform.bargainingmaxprice" style="width:270px;float:left" />&nbsp;&nbsp;&nbsp;&nbsp;元
        </el-form-item>
        <el-form-item label="砍价数量" :label-width="formLabelWidth">
          <el-input v-model="updateform.bargainingnumber" style="width:270px;float:left" />
        </el-form-item>

        <el-form-item label="活动开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="updateform.effectivestartdate"
            type="date"
            placeholder="开始时间"
            style="width:270px;"
            @change="topase3()"
          />
        </el-form-item>

        <el-form-item label="活动截止时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="updateform.effectiveenddate"
            type="date"
            placeholder="截止时间"
            style="width:270px;"
            @change="topase4()"
          />
        </el-form-item>
        <el-form-item label="砍价标题" :label-width="formLabelWidth">
          <el-input v-model="updateform.bargainingtitle" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="砍价描述" :label-width="formLabelWidth">
          <el-input
            v-model="updateform.bargainingdescription"
            style="width:270px;float:left;"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
          />
        </el-form-item>
        <el-form-item label="分享标题" :label-width="formLabelWidth">
          <el-input v-model="updateform.sharetitle" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="分享副标题" :label-width="formLabelWidth">
          <el-input v-model="updateform.sharesubtitle" style="width:270px;float:left" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="toTrueClose2()">确 定</el-button>
      </div>
    </el-dialog>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
      <el-table-column align="center" label="会员卡" width="200">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.cardname }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="会员卡价格">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.membershipcardprice }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="可砍价格">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.bargainingprice }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="帮砍最低金额">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.bargainingminprice }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="帮砍最高金额">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.bargainingmaxprice }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="砍价数量">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.bargainingnumber }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="时间" width="200">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.effectivestartdate }}~{{ scope.row.effectiveenddate }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="砍价标题" width="120">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.bargainingtitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="砍价描述" width="120">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.bargainingdescription }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享标题" width="120">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.sharetitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分享副标题" width="180">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.sharesubtitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="120">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.createdon }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="text" @click="toOpen(scope.row)">编辑</el-button>
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
        list: null,
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
        this.dialogFormVisible=true
      },
      getcards(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFT2AA', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.cards=res.data.rows
        })
      },
      toTrueClose(){
        if(this.form.cardid){
          this.cards.forEach(item=>{
            if(item.cardid==this.form.cardid){
              this.form.cardname=item.cardname
            }
          })
        }  
        this.form.LogoId='' 
        this.form.ResUrl=''
        this.form.ShareSmallPictures=''
        this.form.ShareSmallPicturesUrl=''
        this.form.createdname=localStorage.getItem('username')
        this.form.lastedname=localStorage.getItem('username')
        this.form.actype='K'
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNXMGY', this.$qs.stringify(this.form), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
         this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
            })
            this.form={}
            this.dialogFormVisible=false
            this.toGetAll()
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
        });
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
        // https://www.facebodyfitness.com/hi/main?hi=24CQRLLNKPLT
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNJANP', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            var fee=''
            if(res.data.rows[0].fee){
              fee=res.data.rows[0].fee
              this.form.membershipcardprice=fee
            }else{
              this.form.membershipcardprice=''
            }

            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNKPLT', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.form.resurl=res.data.rows[0].resurl
            })
        })
      },
      selectCard2(){
        var data={}
        data.cardid=this.updateform.cardid
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNJANP', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            var fee=''
            if(res.data.rows[0].fee){
              fee=res.data.rows[0].fee
              this.updateform.membershipcardprice=fee
            }else{
              this.updateform.membershipcardprice=''
            }
        })

         this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNKPLT', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.updateform.resurl=res.data.rows[0].resurl
            })
      },
      toGetAll(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNXMO9', this.$qs.stringify(this.listQuery), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.total
        })
      },
      toOpen(e){
        this.updateform=e
        this.dialogFormVisible2=true
      },
      toTrueClose2(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNXNIM', this.$qs.stringify(this.updateform), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
            })
            this.updateform={}
            this.dialogFormVisible2=false
            this.toGetAll()
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
        });
      }
    }
}
</script>

<style scoped>
    
</style>
