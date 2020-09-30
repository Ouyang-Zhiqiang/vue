<template>
  <div id="list" style="padding:15px">

    <div>
      <el-select v-model="selectForm.storeid" placeholder="全部运动馆">
        <el-option
          v-for="item in options1"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="selectForm.coachid" placeholder="全部教练">
        <el-option
          v-for="item in options2"
          :key="item.userid"
          :label="item.name"
          :value="item.userid"
        />
      </el-select>

      <el-select v-model="selectForm.status">
        <el-option
          v-for="item in options5"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select v-model="courseType">
        <el-option
          v-for="item in options6"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-date-picker
        v-model="value6"
        style="margin-top: 5px;"
        type="daterange"
        range-separator="to"
        start-placeholder="Start date"
        end-placeholder="End date"
      />

      <el-button type="success" style="margin-left:20px;margin-top: 5px;" @click="clickSearch">搜索</el-button>
      <el-button type="success">导出Excel</el-button>
    </div>

    <el-card class="box-card" style="margin-top:15px;">
      <div v-for="(item,index) in list" :key="index">
        <div style="margin-top:30px;width:100%;height:45px;background:#D9EDF7;border-radius:8px 8px 0px 0px;line-height:45px;">
          <el-tag style="margin-left:15px">{{ courseType }}</el-tag>
          <el-tag style="margin-left:15px">{{ item.scheduledate }}</el-tag>
          <el-tag style="margin-left:15px">{{ item.schedulebegin }}-{{ item.scheduleend }}</el-tag>
          <el-tag style="margin-left:15px">{{ item.coursename }}</el-tag>
          <el-tag style="margin-left:15px">{{ item.coachname }}</el-tag>
          <el-tag style="margin-left:15px">{{ item.storename }}</el-tag>
          <el-button type="success" size="mini" style="float:right;margin-top:8px;margin-right:15px" @click="toUrl(item,courseType)">预约</el-button>
        </div>
        <el-table v-loading="listLoading" :data="item.users" border fit highlight-current-row style="margin-top:0px">
          <el-table-column align="center" label="会员" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="150" label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.tel }}</span>
            </template>
          </el-table-column>

          <el-table-column width="100" align="center" label="人数">
            <template>
              <span>1</span>
            </template>
          </el-table-column>

          <el-table-column width="200" label="会员卡/剩余" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.cardname }} / {{ scope.row.curtimes }}</span>
            </template>
          </el-table-column>

          <el-table-column width="220" label="备注" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120" label="签到状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.signstate == '1'" style="color:green;font-weight:600">已签到</span>
              <span v-else-if="scope.row.signstate == '0'">未签到</span>
            </template>
          </el-table-column>

          <el-table-column width="120" label="预约状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.ordstate == '1'">已预约</span>
              <span v-else-if="scope.row.ordstate == '2'" style="color:red;font-weight:600">已取消</span>
            </template>
          </el-table-column>

          <el-table-column width="200" label="上课时间" align="center">
            <template>
              <span>{{ item.scheduledate }} {{ item.schedulebegin }}</span>
            </template>
          </el-table-column>

          <el-table-column width="200" label="操作时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastedon }}</span>
            </template>
          </el-table-column>

          <el-table-column width="200" label="操作" align="center">
            <template slot-scope="scope"> 
              <div v-if="scope.row.ordstate==1&&scope.row.signstate==0">
                <el-button type="text" @click="signed(scope.row)">签到</el-button>
                <el-button type="text" @click="cancleord(scope.row)">取消预约</el-button>
              </div>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-card>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAllTeam" />
  </div>
</template>

<script>
import data from '../pdf/content';
import { fetchList } from '@/api/hy';
import Pagination from '@/components/Pagination';

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit:20
      },
      //运动馆
      options1: [],
      //教练
      options2: [],
      options5: [{
        value: 'C',
        label: '全部状态'
        }, {
        value: '1',
        label: '已签到'
        }, {
        value: '0',
        label: '已取消'
        }],
      options6: [{
      value: '团课',
      label: '团课'
      }, {
      value: '私教',
      label: '私教'
      }],
      courseType:'团课',
      selectForm:{
        storeid:'A',
        coachid:'B',
        status:'C',
        day1:'',
        day2:''
      },
      value6:{},
      dayRange:[]
    }
  },
  created(){
    this.toStartDate()
    this.getAllCoach()
    this.getAllStore()
    this.getAllTeam()
    // this.getTimeRange('2020-03-04','2020-03-11')
  },
  methods: {
    toStartDate(){
      var currentDate = new Date(Date.parse(new Date()))
      var startDate=new Date(Date.parse(new Date())-24 * 60 * 60 * 1000)
      var arr = []
      arr.push(startDate)
      arr.push(currentDate)
      this.value6=arr
    },
    getTimeRange(start, end){
      var start = start;
      var end = end;
      var startTime = this.getDate(start);
      var endTime = this.getDate(end);
      this.dayRange=[]
      while((endTime.getTime()-startTime.getTime())>=0){
        var year = startTime.getFullYear();
        var month = startTime.getMonth().toString().length==1?"0"+startTime.getMonth().toString():startTime.getMonth();
        var day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
        this.dayRange.unshift(year+"-"+month+"-"+day)
        startTime.setDate(startTime.getDate()+1);
      }
      console.log(this.dayRange)
    },
    getDate(datestr){
      var temp = datestr.split("-");
      var date = new Date(temp[0], temp[1], temp[2]);
      return date;
    },
    getAllTeam(){
      var data={}
      data.storeid=this.selectForm.storeid
      data.coachid=this.selectForm.coachid
      data.status=this.selectForm.status
      data.day1 = this.value6[0].toLocaleDateString().replace(/\//g, '-')
      data.day2 = this.value6[1].toLocaleDateString().replace(/\//g, '-')
      this.getTimeRange(data.day1, data.day2)

      data.page=this.listQuery.page-1
      data.limit=this.listQuery.limit
      this.listLoading=true
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG226C', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.list=res.data.rows
        this.total=res.data.rows[0].counts
        this.list.forEach((item)=>{
          item.users=JSON.parse(item.users)
        })
        this.listLoading=false
      });
    },
    getAllStore(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        var nostore={name:'全部运动馆', id:'A'}
        this.options1=res.data.rows
        this.options1.unshift(nostore)
      });
    },
    getAllCoach(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW860', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          var obj = {userid:'B', name:'全部教练'}
          this.options2=res.data.rows
          this.options2.unshift(obj)
      })
    },
    clickSearch(){
      // console.log(this.value6[0].toLocaleDateString().replace(/\//g, '-'))
      // console.log(this.value6[1].toLocaleDateString().replace(/\//g, '-'))
      this.listLoading=true
      this.getAllTeam()
    },
    signed(e){//签到
      var obj={}
      obj=e
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHHP', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.getAllTeam()
        this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
        });
    },
    cancleord(e){//取消预约
      var obj={}
      obj=e
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHI3', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.getAllTeam()
        this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
      });
    },
    toUrl(e, type){
      // console.log(e)
      this.$router.push({
          path:'/afcbdyyqd/yy',
          query: {
              item: e
          }
      })
    }
  }
}
</script>

<style>
.el-select{
    margin-top: 5px;
    width: 150px;
}
.el-card__body{
  padding-top:0px
}

</style>
