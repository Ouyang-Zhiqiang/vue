<template>
  <div id="container" style="padding:20px">
      
    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="城市合伙申请列表">

        <el-table :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="姓名" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="250" label="电话">
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="城市" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.city }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="公司" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.company }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="申请说明" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.sqsm }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="时间" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.dateline }}</span>
            </template>
          </el-table-column>

        </el-table>

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { Input } from 'element-ui'
import data from '../pdf/content';


export default {
  data() {
    return {
        list:[]
    }
  },
  mounted() {

   },
  created(){
    this.getAllList()
  },
  methods: {
    getAllList(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24AZHZUKF3JD', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.list=res.data.rows
        }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
        });
    }
  }
}

</script>

<style scoped>
.el-button{
    margin-right:10px;
}
.el-dialog{
    width: 85%;
}


</style>
