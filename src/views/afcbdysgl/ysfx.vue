<template>
  <div id="container" style="padding:15px">
    <div>
      <el-button v-for="(item,index) in theAllstores" :key="index" v-model="storeid" @click="storeSearch(item.id)">{{ item.name }}</el-button>
    </div>

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
            dateArray:[],
            xsvalue:'',
            theAllstores:[],
            storeid:'',
            jdvalue:''
        }
    },
    mounted() {
        this.getAllStore2()
       this.srzs();
       this.zsr();
       this.hykxs();
    },
    methods:{
        //获取前几天
       getDay(day) {
            var myDate = new Date(); //获取今天日期
            myDate.setDate(myDate.getDate() - (day-1));//setDate() 方法用于设置一个月的某一天。
            var dateArray = [];
            var dateTemp;
            var flag = 1;
            for (var i = 1; i < day; i++) {
                dateTemp =myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+ myDate.getDate();
                dateArray.push(dateTemp);
                myDate.setDate(myDate.getDate() + flag);
                console.log(dateTemp)
            }
            dateArray.push(myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate());
            this.dateArray=dateArray
            return dateArray;
        },
        
        srzs(){
           this.getDay(30)
            const srzss = this.$echarts.init(document.getElementById('tab1-1'))
            var obj={}
            obj.StoreId=this.storeid
             this.$axios.post('http://locahost:8081/GetRevenueStatistics', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                 
             }).catch(error=>{
                this.$message.error('错了哦，这是一条错误消息');
            })
            srzss.setOption({
                xAxis: {
                    type: 'category',
                    data: this.dateArray,
                    axisLabel:{
                         interval:1
                    }
                },
                yAxis: {
                    type: 'value'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 6000, 1320],
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
        },
        getAllStore2(){
            if(localStorage.getItem('username')=='系统管理员'){
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.theAllstores=res.data.rows
                    var obj={}
                    obj.id=''
                    obj.name='全部运动馆'
                    this.theAllstores.unshift(obj)
                })
            }else if(localStorage.getItem('storenumber')==localStorage.getItem('storeid').split(',').length-1){
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.theAllstores=res.data.rows
                    var obj={}
                    obj.id=''
                    obj.name='全部运动馆'
                    this.theAllstores.unshift(obj)
                })
            }else{
                this.storeid=localStorage.getItem('storeid').split(',')[0]
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    var userStore=localStorage.getItem('storeid').split(',')
                    var storeArr=res.data.rows
                    var mystore=[]
                    userStore.forEach(item1=>{
                        storeArr.forEach(item => {
                            if(item1==item.id){
                                mystore.push(item)
                            }
                        })
                    })
                    this.theAllstores=mystore
                    this.storeid=this.theAllstores[0].id
                })
            }    
        },

    }
    
}
</script>

<style scoped>
    
</style>
