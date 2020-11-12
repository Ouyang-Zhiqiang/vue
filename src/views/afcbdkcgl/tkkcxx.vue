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
        预约人数:{{ this.getyysl(this.users) }}/{{ this.reservablenumber }}
      </div>
      <div>
        <el-button type="primary" size="mini" style="margin-top:-6px" @click="dialogVisible = true">修改可预约人数</el-button>
      </div>
      <div>
        <el-button type="primary" size="mini" style="margin-top:-6px" @click="toUrl()">预约</el-button>
      </div>
      <div>
        <el-button type="primary" size="mini" style="margin-top:-6px" @click="updateCoach()">修改课程教练</el-button>
      </div>

      <div v-if="isremoved()">
        <el-button type="primary" size="mini" style="margin-top:-6px" @click="deletetk()">删除</el-button>
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

    <el-dialog title="修改可预约人数" :visible.sync="dialogVisible" width="30%" :before-close="quxiao">
      <el-input v-model="reservablenumber"></el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="quxiao()">取 消</el-button>
      <el-button type="primary" @click="queding()">确 定</el-button>
      </span>
    </el-dialog>

       <el-dialog title="修改本课程教练" :visible.sync="dialogVisible1" style="width:1200px;margin:0 auto"> 
          <el-form :model="form">
            <el-form-item label="本课程教练" :label-width="formLabelWidth" required>
              <span>{{form.thiscoachname}}</span>
            </el-form-item>
         
            <el-form-item label="修改为" :label-width="formLabelWidth" required>
                <el-select  v-model="form.coachid"  placeholder="全部教练">
                <el-option
                  v-for="item in options2"
                  :key="item.userid"
                  :label="item.name"
                  :value="item.userid"
                />
              </el-select>
              </el-form-item>
              </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
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
       //教练
      options2: [],
      form:{
        thiscoachid:'',
        thiscoachname:'',
        coachid: "B",
        coachname:''
      },
      dialogVisible1:false,
      formLabelWidth: '150px',
      reservablenumber: "",
      dialogVisible: false
    };
  },
  created() {
    this.query = this.$route.query.item;
    this.getusers();
    this.getAllCoach();
  },
  methods: {
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
  
    getAllCoach() {
      this.$axios
        .post("https://www.facebodyfitness.com/hi/main?hi=24BACFMEW860", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then((res) => {
          var obj = { userid: "B", name: "全部教练" };
          this.options2 = res.data.rows;
          this.options2.unshift(obj);
        });
    },
    queding(){
      var data={}
      data.reservablenumber=this.reservablenumber
      data.scheduleid=this.query.scheduleid
        this.$axios.post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLO6MHQ",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.getreservablenumber()
          this.dialogVisible=false
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    quxiao(){
      this.getreservablenumber()
      this.dialogVisible=false
    },
    getreservablenumber(){
      var data={}
      data.scheduleid=this.query.scheduleid
          this.$axios.post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLO6MQK",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.reservablenumber=res.data.rows[0].reservablenumber
        });
    },
    getusers() {
      var data = {};
      data.scheduleid = this.query.scheduleid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/CCourse/getcourseinformation",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.users = res.data;
          if(this.users.length>=1){
            this.reservablenumber = res.data[0].reservablenumber
          }else{
            this.reservablenumber=this.query.reservablenumber
          }
          
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
          this.getAllTeam();
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    cancleord(e, coachid) {
      e.coachid = this.query.coachid; //取消预约
      var obj = {};
      obj = e;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHI3",
          this.$qs.stringify(obj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.cancleThenSend(obj);
          this.getusers();
          this.getreservablenumber();
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
        var teamschedule={}
        teamschedule.traineenum=e.traineenum
        teamschedule.scheduleid=this.query.scheduleid
         this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLO6TV3",
          this.$qs.stringify(teamschedule),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        ).then((res) => {
          this.$message({
            message: "恭喜你，操作成功",
            type: "success"
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    cancleThenSend(obj) {
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/ordercourse/CancelCourseOrdersByOrderIdAndUserId",
          this.$qs.stringify(obj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          console.log("ok");
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    toUrl() {
      this.$router.push({
        path: "/afcbdyyqd/yy",
        query: {
          item: this.query,
          type:'团课'
        }
      });
    },
    // 修改本次课程教练
    updateCoach(){
        this.form.thiscoachid=this.query.coachid
        this.form.thiscoachname=this.query.coachname
        this.dialogVisible1=true

    },
      toTrueClose(){
        var cid=this.form.coachid
        if(cid!='B'||!cid.equals('B')){
        var name=this.options2.forEach((item)=>{
                  if(item.userid==cid){
                  this.form.coachname=item.name
                  }
                });
        }else{
          message: '请选择教练！'
        }
        

    },
    deletetk(){
      var data={}
      data.scheduleid=this.query.scheduleid
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLOC68Z",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
          message: '删除成功！',
          type: 'success'
        });
        this.$router.push({
        path: "/afcbdkcgl/tkgl"
      });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });

      
    }
  },
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
  margin-left:40px;
  font-size: 16px;
  font-weight: bold;
}
</style>
