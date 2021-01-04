<template>
  <div id="list" style="padding: 15px">
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
        style="margin-top: 5px"
        type="daterange"
        range-separator="to"
        start-placeholder="Start date"
        end-placeholder="End date"
      />

      <el-button
        type="success"
        style="margin-left: 20px; margin-top: 5px"
        @click="clickSearch"
      >搜索</el-button>
      <el-button type="success" @click="daochu">导出Excel</el-button>
    </div>

    <el-card id="out-table" class="box-card" style="margin-top: 15px">
      <div v-for="(item, index) in list" :key="index">
        <div
          style="
            margin-top: 30px;
            width: 100%;
            height: 45px;
            background: #d9edf7;
            border-radius: 8px 8px 0px 0px;
            line-height: 45px;
          "
        >
          <el-tag style="margin-left: 15px">{{ courseType }}</el-tag>
          <el-tag style="margin-left: 15px">{{ item.scheduledate }}</el-tag>
          <el-tag
            style="margin-left: 15px"
          >{{ item.schedulebegin }}-{{ item.scheduleend }}</el-tag>
          <el-tag style="margin-left: 15px">{{ item.coursename }}</el-tag>
          <el-tag style="margin-left: 15px">{{ item.coachname }}</el-tag>
          <el-tag style="margin-left: 15px">{{ item.storename }}</el-tag>
          <el-button
            type="success"
            size="mini"
            style="float: right; margin-top: 8px; margin-right: 15px"
            @click="toUrl(item, courseType)"
          >预约</el-button>
          <span
            style="
              margin-right: 15px;
              float: right;
              font-weight: 650;
              font-size: 20px;
              color: #1890ff;
              margin-top: 2px;
            "
          >
            {{getyysl(item.users) }}/{{ item.reservablenumber }}
          </span>
        </div>
        <el-table
          v-loading="listLoading"
          :data="item.users"
          border
          fit
          highlight-current-row
          style="margin-top: 0px"
        >
          <el-table-column align="center" label="会员" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
              <span id="sp">{{item.coachid }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="120" label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.tel }}</span>
            </template>
          </el-table-column>

          <el-table-column width="50" align="center" label="人数">
            <template slot-scope="scope">
              <span>{{ scope.row.traineenum }}</span>
            </template>
          </el-table-column>

          <el-table-column width="200" label="会员卡/剩余" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.cardname }} / {{ scope.row.curtimes }}</span>
            </template>
          </el-table-column>
          <el-table-column width="80" label="课程价格" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.courseprice.toFixed(2) }} </span>
            </template>
          </el-table-column>

          <el-table-column label="备注" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>

          <el-table-column width="80" label="签到状态" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.signstate == '1'"
                style="color: green; font-weight: 600"
              >已签到</span>
              <span v-else-if="scope.row.signstate == '0'">未签到</span>
            </template>
          </el-table-column>

          <el-table-column width="80" label="预约状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.ordstate == '1'">已预约</span>
              <span
                v-else-if="scope.row.ordstate == '2'"
                style="color: red; font-weight: 600"
              >已取消</span>
            </template>
          </el-table-column>

          <el-table-column width="160" label="上课时间" align="center">
            <template>
              <span>{{ item.scheduledate }} {{ item.schedulebegin }}</span>
            </template>
          </el-table-column>

          <el-table-column width="160" label="操作时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastedon }}</span>
            </template>
          </el-table-column>

          <el-table-column width="160" label="操作" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.ordstate == 1 && scope.row.signstate == 0">
                <el-button
                  type="text"
                  @click="signed(scope.row)"
                >签到</el-button>
                <el-button
                  type="text"
                  @click="cancleord(scope.row,item.scheduleid,item.coachid )"
                >取消预约</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
     
    </el-card>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      style="float: right"
      @pagination="getAllTeam"
    />
  </div>
</template>

<script>
import data from "../pdf/content";
import { fetchList } from "@/api/hy";
import Pagination from "@/components/Pagination";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      //运动馆
      options1: [],
      //教练
      options2: [],  
      options5: [
        {
          value: "C",
          label: "全部状态"
        },
        {
          value: "1",
          label: "已签到"
        },
        {
          value: "0",
          label: "已取消"
        }
      ],
      options6: [
        {
          value: "团课",
          label: "团课"
        },
        {
          value: "私教",
          label: "私教"
        }
      ],
      teamschedule:{
        traineenum:0,
        scheduleid:''
      },
      courseType: "团课",
      selectForm: {
        storeid:"",
        coachid: "B",
        status: "C",
        day1: "",
        day2: ""
      },
      value6: {},
      dayRange: []
    };
  },
  created() {
    this.toStartDate();
    this.getAllCoach();
    this.getAllStore();
    // this.getTimeRange('2020-03-04','2020-03-11')
  },
  methods: {
    toStartDate() {
      var currentDate = new Date(Date.parse(new Date()));
      var startDate = new Date(Date.parse(new Date()) - 24 * 60 * 60 * 1000);
      var arr = [];
      arr.push(startDate);
      arr.push(currentDate);
      this.value6 = arr;
    },
    getTimeRange(start, end) {
      var start = start;
      var end = end;
      var startTime = this.getDate(start);
      var endTime = this.getDate(end);
      this.dayRange = [];
      while (endTime.getTime() - startTime.getTime() >= 0) {
        var year = startTime.getFullYear();
        var month =
          startTime.getMonth().toString().length == 1
            ? "0" + startTime.getMonth().toString()
            : startTime.getMonth();
        var day =
          startTime.getDate().toString().length == 1
            ? "0" + startTime.getDate()
            : startTime.getDate();
        this.dayRange.unshift(year + "-" + month + "-" + day);
        startTime.setDate(startTime.getDate() + 1);
      }
    },
    getDate(datestr) {
      var temp = datestr.split("-");
      var date = new Date(temp[0], temp[1], temp[2]);
      return date;
    },
    getAllTeam() {
      var data = {};
      data.storeid = this.selectForm.storeid;
      data.coachid = this.selectForm.coachid;
      data.status = this.selectForm.status;

      data.day1 = this.value6[0].toLocaleDateString().replace(/\//g, "-");
      data.day2 = this.value6[1].toLocaleDateString().replace(/\//g, "-");
      this.getTimeRange(data.day1, data.day2);

      data.page = this.listQuery.page - 1;
      data.limit = this.listQuery.limit;
      this.listLoading = true;
      // if(data.status!=null&&data.status!=''){
      //   if(data.status){

      //   }
      // }
      // data.ordstate=
      if(this.courseType=='团课'){
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24BIUVHG226C",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.list = res.data.rows;
          this.total = res.data.rows[0].counts;
          this.list.forEach((item) => {
            item.users = JSON.parse(item.users);
          });
          this.listLoading = false;
        });
        }else{
           this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNPY1K",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.list = res.data.rows;
          this.total = res.data.rows[0].counts;
          this.list.forEach((item) => {
            item.users = JSON.parse(item.users);
          });
          this.listLoading = false;
        });
        }
    },
    getAllStore() {
      var loginname=localStorage.getItem('username')
      this.$axios
        .post("https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then((res) => {
          var roleid=localStorage.getItem('roleid')
          if(loginname!=null&&(loginname=='系统管理员'||roleid.search('2018053014055110006') !=-1||roleid.search('2018053014114510000') !=-1||roleid.search('2018053014052310002') !=-1)){
             var nostore = { name: "全部运动馆", id: "A" };
             this.options1 = res.data.rows;
             this.options1.unshift(nostore);
             this.selectForm.storeid='A'
          }else{
              var userStore=localStorage.getItem('storeid').split(',')
              var storeArr=res.data.rows
              userStore.forEach(item1=>{
                storeArr.forEach(item => {
                      if(item1==item.id){
                        this.options1.push(item)
                    }
                  })
              })
              this.selectForm.storeid=this.options1[0].id
          }
          this.listLoading = true;
          this.getAllTeam();

        });
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
    clickSearch() {
      this.listLoading = true;
      this.getAllTeam();
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
            type: "success"
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
   cancleord(e,scheduleid,coachid) {  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
     e.coachid=coachid
      //取消预约
      var obj = {};
      obj = e;
 
      this.teamschedule.traineenum=e.traineenum
      this.teamschedule.scheduleid=scheduleid
      if(this.courseType=="团课"){
         this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLO6TV3",
          this.$qs.stringify(this.teamschedule),
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
      }else{
       this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLO6U00",
          this.$qs.stringify(this.teamschedule),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
      }
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHI3",
          this.$qs.stringify(obj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          // this.cancleThenSend(obj)
          this.getAllTeam();
          this.$message({
            message: "恭喜你，操作成功",
            type: "success"
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    cancleThenSend(obj){
       this.$axios.post('https://www.facebodyfitness.com/web/ordercourse/CancelCourseOrdersByOrderIdAndUserId', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: "短信发送成功",
            type: "success"
          });
             }).catch(error=>{
                this.$message.error('错了哦，这是一条错误消息');
            })
    },
    toUrl(e, type) {
      this.$router.push({
        path: "/afcbdyyqd/yy",
        query: {
          item: e,
          type:type
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
    daochu() {
      this.listQuery.limit = 9999;
      this.getAllTeam();
      setTimeout(this.daochuexcel,3000);
      this.listQuery.limit = 20;
      setTimeout(this.getAllTeam,4000);
    },
    daochuexcel(e) {
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "上课日期",
          "课程类型",
          "上课时间段",
          "课程名称",
          "教练姓名",
          "运动馆名称",
          "预约人数",
          "可预约人数",
          "姓名",
          "手机号",
          "会员卡",
          "课程价格",
          "备注",
          "状态",
          "时间"
        ];
        const filterVal = [
          "scheduledate",
          "schedulebegin",
          "coursename",
          "storename"
        ];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "预约人数统计报表"
        });
      });
    },
    formatJson(filterVal, jsonData) {
      var k = 0;
      var arr = new Array();
      for (var i = 0; i < jsonData.length; i++) {
        var a = 0;
        if (jsonData[i].users != null && jsonData[i].users != "") {
          for (var j = 0; j < jsonData[i].users.length; j++) {
            arr[k] = [
              jsonData[i].scheduledate,
              this.courseType,
              jsonData[i].schedulebegin + "-" + jsonData[i].scheduleend,
              jsonData[i].coursename,
              jsonData[i].coachname,
              jsonData[i].storename,
              jsonData[i].users[j].traineenum,
              jsonData[i].reservablenumber,
              jsonData[i].users[j].name,
              jsonData[i].users[j].tel,
              jsonData[i].users[j].cardname +
                "/" +
                jsonData[i].users[j].curtimes,
              jsonData[i].users[j].courseprice,
              jsonData[i].users[j].remarks,
              jsonData[i].users[j].ordstate == 1 ? "已预约" : "已取消",
              jsonData[i].users[j].lastedon
            ];
            if (jsonData[i].users[j].ordstate == 1) {
              a++;
            }
            if (j == jsonData[i].users.length - 1) {
              k++;
              arr[k] = [
                "实际约课人数",
                a + "/" + jsonData[i].reservablenumber,
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
              ];
            }
            k++;
          }
        }
      }
      return arr;
    }
  }
};
</script>

<style>
.el-select {
  margin-top: 5px;
  width: 150px;
}
.el-card__body {
  padding-top: 0px;
}
#sp{
  display: none;
}
</style>
