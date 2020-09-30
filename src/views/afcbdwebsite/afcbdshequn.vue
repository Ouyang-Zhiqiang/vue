<template>
  <div id="container" style="padding:50px">
      
    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="官网社群介绍">
        <el-button type="success" @click="toOpen()">新增社群介绍</el-button>

        <el-dialog title="新增社群" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
          <el-form :model="obj">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="obj.store" style="width:270px;float:left" />
            </el-form-item>

            <el-form-item label="时间" :label-width="formLabelWidth">
                
              <el-date-picker
                v-model="obj.datetime"
                type="date"
                placeholder="选择时间"
                style="width:270px;"
                @change="topase1()"
              />
               
            </el-form-item>

            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                action="https://www.facebodyfitness.com/uploadimg"
                name="upload_file"
                :on-preview="handlePreviewMu"
                :on-remove="handleRemoveMu"
                :before-remove="beforeRemoveMu"
                :on-success="handleSuccessMu"
                multiple
                :on-exceed="handleExceedMu"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="toTrueClose()">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="网站社群编辑" :visible.sync="dialogFormVisible2" style="width:1200px;margin:0 auto">
          <el-form :model="updateForm">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="updateForm.store" style="width:270px;float:left" />
            </el-form-item>

            <el-form-item label="时间" :label-width="formLabelWidth">
                
              <el-date-picker
                v-model="updateForm.datetime"
                type="date"
                placeholder="选择时间"
                style="width:270px;"
                @change="topase2()"
              />
               
            </el-form-item>

            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-input v-model="updateForm.urlname" :disabled="true" style="width:270px;float:left" /><br>
              <el-upload
                class="upload-demo"
                style="margin-top:10px"
                action="https://www.facebodyfitness.com/uploadimg"
                name="upload_file"
                :on-preview="handlePreviewMu2"
                :on-remove="handleRemoveMu2"
                :before-remove="beforeRemoveMu2"
                :on-success="handleSuccessMu2"
                multiple
                :on-exceed="handleExceedMu2"
                :file-list="fileList2"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="toTrueClose2()">确 定</el-button>
          </div>
        </el-dialog>
                  

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="名称" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.store }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="250" label="图片">
            <template slot-scope="scope">
              <a :href="scope.row.url" target="_blank"><img :src="scope.row.url" width="30" height="30"></a>
            </template>
          </el-table-column>

          <el-table-column align="center" label="时间" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.datetime }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="290">
            <template slot-scope="scope">
              <el-button type="text" @click="toOpen2(scope.row)">编辑</el-button>
              <el-button type="text" @click="teDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllComment" style="float:right;"/> -->

      </el-tab-pane>
    </el-tabs>

    <!-- <div style="display:flex;justify-content:center; ">
        <div>
        <div style="display:block;margin-top:20px">
            <el-input
                style="width:360px;"
                placeholder="课程名称"
                v-model="courseitem.title"
               >
            </el-input>
        </div>

        <div style="display:block;margin-top:20px">
            <el-input
                style="width:360px;"
                placeholder="课程描述"
                v-model="courseitem.descs"
                >
            </el-input>
        </div>
          <el-upload
            style="margin-top:20px"
            class="upload-demo"
            action="https://www.facebodyfitness.com/uploadimg"
            name="upload_file"
            :on-preview="handlePreviewMu"
            :on-remove="handleRemoveMu"
            :before-remove="beforeRemoveMu"
            :on-success="handleSuccessMu"
            multiple
            :on-exceed="handleExceedMu"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

          <el-button size="small" type="primary" @click="tosave" style="margin-top:50px">保存</el-button>
      </div>
      </div> -->
  </div>
</template>

<script>
import { Input } from 'element-ui'
import data from '../pdf/content';


export default {
  data() {
    return {
        obj:{},
        fileList:[],
        fileList2:[],
        courseitem:{},
        downloadLoading: false,
        filename: '',
        autoWidth: true,
        bookType: 'xlsx',
        mylist:[],
        dialogFormVisible:false,
        dialogFormVisible2:false,
        formLabelWidth:'150px',
        kcmcinput:'',
        list:[],
        total:0,
        listQuery: {
          page: 1,
          limit:20
        },
        clickSearch:false,
        listLoading:false,
        options1:[],
        selectForm:{
          coachid:''
        },
        updateForm:{
          
        },
        insertForm:{
          
        },
        categorys:[],
        strengths:[],
        units:[]
    }
  },
  mounted() {

   },
  created(){
    this.getAllList()
  },
  methods: {
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
    handleSuccessMu(file){
        var filearr=file.split(',')
        this.obj.urlname=filearr[1]
        this.obj.url=filearr[0]
        this.obj.name=filearr[1]
        this.fileList.push(this.obj)
        this.insertimg(this.obj)
    },
    handleRemoveMu2(file) {
        this.fileList.forEach((item, index)=>{
            if(file.name==item.name){
            this.fileList2.splice(index, 1)
            }
        })
    },
    handlePreviewMu2(file) {
        console.log(file);
    },
    handleExceedMu2(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemoveMu2(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSuccessMu2(file){
        var filearr=file.split(',')
        this.updateForm.urlname=filearr[1]
        this.updateForm.url=filearr[0]
        this.updateForm.name=filearr[1]
        this.fileList2.push(this.updateForm)
        // this.updateForm(this.updateForm)
    },
    toOpen(){
      this.fileList=[]
      this.obj={}
      this.dialogFormVisible=true
    },
    toOpen2(item){
        this.fileList2=[]
        this.dialogFormVisible2=true
        this.updateForm=item
        var arr=[{name:'aa.png', url:''}, {name:'bb.png', url:''}]
        // this.fileList2.push(item)
    },
    toTrueClose(){
      this.dialogFormVisible=false
      this.getAllList()
    },
    toTrueClose2(){
      this.updateImg()
    },
    insertimg(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEC0WWL', this.$qs.stringify(this.obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
      });
    },
    teDelete(item){
        var obj={}
        obj=item
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEC1ULG', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
         this.getAllList()
         this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
        });
    },
    updateImg(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEC1ULL', this.$qs.stringify(this.updateForm), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
         this.getAllList()
         this.dialogFormVisible2=false
         this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
        });
    },
    topase1(){
        this.obj.datetime=this.obj.datetime.toLocaleDateString().replace(/\//g, '-')
    },
    topase2(){
        this.updateForm.datetime=this.updateForm.datetime.toLocaleDateString().replace(/\//g, '-')
    },
    // tosave(){
    //   this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEC0WTD',this.$qs.stringify(this.courseitem),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
    //      this.courseitem={}
    //      this.fileList=[]
    //      this.$message({
    //         message: '恭喜你，操作成功',
    //         type: 'success'
    //       })
    //     }).catch(error=>{
    //       this.$message.error('错了哦，这是一条错误消息');
    //     });
    // },
    getAllList(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEC1UMA', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.list=res.data.rows
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    }
  }
}

</script>

<style scoped>
.el-button{
    margin-right:10px;
}
.el-dialog{
    width: 85%;
}
</style>
