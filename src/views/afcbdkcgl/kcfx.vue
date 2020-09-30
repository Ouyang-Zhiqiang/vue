<template>
  <div id="container" style="padding:15px">
    <el-button @click="toGetAllStoreUser()">全部运动馆</el-button>
    <el-button v-for="(item,index) in theAllstores" :key="index" @click="toGetAllByStore(item.id)">{{ item.name }}</el-button>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-select v-model="coachid1" placeholder="全部教练" @change="getTest">
        <el-option
          v-for="item in theAllCoach"
          :key="item.userid"
          :label="item.name"
          :value="item.userid"
        />
      </el-select>

      <el-date-picker
        v-model="date1"
        style="margin-top: 5px;"
        type="daterange"
        range-separator="to"
        start-placeholder="Start date"
        end-placeholder="End date"
        @change="dateChange1"
      />

      <el-tab-pane label="课程分析">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height:320px">
            
            <div id="tab1-1" style="width:400px;height:300px;margin:0 auto;margin-top:20px" />
            
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height:300px">
            <div id="tab1-2" style="width:400px;height:300px;margin:0 auto;margin-top:20px" />
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height:300px">
            <div id="tab1-3" style="width:400px;height:300px;margin:0 auto;margin-top:20px" />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="预约人数增长">
        <el-button>近7天</el-button>
        <el-button>近15天</el-button>
        <el-button>近30天</el-button>
        <el-date-picker
          v-model="datevalue"
          style="margin-top: 5px;"
          type="daterange"
          range-separator="to"
          start-placeholder="Start date"
          end-placeholder="End date"
        />

        <div id="tab2-1" style="width:1500px;height:320px;" />
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="课程报表">
        <el-select v-model="coachid2" placeholder="全部教练">
          <el-option
            v-for="item in theAllCoach"
            :key="item.userid"
            :label="item.name"
            :value="item.userid"
          />
        </el-select>

        <el-date-picker
          v-model="date2"
          style="margin-top: 5px;"
          type="daterange"
          range-separator="to"
          start-placeholder="Start date"
          end-placeholder="End date"
        />

        <el-select v-model="coursetype" placeholder="课程类型" style="margin-top:5px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- <el-input v-model="kcmcinput" placeholder="课程名称" style="width:180px" /> -->

        <el-button type="success" @click="getKCFX">搜索</el-button>
        <el-button type="success">导出Excel</el-button>
                
        <el-table v-if="yno=='团课'" v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="日期" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.Date }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="180" label="教练">
            <template slot-scope="scope">
              <span>{{ scope.row.Coach }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120" align="center" label="课程类型">
            <template slot-scope="scope">
              <span v-html="scope.row.Curriculumtype " />
            </template>
          </el-table-column>

          <el-table-column width="200" label="课程名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.Curriculumname }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="上课时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.Curriculumtime }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="预约人次" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Makeanappointment }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="签到人次" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Signin }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="取消人次" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Cancel }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="可约人次" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Appointmentavailable }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="课程价格" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.CurriculumPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="满员率" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Fullcapacityrate }}</span>
            </template>
          </el-table-column>
        </el-table>    

        <el-table v-if="yno=='私教'" v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="日期" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.Date }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="180" label="教练">
            <template slot-scope="scope">
              <span>{{ scope.row.Coach }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120" align="center" label="课程类型">
            <template slot-scope="scope">
              <span v-html="scope.row.Curriculumtype " />
            </template>
          </el-table-column>

          <el-table-column width="200" label="课程名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.Curriculumname }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="上课时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.Curriculumtime }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="预约人次" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Makeanappointment }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="签到人次" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Signin }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="取消人次" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.Cancel }}</span>
            </template>
          </el-table-column>
          
          <el-table-column align="center" label="课程价格" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.CurriculumPrice }}</span>
            </template>
          </el-table-column>
          
        </el-table>  
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getKCFX" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import data from '../pdf/content';
import { fetchList } from '@/api/hy';
import Pagination from '@/components/Pagination';
import { date } from 'jszip/lib/defaults';

export default {
    components: { Pagination },
  data() {
    return {
      list:[],
      formLabelWidth: '150px',
      listLoading:false,
      listQuery: {
        page: 1,
        limit:20
      },
      total:0,
      kcmcinput:'',
      datevalue:[],
      options: [{
          value: '团课',
          label: '团课'
        }, {
          value: '私教',
          label: '私教'
        }],
        kclxvalue:'',
          courseitems:{},
          theAllstores:[],
          theAllCoach:[],        
          storeid:'',
          date1:[],
          coachid1:'',       
          date2:[],
          coachid2:'',
          coursetype:'团课',         
          yno:'',
          skrsall:[]
    }
  },
  mounted() {     
       this.getAllCoach()
       this.getAllStore()
       this.yskcs();
       this.ckxkzje();
       this.skrs();
       this.yyrszs();
       this.getTest();
   },
   created(){
     this.date1[1]=new Date().toLocaleDateString().replace(/\//g, '-')
     this.date1[0]=new Date(new Date().getTime()-1000*60*60*24*6).toLocaleDateString().replace(/\//g, '-')
     this.date2[1]=new Date().toLocaleDateString().replace(/\//g, '-')
     this.date2[0]=new Date(new Date().getTime()-1000*60*60*24*6).toLocaleDateString().replace(/\//g, '-')
     this.datevalue[1]=new Date().toLocaleDateString().replace(/\//g, '-')
     this.datevalue[0]=new Date(new Date().getTime()-1000*60*60*24*6).toLocaleDateString().replace(/\//g, '-')
    
    //  console.log(this.date1)
    //  this.getAllFX(this.listQuery)
    
     this.getKCFX()
   },
  methods: {

    toGetAllByStore(){
      alert('ok')
    },
  
    // 课程统计
    getTest(){
      var data={}
      data.CourseDatestart=this.date1[0]
      data.CourseDateend=this.date1[1]
      data.storeid=this.storeid
      data.coachid=this.coachid1
      // console.log(data)
      this.$axios.post('http://localhost:8081/web/CAnalysis/getCoursesNumber', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.skrsall=res.data[0]
        console.log(this.skrsall.Classes1)
      });
    },

    getKCFX(){
      if(this.coursetype=='团课'){
        var data={}
          data.CourseDatestart=this.date2[0]
          data.CourseDateend=this.date2[1]
        data.storeid=this.storeid
        data.coachid=this.coachid2
        data.page=this.listQuery.page
        data.limit=this.listQuery.limit
        this.$axios.post('https://www.facebodyfitness.com/web/CAnalysis/getctCoursereport', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          // console.log(res.data)
          this.yno='团课'
          this.total=res.data[0].total
          // console.log(this.total)
          this.list=res.data
        });
      }else if(this.coursetype=='私教'){
        var data={}
        data.CourseDatestart=this.date2[0]
        data.CourseDateend=this.date2[1]
        data.storeid=this.storeid
        data.coachid=this.coachid2
        data.page=this.listQuery.page
        data.limit=this.listQuery.limit
        // console.log(data)
        this.$axios.post('https://www.facebodyfitness.com/web/CAnalysis/getcpCoursereport', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.yno='私教'
          this.list=res.data
          this.total=res.data[0].total
          // console.log(res)
        });
      }
    },
    
    dateChange1(){
      this.date1[0]=this.date1[0].toLocaleDateString().replace(/\//g, '-')
      this.date1[1]=this.date1[1].toLocaleDateString().replace(/\//g, '-')
      this.getTest()
    },
    getAllStore(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.theAllstores=res.data.rows
        // console.log(this.theAllstores)
      });
    },
    getAllCoach(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW860', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.theAllCoach=res.data.rows
        });
      },
    // getAllFX(data){
    //   this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG20FZ',this.$qs.stringify(data),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
    //     this.list=res.data.rows
    //     this.total=res.data.rows[0].counts
    //   });
    // },
    yskcs(){
        const yskess = this.$echarts.init(document.getElementById('tab1-1'))
        yskess.setOption({
            title: {
                text: '已上课程数',
                subtext: '  '
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['团课', '私教']
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
                        data: ['总节数', '预约人次', '实到人次']
                    },
                    series: [
                        {
                            name: '团课',
                            type: 'bar',
                            data: [168, 981, 649]
                        },
                        {
                            name: '私教',
                            type: 'bar',
                            data: [73, 95, 83]
                        }
                    ]
                })
    },
    ckxkzje(){
        const ckxkzjes = this.$echarts.init(document.getElementById('tab1-2'))
        ckxkzjes.setOption({
                title: {
                text: '次卡销科金额',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
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
                data: ['skill', 'recovery', 'burning', 'kick-boxing', 'activity']
            },
            series: [
                {
                    name: '消客总金额',
                    type: 'bar',
                    data: [6402.59, 700.62, 11821.42, 425.63, 13262.74]
                }
            ]
        })
    },
    skrs(){
        const skrss = this.$echarts.init(document.getElementById('tab1-3'))
        skrss.setOption({
                title: {
                text: '上课人数',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
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
                data: ['7次以上', '6次', '5次', '4次', '3次', '2次', '1次']
            },
            series: [
                {
                    name: '消客总金额',
                    type: 'bar',
                    data: [1, this.skrsall.Classes6, this.skrsall.Classes5, this.skrsall.Classes4, this.skrsall.Classes3, this.skrsall.Classes2, this.skrsall.Classes1]
                }
            ]
        })
    },
    yyrszs(){
        const yyrszss = this.$echarts.init(document.getElementById('tab2-1'))
        yyrszss.setOption({
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
    }
  }
}

</script>

<style scoped>
.el-button{
    margin-top: 5px;
}

</style>
