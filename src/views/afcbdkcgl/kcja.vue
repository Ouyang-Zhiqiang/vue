<template>
  <div id="container" style="padding:15px">
    <el-tabs type="border-card">
      <el-tab-pane label="课程内容">
        <el-button type="success" style="position:relative;right:0px" @click="toOpen2">新增课程大类</el-button>
        <el-dialog title="新增课程大类" :visible.sync="dialogFormVisible2" style="width:1200px;margin:0 auto">
          <el-form :model="courseItem">
            <el-form-item label="课程类型名称:" :label-width="formLabelWidth">
              <el-input v-model="insertItem.catetitle" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="课程标签:" :label-width="formLabelWidth">
              <el-input v-model="insertItem.labels" style="width:270px;float:left" />
            </el-form-item>
            <span style="position:relative;left:150px;top:-15px">每个标签最多4字，最多4个标签</span>
            <el-form-item label="课程类型LOGO:" :label-width="formLabelWidth">
              <el-upload
                action="https://www.facebodyfitness.com/uploadimg"
                name="upload_file"
                list-type="picture-card"
                :on-success="handleSuccess2"
                style="float:left;width:100px;margin-left:15px"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </el-form-item>
            <el-form-item label="音乐包:" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                action="http://106.14.162.18:8081/uploadmusic"
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
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-form-item>

            <el-form-item label="允许会员级别:" :label-width="formLabelWidth">
              <el-input v-model="insertItem.categrade" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="课程时长:" :label-width="formLabelWidth">
              <el-input v-model="insertItem.courseduration" style="width:270px;float:left" /> 
            </el-form-item>
            <el-form-item label="可预约人数:" :label-width="formLabelWidth">
              <el-input v-model="insertItem.reservablenumber" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="最小开课人数:" :label-width="formLabelWidth">
              <el-input v-model="insertItem.minpeople" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="课程训练目的:" :label-width="formLabelWidth">
              <el-input
                v-model="insertItem.purposes"
                style="width:270px;float:left;height:100px"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
            <el-form-item label="课程训练适用人群:" :label-width="formLabelWidth">
              <el-input
                v-model="insertItem.users"
                style="width:270px;float:left;height:100px"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
            <el-form-item label="课程类型FAQ:" :label-width="formLabelWidth">
              <el-button style="float:right" @click="addQestion">添加</el-button>
              <div v-for="(item,index) in insertItem.faqjson" :key="item.index" style="float:left;">
                <el-form-item :label="'问题'+item.Seq" style="margin-top:30px">
                  <el-input v-model="item.Question" style="width:250px;float:left" /> <i class="el-icon-error" style="font-size:20px;cursor:pointer;margin-top:5px;margin-left:5px;float:left" @click="removeInsertInput(index)" />
                </el-form-item>
                <el-form-item :label="'答案'+item.Seq" style="margin-top:10px">
                  <el-input v-model="item.Answer" style="width:250px;float:left" />
                </el-form-item>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="concel2()">取 消</el-button>
            <el-button type="primary" @click="toInsertCourse()">确 定</el-button>
          </div>
        </el-dialog>
        <div style="margin-top:30px">
          <div v-for="item in list" :key="item.index" style="width:33%;height:300px;text-align:center;float:left;margin-top:15px;">
            <span>{{ item.catetitle }}</span><br>
            <img :src="item.resurl" width="200" height="200" style="margin:15px 0px;cursor:pointer" @click="toParword(item)"><br>
            <span style="cursor:pointer" @click="toOpen(item)">编辑</span>&nbsp;&nbsp;&nbsp;
            <el-dialog title="课程大类编辑:" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
              <el-form :model="courseItem">
                <el-form-item label="课程类型名称:" :label-width="formLabelWidth">
                  <el-input v-model="courseItem.catetitle" style="width:270px;float:left" />
                </el-form-item>
                <el-form-item label="课程标签:" :label-width="formLabelWidth">
                  <el-input v-model="courseItem.labels" style="width:270px;float:left" />
                </el-form-item>
                <span style="position:relative;left:-25px;top:-15px">每个标签最多4字，最多4个标签</span>
                  
                <el-form-item label="课程类型LOGO:" :label-width="formLabelWidth">
                  <img :src="courseItem.resurl" style="width:100px; height:100px;float:left">
                  <el-upload
                    action="https://www.facebodyfitness.com/uploadimg"
                    name="upload_file"
                    list-type="picture-card"
                    :on-success="handleSuccess"
                    style="float:left;width:100px;100px;margin-left:15px"
                  >
                    <i class="el-icon-plus" />
                  </el-upload>
                </el-form-item>

                <el-form-item label="音乐包:" :label-width="formLabelWidth">
                  <el-upload
                    class="upload-demo"
                    action="http://106.14.162.18:8081/uploadmusic"
                    name="upload_file"
                    :on-preview="handlePreviewMu"
                    :on-remove="handleRemoveMu"
                    :before-remove="beforeRemoveMu"
                    :on-success="handleSuccessMu"
                    multiple
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary" style="float:left">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                  </el-upload>
                </el-form-item>
                <el-form-item label="允许会员级别:" :label-width="formLabelWidth">
                  <el-input v-model="courseItem.categrade" style="width:270px;float:left" />
                </el-form-item>
                <el-form-item label="课程时长:" :label-width="formLabelWidth">
                  <el-input v-model="courseItem.courseduration" style="width:270px;float:left" />
                </el-form-item>
                <el-form-item label="可预约人数:" :label-width="formLabelWidth">
                  <el-input v-model="courseItem.reservablenumber" style="width:270px;float:left" />
                </el-form-item>
                <el-form-item label="最小开课人数:" :label-width="formLabelWidth">
                  <el-input v-model="courseItem.minpeople" style="width:270px;float:left" />
                </el-form-item>
                <el-form-item label="课程训练目的:" :label-width="formLabelWidth">
                  <el-input
                    v-model="courseItem.purposes"
                    style="width:270px;float:left;height:100px"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                  />
                </el-form-item>
                <el-form-item label="课程训练适用人群:" :label-width="formLabelWidth">
                  <el-input
                    v-model="courseItem.users"
                    style="width:270px;float:left;height:100px"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                  />
                </el-form-item>
                <!-- <el-form-item label="课程类型FAQ:" :label-width="formLabelWidth">
                    <el-form-item label="问题1" style="margin-top:30px">
                      <el-input v-model="courseItem.faqjson.Question"  style="width:250px;float:left"></el-input>
                    </el-form-item>
                    <el-form-item label="答案1" style="margin-top:10px">
                      <el-input v-model="courseItem.faqjson.Answer"  style="width:250px;float:left"></el-input>
                    </el-form-item> 
                  </el-form-item> -->
                  
                <el-form-item label="课程类型FAQ:" :label-width="formLabelWidth">
                  <el-button style="float:right" @click="addQestion1">添加</el-button>
                  <div v-for="item in courseItem.faqjson" :key="item.index" style="float:left;">
                    <el-form-item :label="'问题'+item.Seq" style="margin-top:30px">
                      <el-input v-model="item.Question" style="width:250px;float:left" /> <i class="el-icon-error" style="font-size:20px;cursor:pointer;margin-top:5px;margin-left:5px;float:left" @click="removeUpdateInput(index)" />
                    </el-form-item>
                    <el-form-item :label="'答案'+item.Seq" style="margin-top:10px">
                      <el-input v-model="item.Answer" style="width:250px;float:left" />
                    </el-form-item>
                  </div>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="toClose">取 消</el-button>
                <el-button type="primary" @click="toTrueClose()">确 定</el-button>
              </div>
            </el-dialog>
            <span style="cursor:pointer">删除</span>
          </div>
        </div>
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
            dialogFormVisible:false,
            formLabelWidth:'150px',
            dialogFormVisible2:false,
            list:[],
            courseItem:{
              catetitle:'',
              labels:'',
              resurl:'',
              categrade:'',
              purposes:'',
              users:'',
              faqjson:{}
            },
            resurl:'',
            insertItem:{
              resid:'',
              resurl:'',
              resname:'',
              cid:'',
              catetitle:'',
              labels:'',
              categrade:'',
              purposes:'',
              users:'',
              courseduration:'',
              reservablenumber:'',
              minpeople:'',
              faqjson:[{Seq:1, Question:'', Answer:''}],
              musicjson:[]
            },
            fileList: []
        }
    },
    mounted() {
      
    },
    created(){
        this.getAllcourse()
    },
    methods:{
      toParword(e){
        this.$router.push({
          path:'/afcbdkcgl/qdlist',
          query: {
            item: e
          }
        })
      },
      getAllcourse(){
        this.$axios.post('https://www.facebodyfitness.com/web/new/getAllcourse', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.list=res.data
        })
      },
      handleSuccess(file){
        var arrfile=file.split(',')
        this.resurl=arrfile[0]
      },
      
      toOpen(e){
        this.courseItem=e
        if(this.courseItem.faqjson){
          if(typeof this.courseItem.faqjson==='string'){
            this.courseItem.faqjson=JSON.parse(this.courseItem.faqjson)
          }
        }
        if(this.courseItem.musicjson){
          if(typeof this.courseItem.musicjson==='string'){
            this.fileList=JSON.parse(this.courseItem.musicjson)
          }
        }
        this.dialogFormVisible=true
      },
      toTrueClose(){

      },
      toClose(){
        this.dialogFormVisible=false
        this.resurl=''
        this.fileList=[]
      },
      toUpdateCourse(){
        var data=this.courseItem
        var arr = []
        arr.push(data.faqjson)
        data.faqjson=JSON.stringify(arr)
        if(this.resurl==''){
        }else{
          data.resurl=this.courseItem.resurl
        }
        //修改大类 wxd修复
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG23NN', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
         this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
          });
      },
      toOpen2(){
        this.dialogFormVisible2=true
      },
      addQestion(){
        var obj={Seq:1, Question:'', Answer:''}
        this.insertItem.faqjson.push(obj)
        this.insertItem.faqjson[this.insertItem.faqjson.length-1].Seq=this.insertItem.faqjson.length
        // console.log(this.insertItem)
      },
      addQestion1(){
        var obj={Seq:1, Question:'', Answer:''}
        this.courseItem.faqjson.push(obj)
        this.courseItem.faqjson[this.insertItem.faqjson.length-1].Seq=this.insertItem.faqjson.length
        // console.log(this.insertItem)
      },
      toInsertCourse(){
        this.dialogFormVisible2=false
        this.insertItem.faqjson=JSON.stringify(this.insertItem.faqjson)
        this.insertItem.musicjson=this.fileList
        this.insertItem.musicjson=JSON.stringify(this.insertItem.musicjson)
        console.log(this.insertItem.musicjson)
        var data=this.insertItem
        data.createdby='系统管理员'
        data.createdname='系统管理员'
        data.createdip='127.0.0.1'
        data.lastedby='系统管理员'
        data.lastedname='系统管理员'
        data.lastedip='127.0.0.1'
        this.insertItem={}
        this.insertItem.faqjson=[{Seq:1, Question:'', Answer:''}]
        this.fileList=[]
        this.insertItem.musicjson=[]
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVCE2', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
         this.getAllcourse()
         this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
        }).catch(error=>{
          this.insertItem.faqjson=[{Seq:1, Question:'', Answer:''}]
          this.$message.error('错了哦，这是一条错误消息');
        });
      },
      handleSuccess2(file){
        this.insertItem.resid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
        var arr=file.split(',')
        this.insertItem.resurl=arr[0]
        this.insertItem.resname=arr[1]
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
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemoveMu(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSuccessMu(file){
        console.log(file)
        var filearr=file.split(',')
        var obj={}
        obj.name=filearr[1]
        obj.url=filearr[0]
        this.fileList.push(obj)
        console.log(this.fileList)
      },
      concel2(){
        this.dialogFormVisible2=false
        this.fileList=[]
      },
      removeInsertInput(index){
        this.insertItem.faqjson.splice(index, 1)
      },
      removeUpdateInput(index){
        this.courseItem.faqjson.splice(index, 1)
      }
    }
}
</script>

<style >
    .el-upload--picture-card{
      width: 100px;
      height: 100px;
      line-height: 100px;
    }
    .el-upload-list__item-actions{
      width: 100px;
      height: 100px;
    }
    .upload-demo{
      padding-left:0px;
      margin-left: 0px;
      text-align: left;
    }
    .el-dialog__close{
      display: none;
    }
</style>
