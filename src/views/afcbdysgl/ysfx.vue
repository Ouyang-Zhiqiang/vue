<template>
  <div id="container" style="padding:15px">
    <el-button>全部运动馆</el-button>
    <el-button>万达馆</el-button>
    <el-button>东鼎馆</el-button>
    <el-button>泗泾馆</el-button>
    <el-button>开元馆</el-button>
    <el-button>亚繁馆</el-button>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="收入增势">
        <el-button style="margin-top:5px">近7天</el-button>
        <el-button style="margin-top:5px">近15天</el-button>
        <el-button style="margin-top:5px">近30天</el-button>
        <el-date-picker
          v-model="datevalue1"
          style="margin-top:5px"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />

        <div id="tab1-1" style="width:1500px;height:300px" />
        <div id="tab1-2" style="width:1500px;height:300px" />
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="会员卡销售">
        <el-button>近7天</el-button>
        <el-button>近15天</el-button>
        <el-button>近30天</el-button>
        <el-date-picker
          v-model="datevalue1"
          style="margin-top:5px"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />

        <el-select v-model="xsvalue" placeholder="销售人员" style="margin-top:5px">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select v-model="jdvalue" placeholder="全部卡阶段" style="margin-top:5px">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <div id="tab2-1" style="width:1500px;height:350px;margin-top:20px" />

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
    data(){
        return{ 
            datevalue1:'',
            datevalue2:'',
            options1: [{
                value: '唐莉',
                label: '唐莉'
                }, {
                value: '陈宇',
                label: '陈宇'
                }, {
                value: '曹盼',
                label: '曹盼'
            }],
            options2: [{
                value: '首充',
                label: '首充'
                }, {
                value: '续卡',
                label: '续卡'
            }],
            xsvalue:'',
            jdvalue:''
        }
    },
    mounted() {
       this.srzs();
       this.zsr();
       this.hykxs();
    },
    methods:{
        srzs(){
            const srzss = this.$echarts.init(document.getElementById('tab1-1'))
            srzss.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            })
        },
        zsr(){
            const zsrs = this.$echarts.init(document.getElementById('tab1-2'))
            zsrs.setOption({
                title: {
                text: '总收入',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
              
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['小程序支付', '其他', '刷卡', '扫码支付', '转账']
            },
            series: [
                {
                    name: '',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744]
                }
            ]
            })
        },
        hykxs(){
            const hykxss = this.$echarts.init(document.getElementById('tab2-1'))
            hykxss.setOption({
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['卡数', '金额']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['总会员卡', '标准训练卡', '私人定制1v1', '七天七次单人卡', '员工福利卡', '团课无限课时', '小团课68课时', '小团课38课时', '私教(拉伸)', '私教1v1']
                },
                series: [
                    {
                        name: '卡数',
                        type: 'bar',
                        data: [11111, 11111, 11111, 11111, 18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: '金额',
                        type: 'bar',
                        data: [11111, 11111, 11111, 11111, 19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ]
            })
        }

    }
}
</script>

<style scoped>
    
</style>
