<template>
  <div id="container" style="padding:15px">

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="浮窗">
        <el-row :gutter="10" type="flex" justify="center">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple" style="height:900px">

              <el-form ref="form" :model="form" label-width="80px">

                <el-form-item label="在线协议" style="margin-top:20px">
                  <el-radio-group v-model="form.memagrisused" :min="1" style="float:left;margin-top:10px;">
                    <el-radio :label="true">开启</el-radio>
                    <el-radio :label="false">关闭</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="协议标题" style="margin-top:20px">
                  <el-input v-model="form.memagrtitle" />
                </el-form-item>
                                
                <el-form-item label="协议内容" style="margin-top:20px">
                  <Tinymce ref="editor" v-model="form.memagrcontenthtml" :height="200" />
                </el-form-item>

                <el-form-item label="邀请规则" style="margin-top:20px">
                  <Tinymce ref="editor" v-model="form.memagrinvitingruleshtml" :height="200" />
                </el-form-item>
                                   
                <el-form-item>
                  <el-button type="primary" @click="updateCompany">保存</el-button>
                </el-form-item>
              </el-form>
                  
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
    components: { Tinymce },
    data(){
        return{ 
          form:{
          }
        }
    },
    mounted() {
        
    },
    created(){
      this.getCompany()
    },
    methods:{
      handleChange(){
        console.log(this.memagrcontenthtml)
      },
      getCompany(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG23UR', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.form=res.data.rows[0]
        })
      },
      toText(HTML){
        var input = HTML;
        return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ');  
      },
      updateCompany(){
        this.form.memagrcontenttext=toText(this.form.memagrcontenthtml)
        this.form.memagrinvitingrulestext=toText(this.form.memagrcontenthtml)
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG23VS', this.$qs.stringify(this.form), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
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
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
