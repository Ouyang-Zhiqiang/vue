<template>
  <div
    style="
      width: 1500px;
      padding: 30px;
      background: #ffffff;
      margin-left: 85px;
      margin-top: 30px;
      border-radius: 10px;
    "
  >
    <div class="kcxx">
      <h2>课程信息</h2>
      <div style="margin-left: 0px">课程名称:{{ this.query.coursename }}</div>
      <div>上课日期:{{ this.query.scheduledate }}</div>
      <div>
        开课时间:{{ this.query.schedulebegin }}-{{ this.query.scheduleend }}
      </div>
      <div>教练:{{ this.query.coachname }}</div>
      <div>
        预约人数:{{ this.getyysl(this.users) }}/1
      </div>
      <div>
        <el-button type="primary" size="mini" style="margin-top:-6px" @click="toUrl()">预约</el-button>
      </div>
    </div>
    <br />
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="tel" label="电话" width="130"> </el-table-column>
      <el-table-column prop="traineenum" label="人数" width="100">
      </el-table-column>
      <el-table-column prop="cardname" label="会员卡" width="180">
      </el-table-column>
      <el-table-column label="签到状态" width="100">
        <template slot-scope="scope">
          <span
            v-if="scope.row.signstate == '1'"
            style="color: green; font-weight: 600"
          >
            已签到
          </span>
          <span v-else-if="scope.row.signstate == '0'">未签到</span>
        </template>
      </el-table-column>
      <el-table-column label="预约状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.ordstate == '1'">已预约</span>
          <span
            v-else-if="scope.row.ordstate == '2'"
            style="color: red; font-weight: 600"
          >
            已取消
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注"> </el-table-column>
      <el-table-column prop="createdon" label="预约时间" width="200">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.ordstate == 1 && scope.row.signstate == 0">
            <el-button type="text" @click="signed(scope.row)">签到</el-button>
            <el-button type="text" @click="cancleord(scope.row)"
              >取消预约</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    {{this.query}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {},
      users: [],
      reservablenumber: "",
    };
  },
  created() {
    this.query = this.$route.query.item
    this.getusers()
  },
  methods: {
      getusers() {
      var data = {};
      data.ScheduleId = this.query.scheduleid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLO6FHI",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.users = res.data.rows;
        });
    },
    getyysl(e) {
      var i = 0;
      if (e != null) {
        for (var j = 0; j < e.length; j++) {
          if (e[j].ordstate == 1) {
            i+=e[j].traineenum
          }
        }
      }
      return i;
    },
    signed(e) {
      //签到
      var obj = {};
      obj = e;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHHP",
          this.$qs.stringify(obj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "恭喜你，操作成功",
            type: "success"
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    cancleord(e) {
      //取消预约
      var obj = {};
      obj = e;
      var teamschedule={}
      teamschedule.traineenum=e.traineenum
      teamschedule.scheduleid=this.query.scheduleid
       this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLO6U00",
          this.$qs.stringify(teamschedule),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHI3",
          this.$qs.stringify(obj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.cancleThenSend(obj)
          this.$message({
            message: "恭喜你，操作成功",
            type: "success"
          });
        })
        .catch((error) => {
          this.$message.error("222错了哦，这是一条错误消息");
        });
    },
    cancleThenSend(obj){
       console.log(obj)
       this.$axios.post('http://www.facebodyfitness.com/web/ordercourse/CancelCourseOrdersByOrderIdAndUserId', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: "短信发送成功",
            type: "success"
          });
          this.getusers()
             }).catch(error=>{
                this.$message.error('错了哦，这是一条错误消息');
            })
    }
    ,
    toUrl() {
      // console.log(e)
      this.$router.push({
        path: "/afcbdyyqd/yy",
        query: {
          item: this.query,
          type:'私教'
        }
      });
    }

  }
};
</script>

<style>
.kcxx {
  width: 1440px;
  height: 150px;
  background: seashell;
  padding: 20px;
  border-radius: 10px;
}
.kcxx div {
  float: left;
  margin-left: 100px;
  font-size: 16px;
  font-weight: bold;
}
</style>
