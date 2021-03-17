<template>
  <div id="container" style="padding: 15px">
    <el-tabs type="border-card">
      <el-tab-pane label="会员绑卡">
        <el-select
          v-model="selectForm.state"
          placeholder="会员卡状态"
          style="margin-top: 5px"
        >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select
          v-model="selectForm.isopen"
          placeholder="开卡状态"
          style="margin-top: 5px"
        >
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="selectForm.cardname"
          placeholder="会员卡名称"
          style="width: 180px; margin-top: 5px"
        />

        <el-input
          v-model="selectForm.tel"
          placeholder="手机号"
          style="width: 180px; margin-top: 5px"
        />

        <el-input
          v-model="selectForm.name"
          placeholder="姓名"
          style="width: 180px; margin-top: 5px"
        />

        <el-button
          type="success"
          style="margin-top: 5px"
          @click="getAllBindCards"
          >查询</el-button
        >
        <el-button type="success" style="margin-top: 5px">导出Excel</el-button>
        <el-button type="success" style="margin-top: 5px" @click="toUrl"
          >添加会员绑卡</el-button
        >

        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="margin-top: 20px"
        >
          <el-table-column align="center" label="卡名" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.cardname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="200" label="会员">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="150" align="center" label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.tel }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120" label="次数" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.buytimes }}</span>
            </template>
          </el-table-column>
          <el-table-column width="120" label="金额" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sellingfee }}</span>
            </template>
          </el-table-column>
          <el-table-column width="150" label="操作人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createdname }}</span>
            </template>
          </el-table-column>
          <el-table-column width="200" label="操作时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createdon }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          style="float: right"
          @pagination="getAllBindCards"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Input } from "element-ui";
import data from "../pdf/content";
import { fetchList } from "@/api/hy";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
      },
      listLoading: true,
      list: [],
      total: 0,
      options1: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "0",
          label: "停卡",
        },
        {
          value: "1",
          label: "正常",
        },
      ],
      options3: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "已开卡",
        },
        {
          value: "0",
          label: "未开卡",
        },
      ],
      selectForm: {
        state: "",
        isopen: "",
        cardname: "",
        name: "",
        tel: "",
      },
    };
  },
  created() {
    this.getAllBindCards();
  },
  methods: {
    getAllBindCards() {
      this.listLoading = true;
      var data = {};
      data = this.selectForm;
      data.page = this.listQuery.page;
      data.limit = this.listQuery.limit;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/bangkajilu",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.list = res.data.list;
          this.total = res.data.total;
          this.listLoading = false;
        });
    },
    toUrl() {
      this.$router.push({
        path: "/afcbdhygl/tohybk",
      });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
 