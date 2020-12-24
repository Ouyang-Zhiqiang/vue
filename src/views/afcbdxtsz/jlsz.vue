<template>
  <div id="container" style="padding: 15px">
    <el-tabs type="border-card">
      <el-tab-pane label="教练信息列表">
        <el-button type="success" @click="daochu">导出Excel</el-button>
        <el-button type="success" @click="xinzeng">新增教练</el-button>

        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="margin-top: 20px"
          id="out-table"
        >
          <el-table-column prop="name" align="center" label="教练" width="200">
          </el-table-column>
          <el-table-column prop="tel" align="center" width="250" label="手机">
          </el-table-column>
          <el-table-column
            prop="imgcounts"
            align="center"
            width="150"
            label="照片数量"
          >
          </el-table-column>
          <el-table-column width="450" prop="intrtext" align="center" label="简介">
          </el-table-column>
          <el-table-column width="300" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="bianji(scope.row)">编辑</el-button>
              <el-popconfirm
                title="确定要删除吗？"
                @onConfirm="shanchu(scope.row)"
              >
                <el-button type="text" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          style="float: right"
          @pagination="getAllCoach"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="新增/编辑教练信息"
      :visible.sync="dialogVisible"
      width="25%"
    >
      <el-form ref="form" label-width="100px">
        <el-form-item label="教练姓名">
          <span v-if="this.state == 1">
            <el-input
              v-model="name"
              :disabled="true"
              style="width: 290px"
            ></el-input>
          </span>
          <span v-if="this.state == 2">
            <el-select
              v-model="userid"
              placeholder="请选择"
              style="width: 290px"
            >
              <el-option
                v-for="item in this.userlist"
                :key="item.userid"
                :label="item.name"
                :value="item.userid"
              >
              </el-option>
            </el-select>
          </span>
        </el-form-item>
        <el-form-item label="教练简介">
          <el-input
            type="textarea"
            v-model="intrtext"
            style="width: 290px"
          ></el-input>
        </el-form-item>
        <el-form-item label="教练头像">
          <el-upload
            action="https://www.facebodyfitness.com/uploadimg"
            name="upload_file"
            list-type="picture-card"
            :on-success="handleSuccess"
            style="float: left"
            ref="upload"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Input } from "element-ui";
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
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
      },
      listLoading: false,
      dialogVisible: false,
      name: "",
      intrtext: "",
      resid: "",
      userid: "",
      state: "",
      userlist: [],
      imgcounts: 0,
    };
  },
  mounted() {},
  created() {
    this.getAllCoach(this.listQuery);
  },
  methods: {
    getAllCoach() {
      this.listLoading = true;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24BACFMEVJF6",
          this.$qs.stringify(this.listQuery),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.list = res.data.rows;
          this.total = res.data.rows[0].counts;
          this.listLoading = false;
        });
    },
    bianji(e) {
      this.state = 1;
      this.dialogVisible = true;
      this.name = e.name + " " + e.tel;
      this.userid = e.userid;
      this.imgcounts = e.imgcounts;
    },
    handleSuccess(file) {
      var data = {};
      data.resid =
        new Date().valueOf() + "" + Math.ceil(Math.random() * 10000) + "";
      data.resurl = file.split(",")[0];
      data.createdby = localStorage.getItem("userid");
      data.createdname = localStorage.getItem("username");
      data.lastedby = localStorage.getItem("userid");
      data.lastedname = localStorage.getItem("username");
      data.createdip = "::1";
      data.lastedip = "::1";
      this.insertImg(data);
    },
    insertImg(e) {
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2DFK",
          this.$qs.stringify(e),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.resid = e.resid;
          this.$message.success("图片上传成功");
        })
        .catch((error) => {
          this.$message.error("图片上传失败");
        });
    },
    queding() {
      var data = {};
      data.userid = this.userid;
      data.intrtext = this.intrtext;
      data.resid = this.resid;
      data.createdby = localStorage.getItem("userid");
      data.createdname = localStorage.getItem("username");
      if (this.state == 2 && data.userid == "") {
        this.$message.error("请选择教练信息");
        return;
      }
      if (
        (this.state == 2 && data.resid == "") ||
        (this.state == 1 && this.imgcounts <= 0)
      ) {
        this.$message.error("请上传头像信息");
        return;
      }
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24BACFMEVJHO",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          if (data.resid != "" && data.resid != null) {
            this.$axios
              .post(
                "https://www.facebodyfitness.com/hi/main?hi=24CQRLLOXADS",
                this.$qs.stringify(data),
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then((res) => {});
          }
          this.$message.success("操作成功");
          this.getAllCoach();
          if (this.$refs.upload !== undefined) {
            this.$refs.upload.clearFiles();
          }
          this.dialogVisible = false;
        })
        .catch((error) => {
          this.$message.error("操作失败");
        });
    },
    xinzeng() {
      this.userid = "";
      this.state = 2;
      this.$axios
        .post("https://www.facebodyfitness.com/hi/main?hi=24CQRLLOXCCA", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.userlist = res.data.rows;
        });
      this.dialogVisible = true;
    },
    shanchu(e) {
      var data = {};
      data.userid = e.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24BACFMEVJI2",
          this.$qs.stringify(data),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((res) => {
          this.$message.success("操作成功");
          this.getAllCoach();
        })
        .catch((error) => {
          this.$message.error("操作失败");
        });
    },
    daochu() {
      this.listQuery.limit = 999;
      this.getAllCoach();
      setTimeout(this.daochuexcel, 1000);
      this.listQuery.limit = 20;
      setTimeout(this.getAllCoach, 1300);
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
          "教练列表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
    },
  },
};
</script>

<style scoped>
</style>
