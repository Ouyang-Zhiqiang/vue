<template>
  <div id="container" style="padding: 15px">
    <el-button v-if="allstore" @click="toGetAllStoreUser()">全部运动馆</el-button>
    <el-button
      v-for="(item, index) in theAllstores"
      :key="index"
      @click="toGetAllByStore(item.id)"
    >{{ item.name }}</el-button>

    <el-tabs type="border-card" style="margin-top: 20px">
      <el-select v-model="coachid1" placeholder="全部教练" @change="getTest">
        <el-option label="全部教练" value="" />
        <el-option
          v-for="item in theAllCoach"
          :key="item.userid"
          :label="item.name"
          :value="item.userid"
        />
      </el-select>

      <el-date-picker
        v-model="date1"
        style="margin-top: 5px"
        type="daterange"
        range-separator="to"
        start-placeholder="Start date"
        end-placeholder="End date"
        @change="dateChange1"
      />

      <el-tab-pane label="课程分析">
        <el-row :gutter="10">
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
            style="height: 320px"
          >
            <div
              id="tab1-1"
              style="
                width: 400px;
                height: 300px;
                margin: 0 auto;
                margin-top: 20px;
              "
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
            style="height: 300px"
          >
            <div
              id="tab1-2"
              style="
                width: 400px;
                height: 300px;
                margin: 0 auto;
                margin-top: 20px;
              "
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
            style="height: 300px"
          >
            <div
              id="tab1-3"
              style="
                width: 400px;
                height: 300px;
                margin: 0 auto;
                margin-top: 20px;
              "
            />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top: 20px">
      <el-tab-pane label="预约人数增长">
        <el-button @click="getDay(7)">近7天</el-button>
        <el-button @click="getDay(15)">近15天</el-button>
        <el-button @click="getDay(30)">近30天</el-button>
        <el-date-picker
          v-model="datevalue"
          style="margin-top: 5px"
          type="daterange"
          range-separator="to"
          start-placeholder="Start date"
          end-placeholder="End date"
          @change="getDay2"
        />

        <div id="tab2-1" style="width: 1500px; height: 320px" />
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top: 20px">
      <el-tab-pane label="课程报表">
        <el-select v-model="coachid2" placeholder="全部教练">
          <el-option label="全部教练" value="" />
          <el-option
            v-for="item in theAllCoach"
            :key="item.userid"
            :label="item.name"
            :value="item.userid"
          />
        </el-select>

        <el-date-picker
          v-model="date2"
          style="margin-top: 5px"
          type="daterange"
          range-separator="to"
          start-placeholder="Start date"
          end-placeholder="End date"
        />

        <el-select
          v-model="coursetype"
          placeholder="课程类型"
          style="margin-top: 5px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- <el-input v-model="kcmcinput" placeholder="课程名称" style="width:180px" /> -->

        <el-button type="success" @click="getKCFX">搜索</el-button>
        <el-button type="success" @click="daochu">导出Excel</el-button>

        <el-table
          v-if="yno == '团课'"
          id="out-table"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="margin-top: 20px"
        >
          <el-table-column align="center" label="日期" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.Date }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="90" label="教练">
            <template slot-scope="scope">
              <span>{{ scope.row.Coach }}</span>
            </template>
          </el-table-column>

          <el-table-column width="100" align="center" label="课程类型">
            <template slot-scope="scope">
              <span v-html="scope.row.Curriculumtype" />
            </template>
          </el-table-column>

          <el-table-column label="课程名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.Curriculumname }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="上课时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.Curriculumtime }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="预约人次" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.Makeanappointment }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="签到人次" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.Signin }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="取消人次" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.Cancel }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="可约人次" width="100">
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

        <el-table
          v-if="yno == '私教'"
          id="out-table"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="margin-top: 20px"
        >
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
              <span v-html="scope.row.Curriculumtype" />
            </template>
          </el-table-column>

          <el-table-column label="课程名称" align="center">
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
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          style="float: right"
          @pagination="getKCFX"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import data from "../pdf/content";
import { fetchList } from "@/api/hy";
import Pagination from "@/components/Pagination";
import { date } from "jszip/lib/defaults";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import $ from "jquery";

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      formLabelWidth: "150px",
      listLoading: false,
      allstore:false,
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0,
      kcmcinput: "",
      datevalue: [],
      options: [
        {
          value: "团课",
          label: "团课"
        },
        {
          value: "私教",
          label: "私教"
        }
      ],
      kclxvalue: "",
      courseitems: {},
      theAllstores: [],
      theAllCoach: [],
      storeid: "",
      date1: [],
      coachid1: "",
      date2: [],
      coachid2: "",
      coursetype: "团课",
      yno: "",
      skrsall: [],
      PersontimesandClassnumber: [],
      Amountoflessonssold: [],
      datearr: [],
      yyrsarr: []
    };
  },
  mounted() {
    this.getAllCoach();
    this.getAllStore();
    this.yskcs();
    this.ckxkzje();
    this.getDay(7);
  },
  created() {
    this.date1[1] = new Date().toLocaleDateString().replace(/\//g, "-");
    this.date1[0] = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 6)
      .toLocaleDateString()
      .replace(/\//g, "-");
    this.date2[1] = new Date().toLocaleDateString().replace(/\//g, "-");
    this.date2[0] = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 6)
      .toLocaleDateString()
      .replace(/\//g, "-");
    this.datevalue[1] = new Date().toLocaleDateString().replace(/\//g, "-");
    this.datevalue[0] = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 6)
      .toLocaleDateString()
      .replace(/\//g, "-");
    this.getTest();
    //  console.log(this.date1)
    //  this.getAllFX(this.listQuery)

    this.getKCFX();
  },
  methods: {
    toGetAllByStore(e) {
      this.storeid = e;
      this.getKCFX();
      this.getTest();
      this.getyysr();
    },
    toGetAllStoreUser() {
      this.storeid = "";
      this.getKCFX();
      this.getTest();
      this.getyysr();
    },

    // 课程统计e
    getTest() {
      var data = {};
      data.CourseDatestart = this.date1[0];
      data.CourseDateend = this.date1[1];
      data.storeid = this.storeid;
      data.coachid = this.coachid1;
      // console.log(data)
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/CAnalysis/getCoursesNumber",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.skrsall = res.data[0];
          this.skrs();
        });

      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/CAnalysis/getPersontimesandClassnumber",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.PersontimesandClassnumber = res.data;
          this.yskcs();
        });

      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/CAnalysis/getAmountoflessonssoldpercard",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.Amountoflessonssold = res.data;
          this.ckxkzje();
        });
    },

    getKCFX() {
      if (this.coursetype == "团课") {
        var data = {};
        data.CourseDatestart = this.date2[0];
        data.CourseDateend = this.date2[1];
        data.storeid = this.storeid;
        data.coachid = this.coachid2;
        data.page = this.listQuery.page;
        data.limit = this.listQuery.limit;
        this.$axios
          .post(
            "https://www.facebodyfitness.com/web/CAnalysis/getctCoursereport",
            this.$qs.stringify(data),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then((res) => {
            // console.log(res.data)
            this.yno = "团课";
            if(res.data==''||res.data==null||res.data=='[]'){
              this.total = 0
            }else{
              this.total = res.data[0].total;
            }
            this.list = res.data;
          });
      } else if (this.coursetype == "私教") {
        var data = {};
        data.CourseDatestart = this.date2[0];
        data.CourseDateend = this.date2[1];
        data.storeid = this.storeid;
        data.coachid = this.coachid2;
        data.page = this.listQuery.page;
        data.limit = this.listQuery.limit;
        // console.log(data)
        this.$axios
          .post(
            "https://www.facebodyfitness.com/web/CAnalysis/getcpCoursereport",
            this.$qs.stringify(data),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then((res) => {
            this.yno = "私教";
            this.list = res.data;
            if(res.data==''||res.data==null||res.data=='[]'){
              this.total = 0
            }else{
              this.total = res.data[0].total;
            }
            // console.log(res)
          });
      }            
    },

    dateChange1() {
      this.date1[0] = this.date1[0].toLocaleDateString().replace(/\//g, "-");
      this.date1[1] = this.date1[1].toLocaleDateString().replace(/\//g, "-");
      this.getTest();
    },
    getAllStore() {
      var loginname=localStorage.getItem('username')
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getStoreIdAll", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then((res) => {
          var roleid = localStorage.getItem("roleid");
          if (
            loginname != null &&
            (loginname == "系统管理员" ||
              roleid.search("2018053014055110006") != -1 ||
              roleid.search("2018053014114510000") != -1)
          ) {
            this.allstore = true;
            this.theAllstores = res.data;
          } else {
            var userStore = localStorage.getItem("storeid").split(",");
            var storeArr = res.data;
            userStore.forEach((item1) => {
              storeArr.forEach((item) => {
                if (item1 == item.id) {
                  this.theAllstores.push(item);
                }
              });
            });
            this.storeid = this.theAllstores[0].id;
            this.getKCFX();
          }
        });
    },
    getAllCoach() {
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getCoachAll", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then((res) => {
          this.theAllCoach = res.data;
        });
    },
    yskcs() {
      const yskess = this.$echarts.init(document.getElementById("tab1-1"));
      yskess.setOption({
        label: {
            show: true,
            position: 'right',
            color: '#333'
        },
        title: {
          text: "已上课程数:"+(parseInt(this.PersontimesandClassnumber.numberofgrouplessons)+
          parseInt(this.PersontimesandClassnumber.numberofprivatelessons))
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["团课", "私教"]
        },
        grid: {
          left: "3%",
          right: "10%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data:  ["实到人次", "预约人次", "总节数"]
        },
        series: [
          {
            name: "团课",
            type: "bar",
            data: [
              this.PersontimesandClassnumber.tNumberofsignin,
              this.PersontimesandClassnumber.tNumberofreservations,
              this.PersontimesandClassnumber.numberofgrouplessons
              
              
            ]
          },
          {
            name: "私教",
            type: "bar",
            data: [
              this.PersontimesandClassnumber.pNumberofsignin,
               this.PersontimesandClassnumber.pNumberofreservations,
              this.PersontimesandClassnumber.numberofprivatelessons
             
              
            ]
          }
        ]
      });
    },
    ckxkzje() {
      const ckxkzjes = this.$echarts.init(document.getElementById("tab1-2"));
      var coursetitle = new Array();
      var courseamount = new Array();
      var courseamountarr=0;
      for (var i = 0; i < this.Amountoflessonssold.length; i++) {
        coursetitle[i] = this.Amountoflessonssold[i].coursetitle;
        courseamount[i] = this.Amountoflessonssold[i].courseamount;
        courseamountarr+=this.Amountoflessonssold[i].courseamount;
      }

      ckxkzjes.setOption({
        label: {
            show: true,
            position: 'right',
            color: '#333'
        },
        title: {
          text: "次卡销课总金额:"+courseamountarr.toFixed(2)
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "10%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: coursetitle
        },
        series: [
          {
            name: "消课总金额",
            type: "bar",
            data: courseamount
          }
        ]
      });
    },
    skrs() {
      const skrss = this.$echarts.init(document.getElementById("tab1-3"));
      skrss.setOption({
        label: {
            show: true,
            position: 'right',
            color: '#333'
        },
        title: {
          text: "上课人数:"+(this.skrsall.Classes7+
              this.skrsall.Classes6+
              this.skrsall.Classes5+
              this.skrsall.Classes4+
              this.skrsall.Classes3+
              this.skrsall.Classes2+
              this.skrsall.Classes1)
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },

        grid: {
          left: "3%",
          right: "10%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: ["7次以上", "6次", "5次", "4次", "3次", "2次", "1次"]
        },
        series: [
          {
            name: "上课人数",
            type: "bar",
            data: [
              this.skrsall.Classes7,
              this.skrsall.Classes6,
              this.skrsall.Classes5,
              this.skrsall.Classes4,
              this.skrsall.Classes3,
              this.skrsall.Classes2,
              this.skrsall.Classes1
            ]
          }
        ]
      });
    },
    yyrszs() {
      const yyrszss = this.$echarts.init(document.getElementById("tab2-1"));
      var date=[]
      var sum=[]
      for(var i=0;i<this.yyrsarr.length;i++){
        date.push(this.yyrsarr[i].to_date)
        sum.push(this.yyrsarr[i].sum)
      }
      yyrszss.setOption({
         label: {
            show: true,
            position: 'top',
            color: '#333'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          data: date
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: sum,
            type: "line"
          }
        ]
      });
    },
    getDay(day) {
      this.datearr = [];
      for (var i = 0; i < day; i++) {
        var today = new Date();
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * i;
        today.setTime(targetday_milliseconds);
        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = this.doHandleMonth(tMonth + 1);
        tDate = this.doHandleMonth(tDate);
        if (new Date(tYear + "/" + tMonth + "/" + tDate) <= new Date()) {
          this.datearr[i] = tYear + "-" + tMonth + "-" + tDate;
        }
      }
      this.getyysr();
    },
    getDay2() {
      this.datearr = [];
      var i = 0;
      var startTime = this.datevalue[0];
      var endTime = this.datevalue[1];
      while (endTime.getTime() - startTime.getTime() >= 0) {
        var year = startTime.getFullYear();
        var month =
          (startTime.getMonth() + 1).toString().length == 1
            ? "0" + (startTime.getMonth() + 1).toString()
            : (startTime.getMonth() + 1).toString();
        var day =
          startTime.getDate().toString().length == 1
            ? "0" + startTime.getDate()
            : startTime.getDate();
        if (new Date(year + "/" + month + "/" + day) <= new Date()) {
          this.datearr[i] = year + "-" + month + "-" + day;
        }
        startTime.setDate(startTime.getDate() + 1);
        i += 1;
      }
      var arr = [];
      var j = this.datearr.length;
      for (var i = 0; i < this.datearr.length; i++) {
        arr[i] = this.datearr[j - 1];
        j--;
      }
      this.datearr = arr;
      this.getyysr();
    },
    getyysr() {
      this.datevalue[0] = this.datearr[this.datearr.length - 1];
      this.datevalue[1] = this.datearr[0];
      var data = {};
      data.storeid = this.storeid;
      data.day1 = this.datevalue[0];
      data.day2 = this.datevalue[1];
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getNumberofreservations",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.yyrsarr = res.data;
          this.yyrszs();
        });
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    },
    daochu() {
      this.listQuery.limit = 99999;
      this.getKCFX();
      setTimeout(this.daochuexcel, 9000);
      this.listQuery.limit = 20;
      setTimeout(this.getKCFX, 9500);
    },
    daochuexcel() {
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "课程报表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
    }
  }
};
</script>

<style scoped>
.el-button {
  margin-top: 5px;
}
</style>
