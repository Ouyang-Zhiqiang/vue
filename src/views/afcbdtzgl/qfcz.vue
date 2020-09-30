<template>
  <div id="container" style="padding:15px">
    <el-tabs type="border-card">
      <el-tab-pane label="群发操作">
        <el-row :gutter="10" type="flex" justify="center">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple" style="height:400px">
              <div style="height:100%;width:20%;float:left">
                <div style="width:100%;height:60px;line-height:60px;text-align:center">
                  <span>发送运动馆</span>
                </div>
                <div style="width:100%;height:60px;line-height:60px;margin-top:20px;text-align:center">
                  <span>发送对象</span>
                </div>
                <div style="width:100%;height:60px;line-height:60px;margin-top:25px;text-align:center">
                  <span>短信内容</span>
                </div>
              </div>
              <div style="float:left;width:80%">
                <div style="float:left;">
                  <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" style="margin-top:15px" @change="handleCheckAllChange">全部</el-checkbox>
                  <div style="margin: 15px 0;" />
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div style="float:left;margin-bottom:40px">
                  <el-checkbox v-model="checkAll1" :indeterminate="isIndeterminate1" style="margin-top:20px" @change="handleCheckAllChange1">全部会员</el-checkbox>
                  <div style="margin: 15px 0;" />
                  <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
                    <el-checkbox v-for="city in cities1" :key="city" :label="city">{{ city }}</el-checkbox>
                  </el-checkbox-group>
                </div>

                <el-form ref="form" :model="form" label-width="" style="margin-left:0px;width:80%;height:300px">
                  <el-form-item label="">
                    <el-input v-model="form.desc" type="textarea" />
                  </el-form-item>
                </el-form>

                <el-button type="success" style="margin-left:0px;margin-top:20px">确认发送</el-button>
              </div> 

            </div>

          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="发送记录">
        <el-input v-model="input1" placeholder="手机号" style="width:180px" />

        <el-date-picker
          v-model="datevalue1"
          style="margin-top:5px;"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        />

        <el-button type="success" style="margin-top:5px">查询</el-button>
        <el-button type="success" style="margin-top:5px">导出Excel</el-button>

        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:15px"
        >
          <el-table-column
            prop="fssj"
            label="发送时间"
            width="180"
          />
          <el-table-column
            prop="ts"
            label="条数"
            width="180"
          />
          <el-table-column
            prop="zt"
            label="状态"
          />
          <el-table-column
            prop="jssj"
            label="接收手机"
          />
          <el-table-column
            prop="nr"
            label="内容"
          />
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  const cityOptions = ['万达馆', '东鼎馆', '泗泾馆', '开元馆', '亚繁馆'];
  const cityOptions1 = ['女性会员', '卡即将失效', '失效卡会员', '期卡会员', '次卡会员', '有效卡会员', '未付费会员'];
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,

        checkAll1: false,
        checkedCities1: [],
        cities1: cityOptions1,
        isIndeterminate1: true,
        form:{
            desc:''
        },
        input1:'',
        datevalue1:'',

        tableData: [{
          fssj: '2016-05-02',
          ts: '王小虎',
          zt: '上海市普陀区金沙江路 1518 弄',
          jssj:'',
          nr:''
        }, {
          fssj: '2016-05-02',
          ts: '王小虎',
          zt: '上海市普陀区金沙江路 1518 弄',
          jssj:'',
          nr:''
        }, {
          fssj: '2016-05-02',
          ts: '王小虎',
          zt: '上海市普陀区金沙江路 1518 弄',
          jssj:'',
          nr:''
        }, {
          fssj: '2016-05-02',
          ts: '王小虎',
          zt: '上海市普陀区金沙江路 1518 弄',
          jssj:'',
          nr:''
        }]
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        const checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleCheckAllChange1(val) {
        this.checkedCities1 = val ? cityOptions1 : [];
        this.isIndeterminate1 = false;
      },
      handleCheckedCitiesChange1(value) {
        const checkedCount = value.length;
        this.checkAll1 = checkedCount === this.cities1.length;
        this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.cities1.length;
      }
    }
  };
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
