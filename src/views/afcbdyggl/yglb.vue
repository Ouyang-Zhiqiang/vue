<template>
  <div id="container" style="padding:15px">
    <el-tabs type="border-card">
      <el-tab-pane label="员工列表">
        <el-select v-model="selectForm.storeid" placeholder="运动馆" style="margin-top:5px">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select v-model="selectForm.roleid" placeholder="角色" style="margin-top:5px">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select v-model="selectForm.status" placeholder="状态" style="margin-top:5px">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-input v-model="selectForm.tel" placeholder="手机号" style="width:180px;margin-top:5px" />
        <el-input v-model="selectForm.name" placeholder="姓名" style="width:180px;margin-top:5px" />

        <el-button type="success" style="margin-top:5px;" @click="toClickSearch">查询</el-button>
        <el-button type="success" style="margin-top:5px;">导出Excel</el-button>
        <el-button type="success" style="margin-top:5px;" @click="toOpen2">新增员工</el-button>
        <el-dialog title="新增员工" :visible.sync="dialogFormVisible2" style="width:1500px;margin:0 auto">
          <el-form :model="insertForm">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                style="width:300px;"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item v-show="showNow" label="基本信息" style="margin-left: 12%;">
              <img :src="user.imgurl" style="width:70px;height:70px;border-radius:50%;float:left">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ user.name }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span v-show="user.name==0">男</span><span v-show="user.name==1">女</span><br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ user.tel }}</span>
            </el-form-item>
            <el-form-item label="所属运动馆" :label-width="formLabelWidth" style="float:left">
              <el-checkbox-group v-model="insertForm.storeid">
                <el-checkbox v-for="item in storesArr" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="身份" :label-width="formLabelWidth">
              <el-checkbox-group v-model="insertForm.roleid" style="float:left">
                <el-checkbox v-for="item in rolesArr" :key="item.roleid" :label="item.roleid">{{ item.rolename }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="登录手机员工端" :label-width="formLabelWidth">
              <el-radio-group v-model="insertForm.isapp" :min="1" style="float:left;margin-top:10px;">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="toTrueClose2()">确 定</el-button>
          </div>
        </el-dialog>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="姓名" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="150" label="性别">
            <template slot-scope="scope">
              <span v-if="scope.row.sex == '0'">男</span>
              <span v-else-if="scope.row.sex == '1'">女</span>
            </template>
          </el-table-column>

          <el-table-column width="150" align="center" label="电话">
            <template slot-scope="scope">
              <span>{{ scope.row.tel }}</span>
            </template>
          </el-table-column>

          <el-table-column width="200" label="角色" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.rolename }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="所属运动馆" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.storename }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '1'">正常</span>
              <span v-else-if="scope.row.status == '0'">禁用</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="290">
            <template slot-scope="scope">
              <el-button type="text" @click="toOpen(scope.row)">编辑</el-button>
              <el-dialog title="员工编辑" :visible.sync="dialogFormVisible" style="width:1500px;margin:0 auto">
                <el-form :model="updateForm">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.name" style="width:270px;float:left" disabled="disabled" />
                  </el-form-item>
                  <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.tel" style="width:270px;float:left" disabled="disabled" />
                  </el-form-item>
                  <el-form-item label="所属运动馆" :label-width="formLabelWidth" style="float:left">
                    <el-checkbox-group v-model="updateForm.storeid" :min="1">
                      <el-checkbox v-for="item in storesArr" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="身份" :label-width="formLabelWidth">
                    <el-checkbox-group v-model="updateForm.roleid" style="float:left" :min="1">
                      <el-checkbox v-for="item in rolesArr" :key="item.roleid" :label="item.roleid">{{ item.rolename }}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="登录手机员工端" :label-width="formLabelWidth">
                    <el-radio-group v-model="updateForm.isapp" :min="1" style="float:left;margin-top:10px;">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="toTrueClose()">确 定</el-button>
                </div>
              </el-dialog>
              <el-button type="text" @click="toOpenDisabled(scope.row)">禁用</el-button>
              <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="25%"
                center
              >
                <span>是否确定禁用该员工</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="toDisabled()">确 定</el-button>
                </span>
              </el-dialog>
              <el-button type="text">教练业绩</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAllStaffs" />
                
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
    data(){
        return{ 
            list:[],
            total:0,
            listQuery: {
              page: 1,
              limit:20
            },
            clickSearch:false,
            listLoading:false,
            showNow:false,
            selectForm:{
              storeid:'',
              roleid:'',
              status:'',
              tel:'',
              name:''
            },
            phone:'',
            name:'',
            options1: [
              { value: 'A',
                label: '全部运动馆'
              }
            ],
            ydgvalue:'',
            options2: [{
                value: 'B',
                label: '全部角色'
                }],
            jsvalue:'',
            options3: [{
                value: 'C',
                label: '全部'
                }, {
                value: '1',
                label: '正常'
                }, {
                value: '0',
                label: '已禁用'
            }],
            formLabelWidth:'150px',
            dialogFormVisible:false,
            centerDialogVisible:false,
            dialogFormVisible2:false,
            state:'',
            rolesArr:[],
            storesArr:[],
            updateForm:{
              userid:'',
              name:'',
              tel:'',
              roleid:'',
              storeid:'',
              isapp:''
            },
            exm:{},
            user:{},
            insertForm:{
              username:'',
              userid:'',
              roleid:[],
              storeid:[],
              isapp:true,
              lastedby:'系统管理员',
              lastedname:'系统管理员',
              createdby:'系统管理员',
              createdname:'系统管理员'
            }
        }
    },
    mounted() {
      
    },
    created(){
      this.getAllStore()
      this.getAllroles()
      // setTimeout("getAllStaffs(this.listQuery)",1000)
      this.getAllStaffs(this.listQuery)
    },
    methods:{
      getAllStaffs(data){
        if(this.selectForm.storeid==''){
          data.storeid='A'
        }else{
          data.storeid=this.selectForm.storeid
        }
        if(this.selectForm.roleid==''){
          data.roleid='B'
        }else{
          data.roleid=this.selectForm.roleid
        }
        if(this.selectForm.status==''){
          data.status='C'
        }else{
          data.status=this.selectForm.status
        }
        if(this.selectForm.tel==''){
          data.tel='D'
        }else{
          data.tel=this.selectForm.tel
        }
        if(this.selectForm.name==''){ 
          data.name='E'
        }else{
          data.name=this.selectForm.name
        }
        if(this.clickSearch){
          this.listLoading=true
          data.page=this.listQuery.page-1
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVI5T', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.list=res.data.rows
              this.total=res.data.rows[0].counts
              if(res.data.rows[0].counts==0){
                this.listLoading==false
                alert('暂无查询数据')
              }
              this.list.forEach((item)=>{
                item.storename=''
                item.rolename=''
                var storeArr=item.storeid.split(",")
                console.log(storeArr)
                var roleArr=item.roleid.split(",")
                storeArr.forEach((item1)=>{
                  this.options1.forEach((item11)=>{
                    if(item1==item11.value){
                      item.storename+=item11.label+';'
                    }
                  })
                })
                roleArr.forEach((item2)=>{
                  this.options2.forEach((item22)=>{
                    if(item2==item22.value){
                      item.rolename+=item22.label+';'
                    }
                  })
                })
              })
              this.listLoading=false
          });
        }else{
          this.listLoading=true
          data.page=this.listQuery.page-1
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVI5T', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.list=res.data.rows
              this.total=res.data.rows[0].counts
              this.list.forEach((item)=>{
                item.storename=''
                item.rolename=''
                var storeArr=item.storeid.split(",")
                // console.log(storeArr)
                var roleArr=item.roleid.split(",")
                storeArr.forEach((item1)=>{
                  this.options1.forEach((item11)=>{
                    if(item1==item11.value){
                      item.storename+=item11.label+';'
                    }
                  })
                })
                roleArr.forEach((item2)=>{
                  this.options2.forEach((item22)=>{
                    if(item2==item22.value){
                      item.rolename+=item22.label+';'
                    }
                  })
                })
              })
              this.listLoading=false
          });
        }
      },
      aaa(){
        console.log('dd')
        console.log(this.updateForm.isapp)
      },
      toClickSearch(){
        this.clickSearch=true
        this.listQuery.page=1
        this.getAllStaffs(this.listQuery)
      },
      getAllStore(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.storesArr=res.data.rows
          var arrs=res.data.rows
          arrs.forEach((item) => {
            var obj = {}
            obj.value=item.id
            obj.label=item.name
            this.options1.push(obj)
          });
        });
      },
      getAllroles(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1VAV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.rolesArr=res.data.rows
          var arrs=res.data.rows
          arrs.forEach((item) => {
            var obj = {}
            obj.value=item.roleid
            obj.label=item.rolename
            this.options2.push(obj)
          });
        });
      },
      toOpen(e){
        this.updateForm.userid=e.userid
        this.updateForm.isapp=e.isapp
        this.updateForm.name=e.name
        this.updateForm.tel=e.tel
        this.updateForm.storeid=e.storeid.split(",")
        this.updateForm.roleid=e.roleid.split(",")
        this.updateForm.storeid = this.updateForm.storeid.filter(function (s) {
          return s && s.trim();
        });
        this.updateForm.roleid = this.updateForm.roleid.filter(function (s) {
          return s && s.trim();
        });
        this.dialogFormVisible=true
      },
      toTrueClose(){
        this.updateForm.roleid=this.updateForm.roleid.join(',')+','
        this.updateForm.storeid=this.updateForm.storeid.join(',')+','
        this.toUpdateStaff(this.updateForm)
        this.dialogFormVisible=false
      },
      //wxd系统管理员参数
      toUpdateStaff(data){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVI8J', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          location.reload()
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
        })
      },
      toOpenDisabled(data){
        this.centerDialogVisible=true
        this.exm=data
      },
      //禁用员工
      toDisabled(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVI8P', this.$qs.stringify(this.exm), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          location.reload()
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
        })
      },
      querySearchAsync(queryString, cb) {
        var data={}
        data.name=queryString
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAD8', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          var results=res.data.rows
          cb(results)
        });
      },
      handleSelect(item) {
       this.selectedCardno=''
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAR9', this.$qs.stringify(item), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.user=res.data.rows[0]
          this.insertForm.username=this.user.name
          this.insertForm.userid=this.user.userid
          if(res.data.rows.length){
            this.showNow=true
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNCEA0', this.$qs.stringify(this.user), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.cardlist=res.data.rows
              this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNDCNH', this.$qs.stringify(this.user), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                if(res.data.rows.length>0){
                  this.form.ordtype='E'
                }else{
                  this.form.ordtype='U'
                }
              })
            })
          }
        });
      },
      toOpen2(){
        this.insertForm.username=''
        this.insertForm.roleid=[]
        this.insertForm.storeid=[]
        this.dialogFormVisible2=true
      },
      toTrueClose2(){
        if(this.insertForm.storeid.length==0||this.insertForm.roleid.length==0){
          alert('操作失败，有选项未填')
        }else{
          this.dialogFormVisible2=false
          this.insertForm.roleid=this.insertForm.roleid.join(',')+','
          this.insertForm.storeid=this.insertForm.storeid.join(',')+','
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVI82', this.$qs.stringify(this.insertForm), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
           location.reload()
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
        })
        }
      }
    }
}
</script>

<style scoped>
    
</style>
