<template>
  <div id="container" style="padding:15px">

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="管理员设置">
        <el-row :gutter="10" type="flex" justify="center">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple" style="height:400px;padding-top:80px">
              <el-form ref="form" :model="form" label-width="210px">
                <el-form-item label="旧管理员密码">
                  <el-input v-model="form.name" style="width:260px" />&nbsp;
                </el-form-item>
                <el-form-item label="新管理员密码">
                  <el-input v-model="form.password" style="width:260px" />&nbsp;
                </el-form-item>
                                
                <el-form-item>
                  <el-button type="success">修改</el-button>
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
export default {
    data(){
        return{ 
            radio:'课程开始自动签到',
            form: {
            name: '',
            password: ''
            }
        }
    },
    mounted() {
    },
    methods:{
        handleChange(value) {
            console.log(value)
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
