<template>
  <div id="container" style="padding: 15px">
    <el-dialog
      title="修改课程"
      :show-close="false"
      :visible.sync="dialogFormVisible1"
      style="width: 1700px; margin: 0 auto"
    >
      <el-form :model="updateForm">
        <el-form-item label="课程类型" :label-width="formLabelWidth">
          <el-input
            :value="query.catetitle"
            style="width: 270px; float: left"
            disabled
          />
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input
            v-model="updateForm.strengthnumber"
            style="width: 270px; float: left"
          />
        </el-form-item>
        <el-form-item label="强度等级" :label-width="formLabelWidth">
          <el-radio-group
            v-model="updateForm.strengthgrade"
            style="float: left; margin-top: 10px"
          >
            <el-radio :label="1">1</el-radio>
            <el-radio :label="2">2</el-radio>
            <el-radio :label="3">3</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="组合添加" :label-width="formLabelWidth">
          <div>
            <el-button style="margin-bottom: 5px" @click="addParts1"
              >添加</el-button
            ><br />
            <el-select
              v-model="myaims"
              placeholder="课程目标"
              style="width: 300px; margin-bottom: 5px"
            >
              <el-option
                v-for="item in aims"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
            <div
              v-for="(item1, index1) in updateForm.partsjson"
              :key="index1"
              style="
                width: 90%;
                border: 1px solid #dddddd;
                padding: 5px;
                margin-bottom: 5px;
                position: relative;
              "
            >
              <el-select
                v-model="item1.partname"
                placeholder="组合名"
                style="width: 100px; margin-bottom: 5px"
              >
                <el-option
                  v-for="item in parts"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
              <el-input
                v-model="item1.time"
                placeholder="时长"
                style="width: 100px; padding-right: 5px"
              />
              <el-input
                v-model="item1.specification"
                placeholder="战术"
                style="width: 100px; padding-right: 5px"
              />

              <div
                v-for="(item11, index11) in updateForm.partsjson[index1]
                  .actions"
                :key="index11"
                style="width: 100%"
              >
                <el-select
                  v-model="item11.category"
                  placeholder="类别"
                  filterable
                  style="width: 100px; float: left; padding-right: 5px"
                  @change="categoryChange1(index1, index11)"
                >
                  <el-option
                    v-for="item in categorys"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
                <el-select
                  v-model="item11.strength"
                  placeholder="强度"
                  style="width: 100px; float: left; padding-right: 5px"
                  @change="strengthChange1(index1, index11)"
                >
                  <el-option
                    v-for="item in strengths"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
                <el-select
                  v-model="item11.name"
                  filterable
                  placeholder="动作"
                  style="width: 100px; float: left; padding-right: 5px"
                >
                  <el-option
                    v-for="item in courseItems"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
                <el-input
                  v-model="item11.number"
                  style="width: 100px; float: left; padding-right: 5px"
                />
                <!-- <el-input v-model="item11.unit" readonly="readonly" style="width:100px;float:left;"></el-input> -->

                <el-select
                  v-model="item11.unit"
                  style="width: 90px; float: left"
                  placeholder="单位"
                >
                  <el-option
                    v-for="item in units"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>

                <i
                  class="el-icon-remove"
                  style="font-size: 20px; margin-left: 10px"
                  @click="removeDz1(index1, index11)"
                />
                <i
                  class="el-icon-circle-plus"
                  style="font-size: 20px"
                  @click="addDz1(index1)"
                />
                <div style="height: 5px" />
              </div>
              <div style="clear: both" />
              <i
                class="el-icon-remove"
                style="
                  font-size: 20px;
                  position: absolute;
                  right: -30px;
                  top: 30px;
                "
                @click="removeParts1(index1)"
              />
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel()">取 消</el-button>
        <el-button type="primary" @click="toTrue1()"
          >确认修改</el-button
        >
        <el-button type="danger" @click="toDelete()">删 除</el-button>
      </div>
    </el-dialog>

    <p
      style="
        font-family: Helvetica Neue;
        font-size: 25px;
        padding-left: 10px;
        padding-bottom: 10px;
      "
    >
      {{ query.catetitle }}
    </p>
    <el-button
      type="success"
      style="position: absolute; right: 160px; top: 35px"
      @click="toOpen"
      >新增课程</el-button
    >
    <el-dialog
      title="新增课程"
      :visible.sync="dialogFormVisible"
      style="width: 1700px; margin: 0 auto"
    >
      <el-form :model="form">
        <el-form-item label="课程类型" :label-width="formLabelWidth">
          <el-input
            :value="query.catetitle"
            style="width: 270px; float: left"
            disabled
          />
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input
            v-model="form.strengthnumber"
            style="width: 270px; float: left"
          />
        </el-form-item>
        <el-form-item label="强度等级" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.strengthgrade" label="1">1</el-radio>
            <el-radio v-model="form.strengthgrade" label="2">2</el-radio>
            <el-radio v-model="form.strengthgrade" label="3">3</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="组合添加" :label-width="formLabelWidth">
          <div>
            <el-button style="margin-bottom: 5px" @click="addParts"
              >添加</el-button
            ><br />
            <el-select
              v-model="myaims"
              placeholder="课程目标"
              style="width: 300px; margin-bottom: 5px"
            >
              <el-option
                v-for="item in aims"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
            <div
              v-for="(item1, index1) in form.partsjson"
              :key="index1"
              style="
                width: 90%;
                border: 1px solid #dddddd;
                padding: 5px;
                margin-bottom: 5px;
                position: relative;
              "
            >
              <el-select
                v-model="item1.partname"
                placeholder="组合名"
                style="width: 100px; margin-bottom: 5px"
              >
                <el-option
                  v-for="item in parts"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
              <el-input
                v-model="item1.time"
                placeholder="时长"
                style="width: 100px; padding-right: 5px"
              />
              <el-input
                v-model="item1.specification"
                placeholder="战术"
                style="width: 100px; padding-right: 5px"
              />

              <div
                v-for="(item11, index11) in form.partsjson[index1].actions"
                :key="index11"
                style="width: 100%"
              >
                <el-select
                  v-model="item11.category"
                  placeholder="类别"
                  filterable
                  style="width: 100px; float: left; padding-right: 5px"
                  @change="categoryChange(index1, index11)"
                >
                  <el-option
                    v-for="item in categorys"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
                <el-select
                  v-model="item11.strength"
                  placeholder="强度"
                  style="width: 100px; float: left; padding-right: 5px"
                  @change="strengthChange(index1, index11)"
                >
                  <el-option
                    v-for="item in strengths"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
                <el-select
                  v-model="item11.name"
                  filterable
                  placeholder="动作"
                  style="width: 100px; float: left; padding-right: 5px"
                >
                  <el-option
                    v-for="item in courseItems"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
                <el-input
                  v-model="item11.number"
                  style="width: 100px; float: left; padding-right: 5px"
                />
                <el-select
                  v-model="item11.unit"
                  style="width: 90px; float: left"
                  placeholder="单位"
                >
                  <el-option
                    v-for="item in units"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
                <i
                  class="el-icon-remove"
                  style="font-size: 20px; margin-left: 10px"
                  @click="removeDz(index1, index11)"
                />
                <i
                  class="el-icon-circle-plus"
                  style="font-size: 20px"
                  @click="addDz(index1)"
                />
                <div style="height: 5px" />
              </div>
              <div style="clear: both" />
              <i
                class="el-icon-remove"
                style="
                  font-size: 20px;
                  position: absolute;
                  right: -30px;
                  top: 30px;
                "
                @click="removeParts(index1)"
              />
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toTrue()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- <el-button type="success" style="position:absolute;right:30px;top:35px">导出Excel</el-button> -->
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span> <span>强度：</span> <i class="el-icon-star-off" /> </span>
      </div>
      <div
        v-for="(item, index) in list1"
        :key="index"
        style="width: 20%; float: left"
      >
        <div style="width: 100%; height: 35px; float: left; cursor: pointer">
          <span class="qdname" @click="toOpen1(item)">{{
            item.strengthnumber
          }}</span>
        </div>
      </div>
      <pagination
        v-show="total1 > 0"
        :total="total1"
        :page.sync="listQuery1.page1"
        :limit.sync="listQuery1.limit1"
        style="float: right"
        @pagination="getStrenth1"
      />
    </el-card>

    <el-card class="box-card" style="margin-top: 40px">
      <div slot="header" class="clearfix">
        <span>
          <span>强度：</span> <i class="el-icon-star-off" />
          <i class="el-icon-star-off" />
        </span>
      </div>
      <div
        v-for="(item, index) in list2"
        :key="index"
        style="width: 20%; float: left"
      >
        <div style="width: 100%; height: 35px; float: left; cursor: pointer">
          <span class="qdname" @click="toOpen1(item)">{{
            item.strengthnumber
          }}</span>
        </div>
      </div>
      <pagination
        v-show="total2 > 0"
        :total="total2"
        :page.sync="listQuery2.page2"
        :limit.sync="listQuery2.limit2"
        style="float: right"
        @pagination="getStrenth2"
      />
    </el-card>

    <el-card class="box-card" style="margin-top: 40px">
      <div slot="header" class="clearfix">
        <span>
          <span>强度：</span> <i class="el-icon-star-off" />
          <i class="el-icon-star-off" /> <i class="el-icon-star-off" />
        </span>
      </div>
      <div
        v-for="(item, index) in list3"
        :key="index"
        style="width: 20%; float: left"
      >
        <div style="width: 100%; height: 35px; float: left; cursor: pointer">
          <span class="qdname" @click="toOpen1(item)">{{
            item.strengthnumber
          }}</span>
        </div>
      </div>
      <pagination
        v-show="total3 > 0"
        :total="total3"
        :page.sync="listQuery3.page3"
        :limit.sync="listQuery3.limit3"
        style="float: right"
        @pagination="getStrenth3"
      />
    </el-card>
  </div>
</template>

<script>
import { fetchList } from "@/api/hy";
import Pagination from "@/components/Pagination";
import { date } from "jszip/lib/defaults";
export default {
  components: { Pagination },
  data() {
    return {
      listLoading: false,
      courseItems: [],
      formLabelWidth: "150px",
      query: {},
      form: {
        trainingjsons: [{ tid: "" }],
        trainingjson: [],
        strengthgrade: "1",
        imgsjson: [],
        partsjson: [
          {
            partname: "",
            actions: [
              { name: "", unit: "", number: "", category: "", strength: "" },
            ],
          },
        ],
      },
      list: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      updateForm: {
        partsjson: [
          {
            partname: "",
            actions: [
              { name: "", unit: "", number: "", category: "", strength: "" },
            ],
          },
        ],
      },
      list1: [],
      total1: 0,
      listLoading: false,
      listLoading1: true,
      listQuery1: {
        page1: 1,
        limit1: 20,
      },
      myaims: "",
      list2: [],
      total2: 0,
      listLoading2: true,
      listQuery2: {
        page2: 1,
        limit2: 20,
      },
      list3: [],
      total3: 0,
      listLoading3: true,
      listQuery3: {
        page3: 1,
        limit3: 20,
      },
      categorys: [],
      strengths: [],
      parts: [],
      actions: [],
      aims: [],
      units: [],
    };
  },
  created() {
    this.query = this.$route.query.item;
    console.log(this.query);
    this.getStrenth1(this.listQuery1);
    this.getStrenth2(this.listQuery2);
    this.getStrenth3(this.listQuery3);
    // this.getIteams()
    this.getCategory();
    this.getStrength();
    this.getParts();
    this.getAims();
    this.getUnits();
  },
  methods: {
    getUnits() {
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getUnits", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.units = res.data;
        });
    },
    getCategory() {
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getCategory", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.categorys = res.data;
        });
    },
    getStrength() {
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getStrength", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.strengths = res.data;
        });
    },
    getAims() {
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getAims", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.aims = res.data;
        });
    },
    getParts() {
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getParts", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.parts = res.data;
        });
    },
    getStrenth1(data) {
      data.cid = this.query.mycid;
      data.page = this.listQuery1.page1 - 1;
      data.limit = this.listQuery1.limit1;
      data.strengthgrade = 1;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getStrenth",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.list1 = res.data;
          this.total1 = res.data[0].counts;
        });
    },
    getStrenth2(data) {
      data.cid = this.query.mycid;
      data.page = this.listQuery2.page2 - 1;
      data.limit = this.listQuery2.limit2;
      data.strengthgrade = 2;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getStrenth",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.list2 = res.data;
          this.total2 = res.data[0].counts;
        });
    },
    getStrenth3(data) {
      data.cid = this.query.mycid;
      data.page = this.listQuery3.page3 - 1;
      data.limit = this.listQuery3.limit3;
      data.strengthgrade = 3;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getStrenth",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.list3 = res.data;
          this.total3 = res.data[0].counts;
        });
    },
    insertItem() {
      var data = {};
      data.strengthgrade = this.form.strengthgrade;
      data.strengthnumber = this.form.strengthnumber;
      data.cid = this.query.mycid;
      data.partsjson = this.form.partsjson;
      data.partsjson[0].aims = this.myaims;
      data.partsjson = JSON.stringify(this.form.partsjson);
      this.myaims = "";
      data.sid = new Date().valueOf() + "" + Math.ceil(Math.random() * 10000);
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/setStrength",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
          this.form = {
            trainingjsons: [{ tid: "" }],
            trainingjson: [],
            strengthgrade: "1",
            imgsjson: [],
            partsjson: [
              {
                partname: "",
                actions: [
                  {
                    name: "",
                    unit: "",
                    number: "",
                    category: "",
                    strength: "",
                  },
                ],
              },
            ],
          };
          this.listQuery1.page1 = 1;
          this.listQuery2.page2 = 1;
          this.listQuery3.page3 = 1;
          this.getStrenth1(this.listQuery1);
          this.getStrenth2(this.listQuery2);
          this.getStrenth3(this.listQuery3);
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    toOpen() {
      this.myaims = "";
      this.dialogFormVisible = true;
    },
    toTrue() {
      this.dialogFormVisible = false;
      this.insertItem();
    },
    toOpen1(e) {
      this.myaims = "";
      this.updateForm = e;
      console.log(this.updateForm);
      if (typeof this.updateForm.imgsjson === "string") {
        this.updateForm.imgsjson = JSON.parse(this.updateForm.imgsjson);
      }
      if (typeof this.updateForm.trainingjson === "string") {
        this.updateForm.trainingjsons = JSON.parse(
          this.updateForm.trainingjson
        );
      }
      if (this.updateForm.partsjson) {
        if (typeof this.updateForm.partsjson === "string") {
          this.updateForm.partsjson = JSON.parse(this.updateForm.partsjson);
          this.myaims = this.updateForm.partsjson[0].aims;
        }
      } else {
        this.updateForm.partsjson = [
          {
            partname: "",
            aims: "",
            actions: [
              { name: "", unit: "", number: "", category: "", strength: "" },
            ],
          },
        ];
      }
      console.log(this.updateForm);
      this.dialogFormVisible1 = true;
    },
    toTrue1() {
      this.dialogFormVisible1 = false;
      this.updateMethods();
    },
    toDelete() {
      var data = []
      data.sid = this.updateForm.sid
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/DeleteStrength",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
          this.listQuery1.page1 = 1;
          this.listQuery2.page2 = 1;
          this.listQuery3.page3 = 1;
          this.getStrenth1(this.listQuery1);
          this.getStrenth2(this.listQuery2);
          this.getStrenth3(this.listQuery3);
          this.dialogFormVisible1 = false;
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    toCancel() {
      this.dialogFormVisible1 = false;
      this.updateForm = {};
    },
    removeDz(index1, index11) {
      this.form.partsjson[index1].actions.splice(index11, 1);
    },
    addDz(index1) {
      var obj = { name: "", unit: "", number: "", category: "", strength: "" };
      this.form.partsjson[index1].actions.push(obj);
    },
    addParts() {
      var obj = {
        partname: "",
        aims: "",
        time: "",
        specification: "",
        actions: [
          {
            name: "",
            unit: "",
            number: "",
            category: "",
            strength: "",
            dz: [],
          },
        ],
      };
      this.form.partsjson.push(obj);
    },
    removeParts(index) {
      this.form.partsjson.splice(index, 1);
    },
    categoryChange(index1, index11) {
      var data = {};
      data.category = this.form.partsjson[index1].actions[index11].category;
      data.strength = this.form.partsjson[index1].actions[index11].strength;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getactionlibrary",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.courseItems = res.data;
        });
    },
    strengthChange(index1, index11) {
      var data = {};
      data.category = this.form.partsjson[index1].actions[index11].category;
      data.strength = this.form.partsjson[index1].actions[index11].strength;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getactionlibrary",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.courseItems = res.data;
        });
    },
    categoryChange1(index1, index11) {
      var data = {};
      data.category = this.updateForm.partsjson[index1].actions[
        index11
      ].category;
      data.strength = this.updateForm.partsjson[index1].actions[
        index11
      ].strength;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getactionlibrary",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.courseItems = res.data;
        });
    },
    strengthChange1(index1, index11) {
      var data = {};
      data.category = this.updateForm.partsjson[index1].actions[
        index11
      ].category;
      data.strength = this.updateForm.partsjson[index1].actions[
        index11
      ].strength;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getactionlibrary",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.courseItems = res.data;
        });
    },
    removeDz1(index1, index11) {
      this.updateForm.partsjson[index1].actions.splice(index11, 1);
    },
    addDz1(index1) {
      var obj = { name: "", unit: "", number: "", category: "", strength: "" };
      this.updateForm.partsjson[index1].actions.push(obj);
    },
    addParts1() {
      var obj = { 
        partname: "",
        aims: "",
        actions: [
          {
            name: "",
            unit: "",
            number: "",
            category: "",
            strength: "",
            dz: [],
          },
        ],
      };
      this.updateForm.partsjson.push(obj);
    },
    removeParts1(index) {
      this.updateForm.partsjson.splice(index, 1);
    },
    updateMethods() {
      this.updateForm.imgsjson = JSON.stringify(this.updateForm.imgsjson);
      this.updateForm.partsjson[0].aims = this.myaims;
      this.updateForm.partsjson = JSON.stringify(this.updateForm.partsjson);
      this.myaims = "";
      console.log(this.updateForm)
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/UpdateStrength",
          this.$qs.stringify(this.updateForm),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.listQuery1.page1 = 1;
          this.listQuery2.page2 = 1;
          this.listQuery3.page3 = 1;
          this.getStrenth1(this.listQuery1);
          this.getStrenth2(this.listQuery2);
          this.getStrenth3(this.listQuery3);
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });     
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
  },
};
</script>

<style>
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-icon-star-off {
  width: 35px;
}
.qdname:hover {
  color: blue;
}
.el-dialog__headerbtn {
  display: none;
}
</style>
