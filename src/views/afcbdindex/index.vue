<template>
  <div id="list" style="padding:15px">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
          <div class="top">
            <div class="left">
              <svg-icon icon-class="收入" style="width:70%;height:70%" />
            </div>
            <div class="right">
              <span class="sp1">总收入</span>
              <h1>{{ getAmount('all').toFixed(2) }}</h1>
              <span>元</span>
            </div>
          </div>
          <div class="bottom">
            <div class="topon">
              <span class="sp1">今日营收</span>
              <h1>{{ getAmount('jr').toFixed(2) }}</h1>
              <span>元</span>
            </div>
            <div class="topb">
              <div>
                <span class="sp1">昨日</span>
                <h3>{{ getAmount('zr').toFixed(2) }}</h3>
                <span>元</span>
              </div>
              <div>
                <span class="sp1">本周</span>
                <h3>{{ getAmount('bz').toFixed(2) }}</h3>
                <span>元</span>
              </div>
              <div>
                <span class="sp1">本月</span>
                <h3>{{ getAmount('by').toFixed(2) }}</h3>
                <span>元</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
          <div class="top" style="background:#1CAF9A">
            <div class="left">
              <svg-icon icon-class="我的" style="width:70%;height:70%" />
            </div>
            <div class="right">
              <span class="sp1">总会员</span>
              <h1>{{ gettotalamount('all') }}</h1>
              <span>人</span>
            </div>
          </div>
          <div class="bottom" style="background:#1CAF9A">
            <div class="topon">
              <span class="sp1">今日新增会员</span>
              <h1>{{ gettotalamount('jr') }}</h1>
              <span>人</span>
            </div>
            <div class="topb">
              <div>
                <span class="sp1">昨日</span>
                <h3>{{ gettotalamount('zr') }}</h3>
                <span>人</span>
              </div>
              <div>
                <span class="sp1">本周</span>
                <h3>{{ gettotalamount('bz') }}</h3>
                <span>人</span>
              </div>
              <div>
                <span class="sp1">本月</span>
                <h3>{{ gettotalamount('by') }}</h3>
                <span>人</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content">
          <div class="top" style="background:#428BCA">
            <div class="left">
              <svg-icon icon-class="签到" style="width:70%;height:70%" />
            </div>
            <div class="right">
              <span class="sp1">总上课人数</span>
              <h1>{{ allpeople }}</h1>
              <span>人次</span>
            </div>
          </div>
          <div class="bottom" style="background:#428BCA">
            <div class="topon">
              <span class="sp1">今日预约人次</span>
              <h1>{{ getSignin('jr') }}</h1>
              <span>人次</span>
            </div>
            <div class="topb">
              <div>
                <span class="sp1">昨日</span>
                <h3>{{ getSignin('zr') }}</h3>
                <span>人次</span>
              </div>
              <div>
                <span class="sp1">本周</span>
                <h3>{{ getSignin('bz') }}</h3>
                <span>人次</span>
              </div>
              <div>
                <span class="sp1">本月</span>
                <h3>{{ getSignin('by') }}</h3>
                <span>人次</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-tabs class="tab1" type="border-card" style="margin-top:5px">
      <el-tab-pane label="会员增长">
         
        <div id="myChart" :style="{width: '1500px', height: '350px'}" />
        
      </el-tab-pane>
      <el-tab-pane label="会员增势" />
      <el-tab-pane label="预约人数增势" />
    </el-tabs>

    <el-tabs class="tab2" type="border-card" style="margin-top:20px">
      <el-tab-pane label="会员情况" style="padding:5px">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height:320px">
            <div style="width:100%;height:40px;text-align:center;line-height:40px;color:black">
              销售漏斗
            </div>
            <div id="tab2-1" style="width:400px;height:300px;margin:0 auto" />
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height:320px;">
            <div style="width:100%;height:40px;text-align:center;line-height:40px;color:black">
              付费情况
            </div>
            <div id="tab2-2" style="width:400px;height:300px;margin:0 auto" />
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height:320px;">
            <div style="width:100%;height:40px;text-align:center;line-height:40px;color:black">
              性别比例
            </div>
            <div id="tab2-3" style="width:400px;height:300px;margin:0 auto" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="预约分布" style="padding:5px">
        <div id="tab2-4" :style="{width: '1500px', height: '320px'}" />
      </el-tab-pane>
      <el-tab-pane label="会员来源" style="padding:5px">
        <div id="tab2-5" :style="{width: '1500px', height: '320px'}" />
      </el-tab-pane>
      <el-tab-pane label="年龄分布" style="padding:5px">
        <div id="tab2-6" :style="{width: '1500px', height: '320px'}" />
      </el-tab-pane>
    </el-tabs>

    <el-tabs class="tab3" type="border-card" style="margin-top:20px">
      <el-tab-pane label="课程情况" style="padding:5px">
        <div id="tab3-1" :style="{width: '1500px', height: '700px'}" />
      </el-tab-pane>
      <el-tab-pane label="教练上课情况" style="padding:5px">
        <div id="tab3-2" :style="{width: '1500px', height: '700px'}" />
      </el-tab-pane>
      <el-tab-pane label="销售单店业绩" style="padding:5px">
        <div id="tab3-3" :style="{width: '1500px', height: '700px'}" />
      </el-tab-pane>
    </el-tabs>   

    

  </div>
</template>

<script>
var echarts = require('echarts');
var preDate = new Date(new Date().getTime() - 24*60*60*1000);
var nextDate = new Date(new Date().getTime() + 24*60*60*1000); 
var today= new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
var yesterday =preDate.getFullYear()+'-'+(preDate.getMonth()+1)+'-'+preDate.getDate();
var tomorrow=nextDate.getFullYear()+'-'+(nextDate.getMonth()+1)+'-'+nextDate.getDate();
var date = new Date();
var nowMonth = date.getMonth(); 
var nowYear = date.getFullYear(); 
var date2 = new Date()
var weekday = date2.getDay()||7; 
date2.setDate(date2.getDate()-weekday+1);
export default {
 name: 'Bank',
 components: {
 },
 data() {
        return {
            allAmount:'',
            jrAmount:'',
            zrAmount:'',
            bzAmount:'',
            byAmount:'',
            allmembers:'',
            jrmembers:'',
            zrmembers:'',
            bzmembers:'',
            bymembers:'',
            allpeople:'',
            jrSignin:'',
            zrSignin:'',
            bzSignin:'',
            bySignin:''
        }
      },
 computed: {
 },
 created() {
   this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNX11Z', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
      this.allpeople=res.data.rows[0].allpeople
   });
},
destroyed() {
 
},
 mounted() {
   this.drawLine();
   this.ldt();
   this.ffqk();
   this.xbbl()
   this.yyfb();
   this.hyly();
   this.nlfb();
   this.kcqk();
   this.jlskrs();
   this.xsddyj();
 },
 methods: {
    gettotalamount(starttime){
      let a;
      if(starttime=='all'){  
        var data={
        starttime:'2017-01-01',
        endtime:tomorrow
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNQO03', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.allmembers = res.data.rows[0].members
        });
        a=this.allmembers;
      }else if(starttime=='jr'){
        var data={
        starttime:today,
        endtime:tomorrow
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNQO03', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.jrmembers = res.data.rows[0].members
        });
        a=this.jrmembers;
      }else if(starttime=='zr'){
        var data={
        starttime:yesterday,
        endtime:today
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNQO03', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.zrmembers = res.data.rows[0].members
        });
        a=this.zrmembers;
      }else if(starttime=='bz'){
        var data={
        starttime:date2,
        endtime:tomorrow
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNQO03', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.bzmembers = res.data.rows[0].members
        });
        a=this.bzmembers;
      }
      else if(starttime=='by'){
        var data={
        starttime:nowYear+'-'+(nowMonth+1)+'-'+'01',
        endtime:tomorrow
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNQO03', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.bymembers = res.data.rows[0].members
        });
        a=this.bymembers;
      }  
    return a
    },
    getAmount(starttime){
      var date = new Date();
      let a;
      if(starttime=='all'){
        var data={
        starttime:'2017-01-01',
        endtime:tomorrow
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNQ69L', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.allAmount = res.data.rows[0].revenueservice
        });
        a=this.allAmount;
      }else if(starttime=='jr'){
        var data={
        starttime:today,
        endtime:tomorrow
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNQ69L', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.jrAmount = res.data.rows[0].revenueservice
        });
        a=this.jrAmount;
      }else if(starttime=='zr'){
        var data={
        starttime:yesterday,
        endtime:today
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNQ69L', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.zrAmount = res.data.rows[0].revenueservice
        });
        a=this.zrAmount;
      }else if(starttime=='bz'){
        var data={
        starttime:date2,
        endtime:tomorrow
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNQ69L', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.bzAmount = res.data.rows[0].revenueservice
        });
        a=this.bzAmount;
      }else if(starttime=='by'){ 
        var data={
        starttime:nowYear+'-'+(nowMonth+1)+'-'+'01',
        endtime:tomorrow
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNQ69L', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.byAmount = res.data.rows[0].revenueservice
        });
        a=this.byAmount;
      }  
    return a
    },
    getSignin(starttime){
      var date = new Date();
      let a;
      if(starttime=='jr'){
        var data={
        starttime:today,
        endtime:tomorrow
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNX19F', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.jrSignin = res.data.rows[0].s
        });
        a=this.jrSignin;
      }else if(starttime=='zr'){
        var data={
        starttime:yesterday,
        endtime:today
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNX19F', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.zrSignin = res.data.rows[0].s
        });
        a=this.zrSignin;
      }else if(starttime=='bz'){
        var data={
        starttime:date2,
        endtime:tomorrow
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNX19F', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.bzSignin = res.data.rows[0].s
        });
        a=this.bzSignin;
      }else if(starttime=='by'){
        var data={
        starttime:nowYear+'-'+(nowMonth+1)+'-'+'01',
        endtime:tomorrow
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNX19F', this.$qs.stringify(data), { 
        headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{   
        this.bySignin = res.data.rows[0].s
        });
        a=this.bySignin;
      }
    return a
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('myChart'))
        window.addEventListener("resize", () => { myChart.resize();});
        // 绘制图表
        myChart.setOption({
          title: {
            text: ''
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['会员增长']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['2020-03-03', '2020-03-04', '2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09']
          },
          yAxis: {
              type: 'value'
          },
          series: [
                {
                    name:'会员增长',
                    type:'line',
                    stack: '总量',
                    data:[0, 0, 0, 0, 0, 0, 0]
                }
            ]
        });  
    },
    ldt(){
      const ldts = this.$echarts.init(document.getElementById('tab2-1'))
      ldts.setOption({
           title: {
            text: '',
            subtext: ''
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            data: ['全部注册会员', '注册会员', '续费会员']
        },
        calculable: true,
        series: [
            {
                name:'',
                type:'funnel',
                left: '10%',
                top: 60,
                //x2: 80,
                bottom: 60,
                width: '80%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 100,
                
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data: [
                    {value: 100, name: '全部注册会员'},
                    {value: 49.5, name: '注册会员'},
                    {value: 11.5, name: '续费会员'}
                ]
            }
        ]
      })
    },
    ffqk(){
      const ffqks = this.$echarts.init(document.getElementById('tab2-2'))
      ffqks.setOption({
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['付费', '未付费']
        },
        series: [
            {
                name:'付费情况',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:1916, name:'付费'},
                    {value:1882, name:'未付费'}
                ]
            }
        ]
      })
    },
    xbbl(){
      const xbbls = this.$echarts.init(document.getElementById('tab2-3'))
      xbbls.setOption({
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['男', '女']
        },
        series: [
            {
                name:'付费情况',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:1368, name:'男'},
                    {value:2430, name:'女'}
                   
                ]
            }
        ]
      })
    },
    yyfb(){
      const yyfbs = this.$echarts.init(document.getElementById('tab2-4'))
      yyfbs.setOption({
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['0次', '0-5次', '6-10次', '11-15次', '15次以上'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390]
            }
        ]
      })
    },
    hyly(){
      const hylys = this.$echarts.init(document.getElementById('tab2-5'))
      hylys.setOption({
        dataset: {
        source: [
            ['score', 'amount', 'product'],
            [89.3, 58212, '微信注册'],
            [32.7, 20112, '直接到店']
        ]
    },
    grid: {containLabel: true},
    xAxis: {name: 'amount'},
    yAxis: {type: 'category'},
    visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 10,
        max: 100,
        // Map the score column to color
        dimension: 0,
        inRange: {
            color: ['#D7DA8B', '#E15457']
        }
    },
    series: [
        {
            type: 'bar',
            encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "product" column to Y axis
                y: 'product'
            }
        }
    ]
      })
    },
    nlfb(){
      const nlfbs = this.$echarts.init(document.getElementById('tab2-6'))
      nlfbs.setOption({
        dataset: {
            source: [
                ['score', 'amount', 'product'],
                [89.3, 58212, '18岁以下'],
                [57.1, 78254, '18-24岁'],
                [74.4, 41032, '25-30岁'],
                [50.1, 12755, '31-40岁'],
                [89.7, 20145, '41-50岁'],
                [68.1, 79146, '51-60岁'],
                [19.6, 91852, '60岁以上']
            ]
        },
        grid: {containLabel: true},
        xAxis: {name: 'amount'},
        yAxis: {type: 'category'},
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#D7DA8B', '#E15457']
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'product'
                }
            }
        ]
      })
    },
    kcqk(){
      const kcqks = this.$echarts.init(document.getElementById('tab3-1'))
      kcqks.setOption({
            title: {
            text: '课程情况'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['已上课程总数', '实到人数']
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
            data: ['Activity', 'Burning', 'FMS', 'Kick-boxing', 'Recovery', 'Skill', 'VIPR']
        },
        series: [
            {
                name: '已上课程总数',
                type: 'bar',
                data: [11111, 18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '实到人数',
                type: 'bar',
                data: [11111, 19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
      })
    },
    jlskrs(){
      const jlskrss = this.$echarts.init(document.getElementById('tab3-2'))
      jlskrss.setOption({
        title: {
            text: '教练上课情况'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['人数']
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
            data: ['马丁', '王浩', '曹羽', '刘国峰', '何东', '陈语', 'Deniz']
        },
        series: [
            {
                name: '人数',
                type: 'bar',
                data: [11111, 18203, 23489, 29034, 104970, 131744, 630230]
            }
        ]
      })
    },
    xsddyj(){
      const xsddyjs = this.$echarts.init(document.getElementById('tab3-3'))
      xsddyjs.setOption({
        title: {
            text: '单店销售业绩'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['业绩']
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
            data: ['时秋', '张宁', '张青', '王佳', '陈雨', '唐莉', '曹盼']
        },
        series: [
            {
                name: '业绩',
                type: 'bar',
                data: [11111, 19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
      })
    }
 }
}
</script>

<style scoped>
  *{
    font-family: "sans-serif"
  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 15px;
    color: white;
  }
  .grid-content {
    min-height: 300px;
  }
  .grid-content .top{
    width: 100%;
    height: 100px;
    background:#1D2939;
    margin-bottom: 20px;
    border-radius: 4px;
    padding: 15px;
  }
  .grid-content .top .left{
    width: 30%;
    height: 100%;
    float: left;
  }
  .grid-content .top .right{
    width: 70%;
    height: 100%;
    float: left;
  }
  .grid-content .top .right h1{
    display: inline;
  }
  .grid-content .top .right span{
    font-size: 13px;
  }
  .grid-content .top .right .sp1{
    font-size: 13px;
    display: block;
    margin-bottom: 5px;
  }
  .grid-content .bottom{
    width: 100%;
    height: 180px;
    background:#1D2939;
    border-radius: 4px;
    padding: 15px;
  }
  .grid-content .bottom .topon{
    width: 100%;
    height: 50%;
  }
  .grid-content .bottom .topon h1{
    display: inline;
  }
  .grid-content .bottom .topon span{
    font-size: 13px;
  }
  .grid-content .bottom .topon .sp1{
    font-size: 13px;
    display: block;
    margin-bottom: 5px;
  }
  .grid-content .bottom .topb{
    width: 100%;
    height: 50%;
  }
  .grid-content .bottom .topb div{
    height: 100%;
    width: 33.3333%;
    float: left;
    padding-top: 15px;
  }
  .grid-content .bottom .topb div h3{
    display: inline;
  }
  .grid-content .bottom .topb div span{
    font-size: 13px;
  }
  .grid-content .bottom .topb div .sp1{
    font-size: 13px;
    display: block;
    margin-bottom: 5px;
  }
  .tab1{
    width: 100%;
    height: 420px;
  }
  .el-tab-pane{
    height: 100%;
    width: 100%;
  }
  #myChart{
    width: 100%;
    height: 380px;
  }

</style>

