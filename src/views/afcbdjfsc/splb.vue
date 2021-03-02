<template>
  <div id="container" style="padding:15px">
    <el-button @click="clickButton1">全部运动馆</el-button>
    <el-button v-for="(item,index) in theAllStores" :key="index" @click="clickButton2(item.id)">{{ item.name }}</el-button>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="商城列表">
        <el-input v-model="selectForm.name" placeholder="商品名称" style="width:180px;margin-top:5px" />
        <el-button type="success" style="margin-top:5px;" @click="clickSearch">搜索</el-button>
        <el-button type="success" style="margin-top:5px;">导出Excel</el-button>
        <el-button type="success" style="margin-top:5px;" @click="addSpmGood">新增积分商城</el-button>
        <el-dialog title="新增积分商城" :visible.sync="dialogFormVisible1" style="width:1527px;margin:0 auto">
          <el-form :model="spmGoodList">
            <el-form-item label="商品名称" :label-width="formLabelWidth" required>
              <el-input v-model="spmGoodList.name" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-upload
                action="https://www.facebodyfitness.com/uploadimg"
                name="upload_file"
                list-type="picture-card"
                :on-preview="handlePreviewMu"
                :on-remove="handleRemoveMu"
                :before-remove="beforeRemoveMu"
                :on-success="handleSuccess1"
                style="float:left"
              >
                <i class="el-icon-plus" />
              </el-upload>
              
            </el-form-item>
            <el-form-item label="积分价格" :label-width="formLabelWidth" required>
              <el-input v-model="spmGoodList.salespoint" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="库存" :label-width="formLabelWidth" required>
              <el-input v-model="spmGoodList.stock" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="场馆" :label-width="formLabelWidth" required>
              <el-select v-model="spmGoodList.storeId" style="width:270px;float:left">
                <el-option v-for="item in theAllStores" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="是否上架" :label-width="formLabelWidth" required>
              <el-select v-model="spmGoodList.salesstate" style="width:270px;float:left">
                <el-option value="1" label="上架" />
                <el-option value="2" label="下架" />
              </el-select>
            </el-form-item>
            <el-form-item label="有效期开始时间" :label-width="formLabelWidth" required>
              <el-date-picker
                v-model="spmGoodList.UsedValidityBegin"
                type="date"
                placeholder="开始时间"
                style="width:270px"
              />
            </el-form-item>
            <el-form-item label="有效期结束时间" :label-width="formLabelWidth" required>
              <el-date-picker
                v-model="spmGoodList.UsedValidityEnd"
                type="date"
                placeholder="结束时间"
                style="width:270px"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="toTrueCloseInsert()">确 定</el-button>
          </div>
        </el-dialog>

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
          formLabelWidth: '150px',
          dialogFormVisible1:false,
          list:[],
          total:0,
          spmGoodList:{
            name:'',
            resid:'',
            resurl:'',
            imgurl:'',
            salespoint:'',
            goodscode:'',
            salesstate:'',
            stock:'',
            storeId:'',
            UsedValidityBegin:'',
            UsedValidityEnd:'',
            lastedby:localStorage.getItem('username'),
            lastedname:localStorage.getItem('username'),
            createdby:localStorage.getItem('username'),
            createdname:localStorage.getItem('username')
          },
          fileList:[],
          listQuery: {
            page: 1,
            limit:20
          },
          selectForm:{
            storeid:'',
            name:''
          },
          startStoreId:'',
          obj:{
            urlname:'',
            name:'',
            url:'',
            resid:'',
            lastedby:localStorage.getItem('username'),
            lastedname:localStorage.getItem('username'),
            createdby:localStorage.getItem('username'),
            createdname:localStorage.getItem('username')
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
      insertimg(){
        console.log(this.obj);
        this.obj.resid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000);
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEC0X7H', this.$qs.stringify(this.obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        alert("2")
        this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
      });
    },
      toTrueCloseInsert(){
        this.insertimg();
        // if(this.spmGoodList.resurl==''){
        //   this.$message.warning('请添加图片');
        // }else{
          // this.spmGoodList.goodscode=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000);
          
          //  this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLPM575', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          //    console.log(res.data.goodscode)
                // this.spmGoodList.sequm=res.data.goodscode
                  // this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLPM30R', this.$qs.stringify( this.spmGoodList), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                  //   this.$message({
                  //       message: '恭喜你，操作成功',
                  //       type: 'success'
                  //     })
                  //   }).catch(error=>{
                  //     this.$message.error('错了哦，这是一条错误消息');
                  // });
            // }).catch(error=>{
            //     this.$message.error('错了哦，这是一条错误消息');
            // });
          
        // }
        // this.dialogFormVisible1=false
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
      addSpmGood(){
        this.dialogFormVisible1=true
      },
      handleRemoveMu(file) {
        this.fileList.forEach((item, index)=>{
            if(file.name==item.name){
            this.fileList.splice(index, 1)
            }
        })
    },
    handlePreviewMu(file) {
        console.log(file);
    },
    handleExceedMu(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemoveMu(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSuccess1(file){
         var arr=file.split(',')
         this.obj.urlname=arr[1]
        this.obj.url=arr[0]
        this.obj.name=arr[1]
        this.fileList.push(this.obj)
        this.spmGoodList.resurl=arr[0]
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
