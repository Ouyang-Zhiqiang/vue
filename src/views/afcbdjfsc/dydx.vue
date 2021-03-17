<template>
  <div id="container" style="padding: 15px">
      <el-button v-for="(item,index) in theAllstores" :key="index" v-model="storeid" @click="storeSearch(item.id)">{{ item.name }}</el-button>

    <el-tabs type="border-card" style="margin-top: 20px">
      <el-tab-pane label="店员兑现">
        <el-select v-model="selectForm.state" placeholder="全部状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="selectForm.username"
          placeholder="姓名"
          style="width: 180px; margin-top: 5px"
        />
        <el-input
          v-model="selectForm.userphone"
          placeholder="电话"
          style="width: 180px; margin-top: 5px"
        />
        <el-button type="success" style="margin-top: 5px" @click="toClickSearch"
          >搜索</el-button
        >
        <el-button type="success" style="margin-top: 5px">导出Excel</el-button>

        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="margin-top: 20px"
        >
          <el-table-column align="center" width="200" label="积分商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.imgurl" width="30" height="30" />
            </template>
          </el-table-column>

          <el-table-column width="200" align="center" label="已兑换商品">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="130" label="会员" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.username }}</span>
            </template>
          </el-table-column>

          <el-table-column width="150" label="手机号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userphone }}</span>
            </template>
          </el-table-column>

          <el-table-column width="130" label="场馆" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.storename }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="有效期" width="200">
            <template slot-scope="scope">
              <span
                >{{ scope.row.usedvaliditybegin }}~{{
                  scope.row.usedvalidityend
                }}</span
              >
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.state == 0">未使用</span>
              <span v-if="scope.row.state == 1">已使用</span>
              <span v-if="scope.row.state == 2">已失效</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.lastedon }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="操作" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.state == 0"
                ><el-button
                  type="text"
                  style="margin-top: 5px"
                  @click="clerkExchange(scope.row.orderid)"
                  >店员兑换</el-button
                ></span
              >
              <span v-if="scope.row.state == 1">已使用</span>
              <span v-if="scope.row.state == 2">已失效</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          style="float: right"
          @pagination="getAllSp"
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
      listLoading: false,
      theAllStores: [],
      storeid:'',
      list: [],
      clickSearch:false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
      },
      selectForm: {
        state: "",
        username: "",
        userphone: "",
      },

      options: [
        {
          value: "A",
          label: "全部状态",
        },
        {
          value: "0",
          label: "未使用",
        },
        {
          value: "1",
          label: "已使用",
        },
      ],
      value: "",
    };
  },
  mounted() {},
  created() {
    this.getAllSp(this.listQuery);
    this.getAllStore2();
  },
  methods: {
    getAllSp() {
      var data={}
        // data.state =this.selectForm.state;
        // data.username =this.selectForm.username;
        // data.userphone = this.selectForm.userphone;
      data.storeid=this.storeid
      console.log(data)
      this.listLoading = true;
      data.page=this.listQuery.page
      data.limit=this.listQuery.limit
      this.$axios.post(
          "http://localhost:8081/web/SpmGood/selectGoodsOrderList",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.list = res.data.list;
          this.total = res.data.total;
          this.listLoading = false;
        });
    },
    toClickSearch() {
      this.listQuery.page = 1;
      this.getAllSp(this.listQuery);
    },
    storeSearch(id){
            this.storeid=id
             this.getAllSp()
        },
    clerkExchange(orderid) {
      this.$confirm("是否继续兑换积分?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var obj = {};
        obj.orderId = orderid;
        obj.createdby = localStorage.getItem("userid");
        obj.createdname = localStorage.getItem("username");
        obj.ip = "127.01";
        this.$axios
          .post(
            "https://www.facebodyfitness.com/web/SpmGood/spmGoodChange",
            this.$qs.stringify(obj),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then((res) => {
            if (res.data == "操作成功！") {
              this.getAllSp(this.listQuery);
              this.$message({
                message: "恭喜你，操作成功",
                type: "success",
              });
            } else {
              this.$message.error("错了哦，这是一条错误消息");
            }
          });
      });
    },
      getAllStore2(){
            if(localStorage.getItem('username')=='系统管理员'){
                this.$axios.post('https://www.facebodyfitness.com/web/new/getStoreIdAll', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.theAllstores=res.data
                    var obj={}
                    obj.id=''
                    obj.name='全部运动馆'
                    this.theAllstores.unshift(obj)
                })
            }else if(localStorage.getItem('storenumber')==localStorage.getItem('storeid').split(',').length-1){
                this.$axios.post('https://www.facebodyfitness.com/web/new/getStoreIdAll', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.theAllstores=res.data
                    var obj={}
                    obj.id=''
                    obj.name='全部运动馆'
                    this.theAllstores.unshift(obj)
                })
            }else{
                this.storeid=localStorage.getItem('storeid').split(',')[0]
                this.$axios.post('https://www.facebodyfitness.com/web/new/getStoreIdAll', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    var userStore=localStorage.getItem('storeid').split(',')
                    var storeArr=res.data
                    var mystore=[]
                    userStore.forEach(item1=>{
                        storeArr.forEach(item => {
                            if(item1==item.id){
                                mystore.push(item)
                            }
                        })
                    })
                    this.theAllstores=mystore
                    this.storeid=this.theAllstores[0].id
                })
            }    
        }
  },
};
</script>

<style scoped>
</style>
