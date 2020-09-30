<template>
  <div id="container" style="padding:15px">

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="浮窗">
        <el-row :gutter="10" type="flex" justify="center">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple" style="height:600px">
              <!-- <el-form ref="form" :model="form" label-width="80px">
                                <el-radio v-model="radio" label="开启" style="margin-left:35px">开启</el-radio>
                                <el-radio v-model="radio" label="关闭">关闭</el-radio><br>

                                
                                
                                
                                
                                   
                                <el-form-item>
                                    <el-button type="primary">保存</el-button>
                                </el-form-item>
                            </el-form> -->

              <el-checkbox-group v-model="checkList">
                <el-checkbox label="体脂率" style="margin-top:5px" />&nbsp;&nbsp;&nbsp;&nbsp;<br>
                <el-checkbox label="基础代谢" style="margin-top:5px" /><br>
                <el-checkbox label="大腿围 (L)" style="margin-top:5px" /><br>
                <el-checkbox label="大臀围（L）" style="margin-top:5px" /><br>
                <el-checkbox label="小腿 (L)" style="margin-top:5px" /><br>
                <el-checkbox label="手臂 (R)" style="margin-top:5px" /><br>
                <el-checkbox label="脂肪含量" style="margin-top:5px" /><br>
                <el-checkbox label="臀围" style="margin-top:5px" /><br>
                <el-checkbox label="骨骼肌含量" style="margin-top:5px" /><br>
                <el-checkbox label="手臂" style="margin-top:5px" /><br>
                <el-checkbox label="体重" style="margin-top:5px" /><br>
                <el-checkbox label="大腰围（L）" style="margin-top:5px" /><br>
                <el-checkbox label="大腿围（R）" style="margin-top:5px" /><br>
                <el-checkbox label="大臀围（R）" style="margin-top:5px" /><br>
                <el-checkbox label="手臂 (L)" style="margin-top:5px" /><br>
                <el-checkbox label="胸围" style="margin-top:5px" /><br>
                <el-checkbox label="腰围" style="margin-top:5px" /><br>
                <el-checkbox label="身高" style="margin-top:5px" /><br>
                <el-checkbox label="小腿" style="margin-top:5px" /><br>
                <el-checkbox label="小臂" style="margin-top:5px" /><br>
              </el-checkbox-group>
              <el-button type="success" style="margin-top:20px">添加</el-button>
              <el-button type="success" style="margin-top:20px">保存</el-button>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
    data(){
        return{ 
           checkList: ['选中且禁用', '复选框 A']
        }
    },
    mounted() {
        
    },
    methods:{
      
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
