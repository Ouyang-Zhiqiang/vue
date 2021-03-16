<template>
  <div id="container" style="padding:15px">
    <el-dialog title="活动编辑" :visible.sync="dialogFormVisible2" style="width:1200px;margin:0 auto">
      <el-form :model="updateForm">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="updateForm.name" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="可报人数" :label-width="formLabelWidth">
          <el-input v-model="updateForm.pnumber" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="报名费用" :label-width="formLabelWidth">
          <el-input v-model="updateForm.cost" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="所属运动馆" :label-width="formLabelWidth" style="float:left">
          <el-checkbox-group v-model="updateStoreid">
            <el-checkbox v-for="item in theAllStores" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="报名开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="updateForm.signstarttime"
            type="date"
            placeholder="开始时间"
            style="width:270px;"
            @change="topase3()"
          />
        </el-form-item>
        <el-form-item label="报名截止时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="updateForm.signendtime"
            type="date"
            placeholder="截止时间"
            style="width:270px;"
            @change="topase4()"
          />
        </el-form-item>
        <el-form-item label="活动开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="updateForm.starttime"
            type="date"
            placeholder="开始时间"
            style="width:270px;"
            @change="topase1()"
          />
        </el-form-item>
        <el-form-item label="活动截止时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="updateForm.endtime"
            type="date"
            placeholder="截止时间"
            style="width:270px;"
            @change="topase2()"
          />
        </el-form-item>
            
        <el-form-item label="详情" :label-width="formLabelWidth">
          <el-input
            v-model="updateForm.detail"
            style="width:270px;float:left;height:100px"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="toTrueClose2()">确 定</el-button>
      </div>
    </el-dialog>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="活动列表">
        <el-button type="success" @click="toOpen()">新增活动</el-button>
        <el-button type="success">导出Excel</el-button>
        <el-dialog title="新增活动" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
          <el-form :model="insertForm">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="insertForm.name" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="可报人数" :label-width="formLabelWidth">
              <el-input v-model="insertForm.pnumber" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="报名费用" :label-width="formLabelWidth">
              <el-input v-model="insertForm.cost" style="width:270px;float:left" />
            </el-form-item>
            
            <el-form-item label="所属运动馆" :label-width="formLabelWidth" style="float:left">
              <el-checkbox-group v-model="storeid">
                <el-checkbox v-for="item in theAllStores" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="报名开始时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="insertForm.signstarttime"
                type="date"
                placeholder="开始时间"
                style="width:270px"
              />
            </el-form-item>
            <el-form-item label="报名截止时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="insertForm.signendtime"
                type="date"
                placeholder="截止时间"
                style="width:270px"
              />
            </el-form-item>
            <el-form-item label="活动开始时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="insertForm.starttime"
                type="date"
                placeholder="开始时间"
                style="width:270px"
              />
            </el-form-item>
            <el-form-item label="活动截止时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="insertForm.endtime"
                type="date"
                placeholder="截止时间"
                style="width:270px"
              />
            </el-form-item>
            
            <el-form-item label="详情" :label-width="formLabelWidth">
              <el-input
                v-model="insertForm.detail"
                style="width:270px;float:left;height:100px"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="toTrueClose()">确 定</el-button>
          </div>
        </el-dialog>
                
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="活动名称" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="可报人数" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.pnumber }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="报名费用" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.cost }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="报名时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.signstarttime }}~{{ scope.row.signendtime }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="活动时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.starttime }}~{{ scope.row.endtime }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="详情" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.detail }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="地址" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.pageurl }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="290">
            <template slot-scope="scope">
              <el-button type="text" @click="tkUrl(scope.row)">查看</el-button>
              <el-button type="text" @click="toOpen2(scope.row)">编辑</el-button>
              <el-button type="text" @click="teDelete(scope.row,scope.$index)">删除</el-button>
            </template>
            
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAllComment" />

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { Input } from 'element-ui'
import data from '../pdf/content';
import { fetchList } from '@/api/hy';
import Pagination from '@/components/Pagination';
export default {
  components: { Pagination },
  data() {
    return {
      storeid:[],
      updateStoreid:[],
      dialogFormVisible:false,
      dialogFormVisible2:false,
      formLabelWidth:'150px',
      kcmcinput:'',
      list:[],
      total:0,
      listQuery: {
        page: 1,
        limit:20
      },
      clickSearch:false,
      listLoading:false,
      options1:[],
      selectForm:{
        coachid:''
      },
      updateForm:{
      },
      insertForm:{
        name:'',
        pnumber:'',
        cost:'',
        stores:[],
        starttime:'',
        endtime:''
      },
      categorys:[],
      strengths:[],
      units:[],
      theAllStores:[]
    }
  },
  mounted() {

   },
  created(){
    this.getAllComment(this.listQuery)
    this.getAllStore2()
  },
  methods: {
    getAllStore2(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.theAllStores=res.data.rows
      });
    },
    getAllComment(data){
      this.listLoading=true
      data.page=this.listQuery.page-1
      data.limit=this.listQuery.limit
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBYY5Y', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          if(res.data.rows.length==0){
              this.list=[]
              this.listLoading=false
          }else{
            this.list=res.data.rows
            this.total=res.data.rows[0].counts
            this.listLoading=false
          }
      })
    },
    clickSearchs(){
      this.listQuery.page=1
      this.getAllComment(this.listQuery)
    },
    tkUrl(e){
      this.$router.push({
          path:'/afcbdhdgl/bmlb',
          query: {
              item: e
          }
      })
  },
    updateToDisEn(){
      var status=true
      if(e==true){
        status=false
        this.updateStatus(status, id, index);
      }else if(e==false){
        status=true
        this.updateStatus(status, id, index);
      }
    },
    updateStatus(e, id, index){
      var data={
        isshow:e,
        commentid:id
      }
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1WEG', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.list[index].isshow=e
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    toOpen(){
      this.insertForm={}
      this.dialogFormVisible=true
    },
    toOpen2(item){
      this.dialogFormVisible2=true
      this.updateStoreid=[]
      this.updateForm=item
      if(this.updateForm.stores){
        if(typeof this.updateForm.stores === 'string'){
          // console.log(this.updateForm.stores)
          this.updateForm.stores=JSON.parse(this.updateForm.stores)
          this.updateForm.stores.forEach(item=>{
            this.updateStoreid.push(item.id)
          })
        }else{
          this.updateForm.stores.forEach(item=>{
            this.updateStoreid.push(item.id)
          })
        }
      }  
    },
    toTrueClose(){
      if(this.insertForm.name!=''&&this.insertForm.cost&&this.insertForm.detail!=''){
        this.insertForm.id=(new Date()).valueOf()+''
        this.insertForm.starttime=this.insertForm.starttime.toLocaleDateString().replace(/\//g, '-')
        this.insertForm.endtime=this.insertForm.endtime.toLocaleDateString().replace(/\//g, '-')
        this.insertForm.signstarttime=this.insertForm.signstarttime.toLocaleDateString().replace(/\//g, '-')
        this.insertForm.signendtime=this.insertForm.signendtime.toLocaleDateString().replace(/\//g, '-')
        this.insertForm.stores=[]
        this.storeid.forEach(item=>{
          this.theAllStores.forEach(item1=>{
            if(item==item1.id){
              this.insertForm.stores.push(item1)
            }
          })
        })
        this.insertForm.stores=JSON.stringify(this.insertForm.stores)
        var data = this.insertForm
        this.dialogFormVisible=false

        var demo={}
        demo.activityid=this.insertForm.id
        demo.name=this.insertForm.name
        demo.detail=this.insertForm.detail
        demo.fee=this.insertForm.cost
        demo.starttime=this.insertForm.starttime+'~'+this.insertForm.endtime
        demo.signtime=this.insertForm.signstarttime+'~'+this.insertForm.signendtime
        this.$axios.post('https://www.facebodyfitness.com/addPage', this.$qs.stringify(demo), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          // console.log(res.data)
          data.pageurl='http://www.facebodyfitness.com/'+res.data+'.html'
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBYYBN', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
            this.listQuery.page=1
            this.getAllComment(this.listQuery)
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
          });
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
        });
      }else{
        alert('检测有参数未填')
      }
    },
    //编辑
    toTrueClose2(){
      this.updateForm.stores=[]
      this.updateStoreid.forEach(item=>{
        this.theAllStores.forEach(item1=>{
          if(item==item1.id){
            this.updateForm.stores.push(item1)
          }
        })
      })
      this.updateForm.stores=JSON.stringify(this.updateForm.stores)
      var data = this.updateForm
      this.dialogFormVisible2=false
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBYYCE', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
        this.listQuery.page=1
        this.getAllComment(this.listQuery)
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    teDelete(data, index){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEBYYCM', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        })
        this.listQuery.page=1
        this.getAllComment(this.listQuery)
      }).catch(error=>{
        this.$message.error('错了哦，这是一条错误消息');
      });
    },
    topase1(){
        this.updateForm.starttime=this.updateForm.starttime.toLocaleDateString().replace(/\//g, '-')
    },
    topase2(){
        this.updateForm.endtime=this.updateForm.endtime.toLocaleDateString().replace(/\//g, '-')
    },
    topase3(){
        this.updateForm.signstarttime=this.updateForm.signstarttime.toLocaleDateString().replace(/\//g, '-')
    },
    topase4(){
        this.updateForm.signendtime=this.updateForm.signendtime.toLocaleDateString().replace(/\//g, '-')
    }
  }
}

</script>

<style scoped>
.el-button{
    margin-top: 5px;
}

</style>
