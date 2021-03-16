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
    <div class="jg">
       <div>
        <el-button type="primary" size="mini" style="margin-top:-6px" @click="toUrl()">预约</el-button>
      </div>

      <div v-if="isremoved()">
        <el-button type="primary" size="mini" style="margin-top:-6px" @click="deletesj()">删除</el-button>
      </div>

      <!-- <div v-if="isShow()">
        <el-button type="primary" size="mini" style="margin-top:-6px" @click="updateCoach()">编辑</el-button>
      </div> -->
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

    <el-dialog title="编辑" :visible.sync="dialogVisible1" style="width:1200px;margin:0 auto"> 
      <el-form :model="form">
        <el-form-item label="运动馆:" :label-width="formLabelWidth" required>
          <span>{{ form.storename }}</span>
        </el-form-item>

          <el-form-item label="选择课程" :label-width="formLabelWidth" required>
            <el-select v-model="form.courseid" style="width:200px;float:left">
              <el-option v-for="item in allCourse" :key="item.mycourseid" :label="item.coursename" :value="item.mycourseid" />
            </el-select>
          </el-form-item>
         
        <el-form-item label="上课开始时间" :label-width="formLabelWidth" required>
          <el-select v-model="form.hourse" style="width:100px;float:left">
            <el-option v-for="item in startHourse" :key="item" :label="item" :value="item" />
          </el-select><span style="float:left;padding:0 5px">点</span>
          <el-select v-model="form.minutes" style="width:100px;float:left">
            <el-option v-for="item in startMinute" :key="item" :label="item" :value="item" />
          </el-select><span style="float:left;padding:0 5px">分</span>
        </el-form-item>
        <el-form-item label="课程时长:" :label-width="formLabelWidth" required>
          <el-input v-model="form.courseduration" style="width:270px;float:left" />&nbsp;&nbsp;&nbsp;&nbsp;min
        </el-form-item>
        <el-form-item label="已约人数:" :label-width="formLabelWidth" required>
          <span>{{ form.reservednumber}}</span>
        </el-form-item>
        <el-form-item label="可预约人数:" :label-width="formLabelWidth" required>
         <span>1</span>&nbsp;&nbsp;&nbsp;&nbsp;
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="toTrueClose()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {},
      users: [],
      allCourse:[],
      
      formLabelWidth: '150px',
      startHourse:['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      startMinute:['00', '15', '30', '45'],
      dialogVisible1:false,
      form:{
        storename:'',
        coursename:'',
        hourse:'',
        courseduration:'60',
        minutes:'',
        reservednumber:'',
        isopened:'',
        scheduleid:'',
        schedulebegin:'',
        scheduleend:'',
        courseid:'',
        reservablenumber: ""
      },
    };
  },
  created() {
    this.query = this.$route.query.item
    this.getusers()
    this.getPreCourse()
  },
  methods: {
      getusers() {
      var data = {};
      data.scheduleid = this.query.scheduleid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getPivateuser",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.users = res.data;
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
          "https://www.facebodyfitness.com/web/new/signedsj",
          this.$qs.stringify(obj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "恭喜你，操作成功",
            type: "success"
          });
          this.getusers()
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
      teamschedule.ordid=e.ordid
      console.log(e)
       this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/cancelReservation3",
          this.$qs.stringify(teamschedule),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/cancelReservation",
          this.$qs.stringify(obj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.cancleThenSend(obj)
          this.$message({
            message: "恭喜你，操作成功",
            type: "success"
          });
          this.getusers()

        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });

    },
    cancleThenSend(obj){
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
     getPreCourse(){
            this.$axios.post('https://www.facebodyfitness.com/web/new/getPreCourse', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.allCourse=res.data
            });
        },
    toTrueClose(){
          if(this.form.hourse==""||this.form.hourse==null||this.form.hourse==undefined||this.form.minutes==''||this.form.minutes==null||this.form.minutes==undefined){
            this.$message.warning("请选择课程时间！");
          }else{
            var data={}
            data=this.form
            data.scheduleid=this.query.scheduleid
            data.schedulebegin=data.hourse+":"+data.minutes
            this.allCourse.forEach((item2)=>{
                        if(this.form.courseid==item2.mycourseid){
                            data.coursename=item2.coursename
                        }
                    })
                this.$axios
                .post(
                  "https://www.facebodyfitness.com/hi/main?hi=24CQRLLOS5KV",
                  this.$qs.stringify(data),
                  { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
                )
                .then((res) => {
                  this.$message({
                  message: '编辑成功！',
                  type: 'success'
                });
                this.$router.push({
                path: "/afcbdkcgl/sjgl"
              });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
          }
    },
    isremoved(){
      if(this.users.length<=0){
        return true
      }
      for(var i=0;i<this.users.length;i++){
        if(this.users[i].ordstate==1){
          return false
        }
      }
      return true
    },
        // 修改本次课程教练
    updateCoach(){
        this.form.courseid=this.query.courseid
        this.form.coursename=this.query.coursename
        this.form.storename=this.query.storename
        this.form.reservednumber=this.query.reservednumber
        this.form.reservablenumber=this.query.reservablenumber
        this.form.isopened=this.query.isopened=true?'0':'1'
        this.form.hourse=this.query.schedulebegin.split(':')[0]
        this.form.minutes=this.query.schedulebegin.split(':')[1]
        this.form.scheduleend=this.query.scheduleend
        this.form.courseduration=this.form.courseduration
        
        this.dialogVisible1=true
    },
    isShow(){
      if(this.query.reservednumber==0){
        return true
      }else{
        return false
      }
    },
    deletesj(){
       var data={}
      data.scheduleid=this.query.scheduleid
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/deletesj",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
          message: '删除成功！',
          type: 'success'
        });
        this.$router.push({
        path: "/afcbdkcgl/sjgl"
      });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
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
.jg div{
  float: left;
  margin-left: 20px;
}
</style>
