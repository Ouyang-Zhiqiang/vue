<template>
  <div id="container" style="padding:50px">
    <div style="display:flex;justify-content:center; ">
      <div>
        <el-input
          v-model="myfile"
          style="width:360px"
          placeholder=""
          :limit="1"
          :disabled="true"
        />
        <div style="height:50px" />
        <el-upload
          class="upload-demo"
          drag
          action="https://www.facebodyfitness.com/uploadvideo"
          name="upload_file"
          :on-preview="handlePreviewMu"
          :on-remove="handleRemoveMu"
          :before-remove="beforeRemoveMu"
          :on-success="handleSuccessMu"
          multiple
          :on-exceed="handleExceedMu"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

      <!-- <div style="margin:0 auto">
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
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div> -->
      
      </div>
    </div>
  </div>
</template>

<script>
import { Input } from 'element-ui'
import data from '../pdf/content';


export default {
  data() {
    return {
        myfile:'',
        fileList:[]
    }
  },
  mounted() {

   },
  created(){
    
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
        var obj={}
        obj.url=filearr[0]
        obj.urlname=filearr[1]
        obj.name=filearr[1]
        this.fileList.push(obj)
        this.insertVideo(obj)
        this.myfile=obj.name
    },
    insertVideo(e){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEC0WQZ', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
         this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
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
