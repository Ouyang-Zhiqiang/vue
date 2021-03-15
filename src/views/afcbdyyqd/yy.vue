<template>
  <div id="container" style="padding: 15px; padding-top: 25px">
    <div style="width: 650px; margin-left: 25%; margin-top: 40px">
      <el-form label-width="100px">
        <el-form-item label="姓名">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            style="width: 300px"
            @select="handleSelect"
          />
        </el-form-item>

        <el-form-item v-show="showNow" label="基本信息">
          <img
            :src="user.imgurl"
            style="width: 70px; height: 70px; border-radius: 50%; float: left"
          >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ user.name }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span v-show="user.sex == 0">男</span><span v-show="user.sex == 1">女</span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ user.tel }}</span>
        </el-form-item>

        <el-form-item v-show="showNow" label="会员卡">
          <template>
            <div>
              <el-radio
                v-for="(item, index) in cardlist"
                :key="index"
                v-model="selectedCardno"
                :label="item.cardno"
              >
                <span>{{ item.cardname }}</span>&nbsp;&nbsp;&nbsp;
                <span
                  v-if="item.isopen == true"
                >{{ item.cardbegin }}~{{ item.cardend }}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  v-if="
                    item.isopen == false ||
                      item.isopen == '' ||
                      item.isopen == null
                  "
                >未开卡</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="item.cardtype == 'S'">{{ item.curtimes }}次</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="item.cardtype == 'S'">次卡</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="item.cardtype == 'P'">期卡</span>&nbsp;&nbsp;&nbsp;&nbsp;
              </el-radio>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="人数">
          <el-input-number
            v-model="form.traineenum"
            :min="1"
            style="width: 250px"
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="form.remarks" style="width: 250px" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [],
      state: "",
      timeout: null,
      results: [],
      showNow: false,
      user: {},
      form: {
        ordtype: "",
        userid: "",
        currentpoints1: 0,
        currentpoints: 0,
        points: 0,
        add: 0,
        pre: 0,
        gamepoints: 0,
        surpluspoints: 0,
        surpluspoints1: 0,
        actionstate: "",
        remarks: "",
        query: {},
        mycards: [],
        traineenum: 1
      },
      selectedCardno: "",
      cardlist: [],
      type: ""
    };
  },
  created() {
    this.query = this.$route.query.item;
    console.log(this.query)
    this.type = this.$route.query.type;
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  onLoad() {
    this.getAllUsers();
  },
  methods: {
    getUsers(e) {
      var data = { name: "" };
      data.name = e;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAD8",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.jfarr = res.data.rows;
          this.listLoading = false;
        });
    },
    getAllUsers() {
      this.$axios
        .post("https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAI3", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then((res) => {
          this.results = res.data.rows;
        });
    },

    onSubmit() {
      this.form.storename = this.query.storename;
      this.form.storeid = this.query.storeid;
      this.form.coachname = this.query.coachname;
      this.form.coachid = this.query.coachid;
      this.form.scheduleid = this.query.scheduleid;
      this.form.coursedate = this.query.scheduledate;
      this.form.coursetime = this.query.schedulebegin;
      this.form.courseendtime = this.query.scheduleend;
      this.form.coursename = this.query.coursename;
      this.form.courseid = this.query.courseid;
      this.form.userid = this.user.userid;
      this.form.createdby = localStorage.getItem("userid");
      this.form.createdname = localStorage.getItem("username");
      this.form.lasteby = localStorage.getItem("userid");
      this.form.lastename = localStorage.getItem("username");
      if(this.form.traineenum==''||this.form.traineenum==null||this.form.traineenum<=0){
        return  this.$message.error("请选择人数！");
      }
      this.cardlist.forEach((item) => {
        this.form.periodvalidity = item.periodvalidity;
        if (item.cardno == this.selectedCardno) {
          this.form.cardno = item.cardno;
          this.form.cardtype = this.type == "团课" ? "T" : "P";
          this.form.isopen = item.isopen;
          if (item.cardtype == "S") {
            this.form.usabletimes =
              parseInt(item.curtimes) - parseInt(this.form.traineenum);
            this.form.courseprice =
              item.timefee * parseInt(this.form.traineenum);
            this.form.cardname = item.cardname;
          } else if (item.cardtype == "P") {
            this.form.usabletimes = parseInt(
              (new Date(item.cardend) - new Date()) / (1000 * 60 * 60 * 24)
            );
            this.form.courseprice = 0;
          }
        }
      });
      if (this.selectedCardno == "" || this.selectedCardno == undefined) {
        this.$message.error("请选择会员卡");
      } else {
        this.yycourse(this.form);
      }
    },
    querySearchAsync(queryString, cb) {
      // var restaurants = this.restaurants;
      // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      //   cb(results);
      // }, 3000 * Math.random());
      var data = {};
      data.name = queryString;
      this.$axios
        .post(
          "http://localhost:8081/web/new/setUser",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          var results =res.data;
          cb(results);
        });
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.selectedCardno = "";
      this.$axios
        .post(
          "http://localhost:8081/web/Appointment/userByNameAndTel",
          this.$qs.stringify(item),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.user = res.data[0];
          
          // if (res.data.row) {
            this.showNow = true;
            this.user.coursetype = this.type == "团课" ? "T" : "P";
            this.user.cid = this.query.cid;

            console.log(this.user)
            this.$axios
              .post(
                "http://localhost:8081/web/Appointment/selectCardListByStr",
                this.$qs.stringify(this.user),
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }
              )
              .then((res) => {
                this.cardlist = res.data;
                this.$axios
                  .post(
                    "http://localhost:8081/web/Appointment/isStaff",
                    this.$qs.stringify(this.user),
                    {
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      }
                    }
                  )
                  .then((res) => {
                    if (res.data.length > 0) {
                      this.form.ordtype = "E";
                    } else {
                      this.form.ordtype = "U";
                    }
                  });
              });
          //}
        });
    },
    loadAll() {
      return [];
    },
    yycourse(e) {
      //未开卡时
      if (e.isopen == false || e.isopen == "false") {
        this.$axios
          .post(
            "http://localhost:8081/web/Appointment/activateCard",
            this.$qs.stringify(e),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then((res) => {
            this.$message({
              message: "开卡成功",
              type: "success"
            });
          })
          .catch((error) => {
            this.$message.error("错了哦，这是一条错误消息");
          });
      }
      if (this.type == "团课") {
        this.$axios
          .post(
            "http://localhost:8081/web/Appointment/updateReservedNumber",
            this.$qs.stringify(e),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then((res) => {
            this.$message({
              message: "修改团课人数成功",
              type: "success"
            });
          })
          .catch((error) => {
            this.$message.error("错了哦，这是一条错误消息");
          });
      } else {
        this.$axios
          .post(
            "http://localhost:8081/web/Appointment/updateReservedNumberPrivate",
            this.$qs.stringify(e),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then((res) => {
            this.$message({
              message: "修改私教人数成功",
              type: "success"
            });
          })
          .catch((error) => {
            this.$message.error("错了哦，这是一条错误消息");
          });
      }

      this.$axios
        .post(
          "http://localhost:8081/web/Appointment/appointmentCourse",
          this.$qs.stringify(e),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.form = {};
          this.$message({
            message: "恭喜你，操作成功",
            type: "success"
          });

          // var uid={userid:''}
          // uid.userid=this.user.userid
          //       this.$axios.post('http://localhost:8081/web/Appointment/selectStoreByUserid', this.$qs.stringify(uid), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          //        var st=res.data.storeid
          //        console.log(st)
          //       if(st!='2020082713550410017'||!st.equals('2020082713550410017')){
          //         console.log("erfer")
          //          var ss={}
          //           ss=e
          //           this.$axios.post('https://www.facebodyfitness.com/web/ordercourse/SendToMembersAndCoach', this.$qs.stringify(ss), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          //           this.$message({
          //           message: '短信已发送',
          //           type: 'success'
          //           })
          //           }).catch(error=>{
          //                           this.$message.error('错了哦，这是一条错误消息');
          //           })
          //           }
          //      })

               this.$router.push({
                 path:'/afcbdyyqd/afcbdyyqd',
                 query: {
                 }
             })
        //   var param = {};
        //   param.templatetype = 1;
        //   param.time = e.coursedate + " " + e.coursetime;
        //   param.coursename = e.coursename;
        //   param.userid=this.user.userid;
        //   console.log(param);
        //   this.$axios
        //     .post(
        //       "https://www.facebodyfitness.com/web/wxremind/geiWxRemind",
        //       this.$qs.stringify(param),
        //       {
        //         headers: {
        //           "Content-Type": "application/x-www-form-urlencoded",
        //         },
        //       }
        //     )
        //     .then((res) => {
        //       this.$message({
        //         message: "服务号已发送",
        //         type: "success",
        //       });
        //     })
        //     .catch((error) => {
        //       this.$message.error("错了哦，这是一条错误消息");
        //     });
        });
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
