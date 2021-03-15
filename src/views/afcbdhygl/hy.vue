<template>
  <div id="container" style="padding: 15px">
    <el-button
      v-for="(item, index) in stores"
      :key="index"
      @click="toGetAllByStore(item.id)"
      >{{ item.name }}</el-button
    >
    <el-button v-show="isShow" id="storeshow" @click="toGetAllByStore(1)"
      >未设置场馆</el-button
    >
    <el-tabs type="border-card" style="margin-top: 20px">
      <el-tab-pane label="会员列表">
        <el-select
          v-model="hykvalue"
          placeholder="全部会员卡"
          style="margin-top: 5px"
        >
          <el-option
            v-for="item in hyklx"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select
          v-model="xsvalue"
          placeholder="全部销售"
          style="margin-top: 5px"
        >
          <el-option
            v-for="item in qbxs"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select v-model="ztvalue" placeholder="状态" style="margin-top: 5px">
          <el-option
            v-for="item in zt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- <el-select v-model="hylxvalue" placeholder="全部会员" style="margin-top:5px">
          <el-option
            v-for="item in hylx"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->

        <el-input
          v-model="sjh"
          placeholder="手机号"
          style="width: 180px; margin-top: 5px"
        />
        <el-input
          v-model="xm"
          placeholder="姓名"
          style="width: 180px; margin-top: 5px"
        />

        <el-button
          type="success"
          style="margin-top: 5px; margin-left: 30px"
          @click="toClickSearch"
          >查询</el-button
        >
        <el-button type="success" style="margin-top: 5px" @click="daochu"
          >导出Excel</el-button
        >
        <el-dialog
          title="会员编辑"
          :visible.sync="dialogFormVisible"
          style="width: 1200px; margin: 0 auto"
        >
          <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" style="width: 270px; float: left" />
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio
                v-model="form.sex"
                label="0"
                style="float: left; margin-top: 10px; margin-left: 5px"
                >男</el-radio
              >
              <el-radio
                v-model="form.sex"
                label="1"
                style="float: left; margin-top: 10px"
                >女</el-radio
              >
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form.tel" style="width: 270px; float: left" />
            </el-form-item>
            <el-form-item label="场馆" :label-width="formLabelWidth">
              <el-select
                v-model="form.storeId"
                style="width: 270px; float: left"
              >
                <el-option
                  v-for="item in stores"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="销售" :label-width="formLabelWidth">
              <el-select
                v-model="form.saleuserid"
                style="width: 270px; float: left"
              >
                <el-option
                  v-for="item in bjxs"
                  :key="item.userid"
                  :label="item.name"
                  :value="item.userid"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input
                v-model="form.remarks"
                style="width: 270px; float: left; height: 100px"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                :placeholder="form.remarks"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="toTrueClose()">确 定</el-button>
          </div>
        </el-dialog>

        <el-table
          id="out-table"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="margin-top: 20px"
        >
          <el-table-column align="center" label="姓名" width="150">
            <template slot-scope="scope">
              <span
                style="color: #337ab7; cursor: pointer"
                @click="toUrl(scope.row)"
                >{{ scope.row.name }}</span
              >
            </template>
          </el-table-column>

          <el-table-column align="center" width="130" label="手机号">
            <template slot-scope="scope">
              <span
                style="color: #337ab7; cursor: pointer"
                @click="toUrl(scope.row)"
                >{{ scope.row.tel }}</span
              >
            </template>
          </el-table-column>

          <el-table-column width="180" align="center" label="会员卡">
            <template slot-scope="scope">
              <span v-html="cdname(scope.row.cardsname)" />
            </template>
          </el-table-column>

          <el-table-column width="80" label="会员等级">
            <template slot-scope="scope">
              <span>Lv:{{ scope.row.memgrade }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" width="100" label="会员场馆">
            <template slot-scope="scope">
              <span>{{ scope.row.storename }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="时间" width="170">
            <template slot-scope="scope">
              <span>{{ scope.row.createdon }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="推荐人" width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.tjr }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="销售" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.xs }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '1'">正常</span>
              <span v-else-if="scope.row.status == '0'">不可用</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="290">
            <template slot-scope="scope">
              <!-- 会员编辑按钮 -->
              <el-button type="text" @click="toOpen(scope.row)">编辑</el-button>
              <el-button
                v-if="scope.row.status == 1"
                type="text"
                @click="
                  updateToDisEn(
                    scope.row.status,
                    scope.row.userid,
                    scope.$index
                  )
                "
                >禁用</el-button
              >
              <el-button
                v-else-if="scope.row.status == 0"
                type="text"
                @click="
                  updateToDisEn(
                    scope.row.status,
                    scope.row.userid,
                    scope.$index
                  )
                "
                >启用</el-button
              >

              <el-button type="text" @click="toOpen2(scope.row)"
                >改积分</el-button
              >
              <el-dialog
                title="修改积分"
                :visible.sync="dialogFormVisible2"
                style="width: 1200px; margin: 0 auto"
              >
                <el-form :model="form">
                  <el-form-item label="加" :label-width="formLabelWidth">
                    <el-input
                      v-model="form2.add"
                      style="width: 270px; float: left"
                    />
                  </el-form-item>
                  <el-form-item label="减" :label-width="formLabelWidth">
                    <el-input
                      v-model="form2.pre"
                      style="width: 270px; float: left"
                    />
                  </el-form-item>
                  <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input
                      v-model="form2.remarks"
                      style="width: 270px; float: left; height: 100px"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      :placeholder="form2.remarks"
                    />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible2 = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="toTrueClose2()"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>

              <el-button type="text" @click="toOpen3(scope.row)"
                >改等级</el-button
              >
              <el-dialog
                title="修改等级"
                :visible.sync="dialogFormVisible3"
                style="width: 1200px; margin: 0 auto"
              >
                <el-form :model="form3">
                  <el-form-item label="会员等级" :label-width="formLabelWidth">
                    <el-radio v-model="form3.memgrade" label="1         "
                      >Lv1</el-radio
                    >
                    <el-radio v-model="form3.memgrade" label="2         "
                      >Lv2</el-radio
                    >
                    <el-radio v-model="form3.memgrade" label="3         "
                      >Lv3</el-radio
                    >
                    <el-radio v-model="form3.memgrade" label="4         "
                      >Lv4</el-radio
                    >
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible3 = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="toTrueClose3()"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          style="float: right"
          @pagination="toGetAll()"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import data from "../pdf/content";
import { fetchList } from "@/api/hy";
import Pagination from "@/components/Pagination";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import $ from "jquery";

export default {
  components: { Pagination },
  data() {
    return {
      isShow: false,
      dialogImageUrl: "",
      formLabelWidth: "150px",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      stores: [],
      loginname: "",
      startStoreId: "",
      form: {
        name: "",
        sex: "",
        tel: "",
        saleuserid: "",
        storeId: "",
        storeName: "",
        xsname: "",
        remarks: "",
      },
      form2: {
        add: 0,
        pre: 0,
        points: 0,
        remarks: "",
      },
      form3: {
        memgrade: "",
        userid: "",
      },
      allStores: [],
      bjxs: [],
      hyklx: [
        {
          value: "",
          label: "全部会员卡",
        },
      ],
      qbxs: [
        {
          value: "",
          label: "全部销售",
        },
      ],
      zt: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "正常",
        },
        {
          value: "0",
          label: "已禁用",
        },
      ],
      //搜索条件
      hykvalue: "",
      xsvalue: "",
      ztvalue: "",
      sjh: "",
      xm: "",
      clickSearch: false,
      clickStore: false,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
      },
    };
  },
  created() {
    this.getAllxs();
    this.getAllxs2();
    this.getAllhyk();
    this.getAllStore();
    this.storeBlock();
    this.toGetAll();
  },
  methods: {
    storeBlock() {
      var loginname = localStorage.getItem("username");
      var roleid = localStorage.getItem("roleid");
      if (
        loginname != null &&
        (loginname == "系统管理员" ||
          roleid.search("2018053014055110006") != -1 ||
          roleid.search("2018053014114510000") != -1 ||
          roleid.search("2018053014052310002") != -1)
      ) {
        this.isShow = true;
      }
    },
    cdname(e) {
      var cdnames = "";
      e = e.substr(1); //删除第一个字符
      e = e.substr(0, e.length - 1); //删除最后一字符
      e = e.split(",");
      for (var i = 0; i < e.length; i++) {
        cdnames += e[i] + "<br/>";
      }
      return cdnames;
    },
    getAllStore() {
      var roleid = localStorage.getItem("roleid");
      if (
        localStorage.getItem("username") == "系统管理员" ||
        roleid.search("2018053014055110006") != -1 ||
        roleid.search("2018053014114510000") != -1 ||
        roleid.search("2018053014052310002") != -1
      ) {
        this.startStoreId = "";
        this.$axios
          .post("https://www.facebodyfitness.com/web/new/getStoreIdAll", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((res) => {
            this.stores = res.data;
            var obj = {};
            obj.id = "";
            obj.name = "全部运动馆";
            this.stores.unshift(obj);
          });
      } else if (
        localStorage.getItem("storenumber") ==
        localStorage.getItem("storeid").split(",").length - 1
      ) {
        this.startStoreId = "";
        this.$axios
          .post("https://www.facebodyfitness.com/web/new/getStoreIdAll", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((res) => {
            this.stores = res.data;
            var obj = {};
            obj.id = "";
            obj.name = "全部运动馆";
            this.stores.unshift(obj);
          });
      } else {
        this.startStoreId = localStorage.getItem("storeid").split(",")[0];
        this.$axios
          .post("https://www.facebodyfitness.com/web/new/getStoreIdAll", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((res) => {
            var userStore = localStorage.getItem("storeid").split(",");
            var storeArr = res.data;
            var mystore = [];
            userStore.forEach((item1) => {
              storeArr.forEach((item) => {
                if (item1 == item.id) {
                  mystore.push(item);
                }
              });
            });
            this.stores = mystore;
            this.startStoreId = this.stores[0].id;
          });
      }
    },
    //会员列表
    toGetAll() {
      var data = [];
      data.storeid = this.startStoreId;
      data.saleuserid = this.xsvalue;
      data.status = this.ztvalue;
      data.tel = this.sjh;
      data.name = this.xm;
      data.cardid = this.hykvalue;
      data.limit = this.listQuery.limit;
      data.page = this.listQuery.page - 1;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getUsers",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.list = res.data;
          data.limit = 999999;
          this.$axios
            .post(
              "https://www.facebodyfitness.com/web/new/getUsers",
              this.$qs.stringify(data),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((res) => {
              this.total = res.data.length;
              this.listLoading = false;
            });
        });
    },
    toGetAllByStore(e) {
      this.clickStore = true;
      this.clickSearch = false;
      this.startStoreId = e;
      this.listQuery.page = 1;
      this.toGetAll();
    },
    //获取全部销售
    getAllxs() {
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getXiaoshou",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          var noxs = { name: "", userid: 0 };
          this.bjxs = res.data;
          this.bjxs.unshift(noxs);
        });
    },
    getAllxs2() {
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getXiaoshou",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          res.data.forEach((item, index) => {
            var obj = {};
            obj.value = item.userid;
            obj.label = item.name;
            this.qbxs.push(obj);
          });
        });
    },
    //获取全部会员卡类型
    getAllhyk() {
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getAllhyk",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          res.data.forEach((item, index) => {
            var obj = {};
            obj.value = item.cardid;
            obj.label = item.cardname;
            this.hyklx.push(obj);
          });
        });
    },

    //用户基本信息修改
    updateUser() {
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/updateUser",
          this.$qs.stringify(this.form),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    //禁用启用
    updateStatus(e, id, index) {
      var data = {
        status: e,
        userid: id,
      };
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/DisableUser",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.list[index].status = e;
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    //积分修改接口
    updateJf(data) {
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/updatePoints",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    updateToDisEn(e, id, index) {
      var status = 0;
      if (e == 0) {
        status = 1;
        this.updateStatus(status, id, index);
      } else if (e == 1) {
        status = 0;
        this.updateStatus(status, id, index);
      }
    },
    toOpen3(e) {
      this.dialogFormVisible3 = true;
      this.form3.memgrade = e.memgrade;
      this.form3.userid = e.userid;
    },
    //修改会员等级
    toTrueClose3() {
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/updateMemgrade",
          this.$qs.stringify(this.form3),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
          this.toGetAll()
          this.dialogFormVisible3 = false;
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    //修改积分弹窗
    toOpen2(e) {
      console.log(e);
      this.dialogFormVisible2 = true;
      this.form2.add = 0;
      this.form2.pre = 0;
      this.form2.userid = e.userid;
      this.form2.currentpoints = e.points;
      this.form2.remarks = "";
      this.form2.actionstate = "";
    },
    //修改积分弹窗点击确定
    toTrueClose2() {
      if (this.form2.add > 0 && this.form2.pre == 0) {
        this.form2.points = this.form2.add;
        this.form2.actionstate = "+";
        this.form2.surpluspoints =
          parseInt(this.form2.add) + parseInt(this.form2.currentpoints);
        this.updateJf(this.form2);
        this.dialogFormVisible2 = false;
      } else if (this.form2.add == 0 && this.form2.pre > 0) {
        this.form2.points = this.form2.pre;
        this.form2.actionstate = "-";
        this.form2.surpluspoints =
          parseInt(this.form2.currentpoints) - parseInt(this.form2.points);
        this.updateJf(this.form2);
        this.dialogFormVisible2 = false;
      } else {
        this.$message.error("错了哦，这是一条错误消息");
      }
    },
    //点击打开用户信息编辑弹窗
    toOpen(e) {
      this.dialogFormVisible = true;
      this.form.name = e.name;
      this.form.sex = e.sex;
      this.form.tel = e.tel;
      this.form.storeid = e.storeid;
      this.form.storename = e.storename;
      this.form.saleuserid = e.saleuserid;
      this.form.xsname = e.xs;
      this.form.remarks = e.remarks;
      this.form.userid = e.userid;
    },
    //会员编辑弹窗点击确定
    toTrueClose() {
      this.dialogFormVisible = false;
      this.updateUser();
      this.toGetAll();
    },
    daochu() {
      this.listQuery.limit = 9999;
      this.listQuery.page = 1;
      this.toGetAll();
      setTimeout(this.daochuexcel, 9000);
      this.listQuery.limit = 20;
      this.listQuery.page = 1;
      setTimeout(this.toGetAll(), 9500);
    },
    daochuexcel() {
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "会员列表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
    },
    //点击搜索
    toClickSearch() {
      this.clickSearch = true;
      this.toGetAll();
    },
    toUrl(e) {
      console.log(e)
      this.$router.push({
        path: "/afcbdhygl/hyxq",
        query: {
          item: e,
        },
      });
    },
  },
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
  margin-top: 10px;
}
.el-col span {
  display: block;
  padding: 3px;
}
.bg-purple-dark {
  background: #e5e9f2;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 230px;
  text-align: center;
  color: #989fa8;
}
</style>
