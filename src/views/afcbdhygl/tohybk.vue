<template>
  <div id="container" style="padding: 15px; padding-top: 25px">
    <div style="width: 650px; margin-left: 25%; margin-top: 40px">
      <el-form label-width="100px">
        <el-form-item label="姓名">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            style="width: 270px"
            @select="handleSelect"
          />
        </el-form-item>
        <el-form-item label="会员卡" :label-width="formLabelWidth">
          <el-select
            v-model="xuka.cardid"
            style="width: 270px; float: left"
            @change="changeCard"
          >
            <el-option
              v-for="item in cardlist"
              :key="item.cardid"
              :label="item.cardname"
              :value="item.cardid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="梯度">
          <template>
            <div>
              <el-radio
                v-for="(item, index) in tidu"
                :key="index"
                v-model="selectedCardno"
                :label="item.tid"
                style="display: block; margin-top: 10px"
              >
                <span>{{ item.times }}次</span>&nbsp;&nbsp;&nbsp;
                <span>有效期{{ item.periodvalidity }}天</span>&nbsp;&nbsp;&nbsp;
                <span>{{ item.fee }}元</span>&nbsp;&nbsp;&nbsp;
              </el-radio>
              <el-radio
                v-if="this.showNow"
                v-model="selectedCardno"
                style="display: block; margin-top: 10px"
                label="A"
              >
                <span>自定义次数</span>&nbsp;&nbsp;&nbsp;
                <el-input v-model="xuka.totaltimes" style="width: 150px" />
              </el-radio>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="实付金额" :label-width="formLabelWidth">
          <el-input v-model="xuka.totalfee" style="width: 270px" />
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth">
          <el-select v-model="xuka.payments" style="width: 270px; float: left">
            <el-option
              v-for="item in payoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开卡场馆" :label-width="formLabelWidth">
          <el-select v-model="xuka.storeid" style="width: 270px; float: left">
            <el-option
              v-for="item in theAllStores"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="销售人员" :label-width="formLabelWidth">
          <el-select v-model="xuka.saleid" style="width: 270px; float: left">
            <el-option
              v-for="item in bjxs"
              :key="item.userid"
              :label="item.name"
              :value="item.userid"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="是否开卡">
          <template>
            <div>
              <el-radio
                v-model="xuka.isopen"
                value="0"
                style="display: block; margin-top: 10px"
                label="0"
              >
                <span>暂不开卡</span>&nbsp;&nbsp;&nbsp;
              </el-radio>

              <el-radio
                v-model="xuka.isopen"
                value="1"
                label="1"
                style="display: block; margin-top: 10px"
              >
                <span>开卡日期</span>&nbsp;&nbsp;&nbsp;<br />
                <el-date-picker
                  v-model="xuka.mydate"
                  type="daterange"
                  range-separator=""
                  start-placeholder="卡开始日期"
                  end-placeholder="卡结束日期"
                  style="display: block; margin-top: 7px; width: 270px"
                />
              </el-radio>
            </div>
          </template>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="xuka.remarks" style="width: 270px" />
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
      formLabelWidth: "100px",
      restaurants: [],
      state: "",
      opencode: "",
      timeout: null,
      results: [],
      showNow: false,
      user: {},
      form: {
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
      },
      selectedCardno: "",
      cardlist: [],
      form: { traineenum: 1 },
      payoption: [
        { label: "刷卡", value: "3" },
        { label: "扫码支付", value: "1" },
        { label: "转账", value: "2" },
        { label: "其他", value: "4" },
      ],
      theAllStores: [],
      bjxs: [],
      xuka: {
        isopen: "0",
      },
      tidu: [],
    };
  },
  created() {
    this.getAllxs();
    this.getAllStore2();
    this.getAllCards();
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    getAllCards() {
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getAllhyk", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.cardlist = res.data;
        });
    },
    getAllxs() {
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getXiaoshou", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.bjxs = res.data;
        });
    },
    getAllStore2() {
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getStoreIdAll", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.theAllStores = res.data;
        });
    },
    changeCard() {
      var data = {};
      data.cardid = this.xuka.cardid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getCrdMembershipCardCategoryTypeCard",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.tidu = res.data
          if (this.tidu[0].cardtype == "S") {
            this.showNow = true;
          } else {
            this.showNow = false;
          }
        });
    },
    onSubmit() {
      if (this.selectedCardno == "A") {
        this.xuka.times = this.tidu[0].times;
        this.xuka.originalfee = this.tidu[0].fee;
        this.xuka.periodvalidity = this.tidu[0].periodvalidity;
        this.xuka.typeid = this.tidu[0].tid;
        this.xuka.timefee =
          Math.floor((this.xuka.totalfee / this.xuka.totaltimes) * 100) / 100;
      } else {
        this.tidu.forEach((item) => {
          if (item.tid == this.selectedCardno) {
            this.xuka.totaltimes = item.times;
            this.xuka.times = item.times;
            this.xuka.originalfee = item.fee;
            this.xuka.periodvalidity = item.periodvalidity;
            this.xuka.typeid = item.tid;
            this.xuka.timefee =
              Math.floor((this.xuka.totalfee / this.xuka.totaltimes) * 100) / 100;
          }
        });
      }
      this.xuka.userid = this.user.name;
      this.cardlist.forEach((item) => {
        if (item.cardid == this.xuka.cardid) {
          this.xuka.cardname = item.cardname;
          this.xuka.cardtype = item.cardtype;
        }
      });
      this.bjxs.forEach((item) => {
        if (this.xuka.saleid == item.userid) {
          this.xuka.salename = item.name;
        }
      });
      this.theAllStores.forEach((item) => {
        if (item.id == this.xuka.storeid) {
          this.xuka.storename = item.name;
        }
      });
      if (
        this.xuka.isopen != "" &&
        this.xuka.isopen != null &&
        this.xuka.isopen != undefined
      ) {
        if (this.xuka.isopen == "0") {
          this.xuka.cardbegin = null;
          this.xuka.cardend = null;
          this.xuka.isopen = false
        } else if (this.xuka.isopen == "1") {
          this.xuka.day1 = this.xuka.mydate[0]
            .toLocaleDateString()
            .replace(/\//g, "-");
          this.xuka.day2 = this.xuka.mydate[1]
            .toLocaleDateString()
            .replace(/\//g, "-");
            this.xuka.isopen = true
        }
      } else {
        this.$message.error("选择是否开卡！！");
        return false;
      }

      this.xuka.cardno = this.guid();
      if (
        this.xuka.typeid == null ||
        this.xuka.typeid == "" ||
        this.xuka.typeid == undefined
      ) {
        this.$message.error("请选择梯度！！！！");
      } else {
        this.insertCard();
      }
    },
    insertCard() {
      var data = {};
      data.createdname = localStorage.getItem("username");
      data.createdby = localStorage.getItem("userid");
      data.remarks = this.xuka.cardname;
      data.userid = this.user.name;
      data.points = Math.round(this.xuka.totalfee);
      console.log(this.xuka)
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/bangka",
          this.$qs.stringify(this.xuka),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
          this.$axios
            .post(
              "https://www.facebodyfitness.com/web/CCourse/goukasongjifen",
              this.$qs.stringify(data),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((res) => {
              this.$message({
                message: "此次绑卡赠送积分" + data.points,
                type: "success",
              });
            });
          var s = {};
          s.cardno = this.xuka.cardno;
          s.userid = this.user.name;
          this.$axios
            .post(
              "https://www.facebodyfitness.com/web/ordercourse/BuyCardSendToDT",
              this.$qs.stringify(s),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((res) => {
              this.$message({
                message: "发送成功",
                type: "success",
              });
            });

          this.$router.push({
            path: "/afcbdhygl/hybk",
            query: {},
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0;
          var v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    querySearchAsync(queryString, cb) {
      var data = {};
      data.name = queryString;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/setUser",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          var results = res.data;
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
      console.log(item)
      this.user=item
    },
    loadAll() {
      return [];
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
