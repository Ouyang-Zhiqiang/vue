<template>
  <div id="container" style="padding:15px">
    <el-button v-for="(item,index) in stores" :key="index" @click="toGetAllByStore(item.id)">{{ item.name }}</el-button>
    <el-button v-show="isShow" id="storeshow" @click="toGetAllByStore(1)">未设置场馆</el-button>
    

    <el-row :gutter="10" style="margin-top:20px">
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content bg-purple">
          <span style="font-size:18px;padding-top:10px">今日新增会员</span><br>
          <span style="font-size:18px">3人</span><br>
          <span>昨日 10 人</span><br>
          <span>本周 36 人</span><br>
          <span>本月 102 人</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content bg-purple-light">
          <span style="font-size:18px;padding-top:10px">今日付费会员</span><br>
          <span style="font-size:18px">3人</span><br>
          <span>昨日 10 人</span><br>
          <span>本周 36 人</span><br>
          <span>本月 102 人</span>
          
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content bg-purple">
          <span style="font-size:18px;padding-top:10px">今日续费会员</span><br>
          <span style="font-size:18px">3人</span><br>
          <span>昨日 10 人</span><br>
          <span>本周 36 人</span><br>
          <span>本月 102 人</span>
        </div>
      </el-col>
    </el-row>
        

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="会员列表">
        <el-select v-model="hykvalue" placeholder="全部会员卡" style="margin-top:5px">
          <el-option
            v-for="item in hyklx"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select v-model="xsvalue" placeholder="全部销售" style="margin-top:5px">
          <el-option
            v-for="item in qbxs"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select v-model="ztvalue" placeholder="状态" style="margin-top:5px">
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

        <el-input v-model="sjh" placeholder="手机号" style="width:180px;margin-top:5px" />
        <el-input v-model="xm" placeholder="姓名" style="width:180px;margin-top:5px" />

        <el-button type="success" style="margin-top:5px;margin-left:30px" @click="toClickSearch">查询</el-button>
        <el-button type="success" style="margin-top:5px" @click="daochu">导出Excel</el-button>
        <el-button type="success" style="margin-top:5px" @click="toOpen4">新增会员</el-button>
        <el-dialog title="新增会员" :visible.sync="dialogFormVisible4" style="width:1200px;margin:0 auto">
          <el-form :model="form4">
            <el-form-item label="姓名" :label-width="formLabelWidth" required>
              <el-input v-model="form4.name" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" required>
              <el-radio v-model="form4.sex" label="0" value="0" style="float:left;margin-top:10px;margin-left:5px">男</el-radio>
              <el-radio v-model="form4.sex" label="1" value="1" style="float:left;margin-top:10px;">女</el-radio>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth" required>
              <el-input v-model="form4.tel" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="场馆" :label-width="formLabelWidth" required>
              <el-select v-model="form4.storeId" style="width:270px;float:left">
                <el-option v-for="item in theAllStores" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="来源" :label-width="formLabelWidth">
              <el-select v-model="form4.sourcetype" style="width:270px;float:left">
                <el-option v-for="item in sources" :key="item.id" :label="item.name" :value="item.index" />
              </el-select>
            </el-form-item>
            <el-form-item label="销售" :label-width="formLabelWidth">
              <el-select v-model="form4.xsid" style="width:270px;float:left">
                <el-option v-for="item in insertXsList" :key="item.userid" :label="item.name" :value="item.userid" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input
                v-model="form4.remarks"
                style="width:270px;float:left;height:100px"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible4 = false">取 消</el-button>
            <el-button type="primary" @click="toTrue4()">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
          <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio v-model="form.sex" label="0" style="float:left;margin-top:10px;margin-left:5px">男</el-radio>
              <el-radio v-model="form.sex" label="1" style="float:left;margin-top:10px;">女</el-radio>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form.tel" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="场馆" :label-width="formLabelWidth">
              <el-select v-model="form.storeId" style="width:270px;float:left">
                <el-option v-for="item in allStores" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="来源" :label-width="formLabelWidth">
              <el-select v-model="form.sourcetype" style="width:270px;float:left">
                <el-option v-for="item in sources" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="销售" :label-width="formLabelWidth">
              <el-select v-model="form.xsid" style="width:270px;float:left">
                <el-option v-for="item in bjxs" :key="item.userid" :label="item.name" :value="item.userid" />
              </el-select>
            </el-form-item>
                  
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input
                v-model="form.remarks"
                style="width:270px;float:left;height:100px"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                :placeholder="form.remarks"
              />
            </el-form-item>
                  
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="toTrueClose()">确 定</el-button>
          </div>
        </el-dialog>


        <el-table id="out-table" v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="姓名" width="150">
            <template slot-scope="scope">

              <span style="color:#337AB7;cursor:pointer" @click="toUrl(scope.row)">{{ scope.row.name }}</span>
      
            </template>
          </el-table-column>

          <el-table-column align="center" width="130" label="手机号">
            <template slot-scope="scope">
              <span style="color:#337AB7;cursor:pointer" @click="toUrl(scope.row)">{{ scope.row.tel }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180" align="center" label="会员卡">
            <template slot-scope="scope">
              <span v-html="scope.row.cardsname" />
            </template>
          </el-table-column>

          <el-table-column width="80" label="会员等级">
            <template slot-scope="scope">
              <span>Lv:{{ scope.row.memgrade }}</span>
            </template>
          </el-table-column>

          <el-table-column width="130" label="会员场馆">
            <template slot-scope="scope">
              <span>{{ scope.row.storename }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="时间" width="150">
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
              
            
              <el-button v-if="scope.row.status==1" type="text" @click="updateToDisEn(scope.row.status,scope.row.userid,scope.$index)">禁用</el-button>
              <el-button v-else-if="scope.row.status==0" type="text" @click="updateToDisEn(scope.row.status,scope.row.userid,scope.$index)">启用</el-button>

              <el-button type="text" @click="toOpen2(scope.row)">改积分</el-button>
              <el-dialog title="修改积分" :visible.sync="dialogFormVisible2" style="width:1200px;margin:0 auto">
                <el-form :model="form">
                  <el-form-item label="加" :label-width="formLabelWidth">
                    <el-input v-model="form2.add" style="width:270px;float:left" />
                  </el-form-item>
                  <el-form-item label="减" :label-width="formLabelWidth">
                    <el-input v-model="form2.pre" style="width:270px;float:left" />
                  </el-form-item>
                  <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input
                      v-model="form2.remarks"
                      style="width:270px;float:left;height:100px"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      :placeholder="form2.remarks"
                    />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="toTrueClose2()">确 定</el-button>
                </div>
              </el-dialog>

              <el-button type="text" @click="toOpen3(scope.row)">改等级</el-button>
              <el-dialog title="修改等级" :visible.sync="dialogFormVisible3" style="width:1200px;margin:0 auto">
                <el-form :model="form3">
                  <el-form-item label="会员等级" :label-width="formLabelWidth">
                    <el-radio v-model="form3.memgrade" label="1">Lv1</el-radio>
                    <el-radio v-model="form3.memgrade" label="2">Lv2</el-radio>
                    <el-radio v-model="form3.memgrade" label="3">Lv3</el-radio>
                    <el-radio v-model="form3.memgrade" label="4">Lv4</el-radio>
                  </el-form-item>
                  
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                  <el-button type="primary" @click="toTrueClose3()">确 定</el-button>
                </div>
              </el-dialog>

            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="toGetAll(listQuery)" />

      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import data from '../pdf/content';
import { fetchList } from '@/api/hy';
import Pagination from '@/components/Pagination';
import FileSaver from "file-saver";
import XLSX from "xlsx";
import $ from "jquery";

export default {
    components: { Pagination },
    data(){
        return{
          isShow:false,
            dialogImageUrl: '',
            dialogVisible: false,
            formLabelWidth: '150px',
            dialogFormVisible: false,
            dialogFormVisible2:false,
            dialogFormVisible3:false,
            dialogFormVisible4:false,
            stores:[],
            loginname:'',
            sources:[
              {id:0, name:'自然到店'},
              {id:1, name:'老带新'},
              {id:2, name:'拉访'},
              {id:3, name:'大众点评'},
              {id:4, name:'活动'},
              {id:5, name:'其他'}
            ],
            startStoreId:'',
            form: {
              name: '',
              sex: '',
              tel: '',
              xsid:'',
              storeId: '',
              storeName:'',
              xsname:'',
              remarks:''
            },
            form2:{
              add:0,
              pre:0,
              points:0,
              remarks:''
            },
            form3:{
              memgrade:'',
              userid:''
            },
            form4:{
              name: '',
              sex: '0',
              tel: '',
              storeId: '',
              storeName:'',
              xsname:'',
              remarks:'',
              xsid:'',
              sourcetype:''
            },
            allStores:[],
            theAllStores:[],
            bjxs:[],
            datevalue:'',
            hyvalue: '',

            hyklx: [{
            value: 'A',
            label: '全部会员卡'
            }],

            insertXsList:[],

            qbxs: [{
            value: 'B',
            label: '全部销售'
            }],

            zt: [{
            value: 'C',
            label: '全部'
            }, {
            value: '1',
            label: '正常'
            }, {
            value: '0',
            label: '已禁用'
            }],
            qbxsvalue: '',
            allStores2:[],
            //搜索条件
            hykvalue: 'A',
            xsvalue:'B',
            ztvalue: 'C',
            sjh:'',
            xm:'',
            clickSearch:false,
            clickStore:false,
            clickStoreId:'',

            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
              page: 1,
              limit:20
            }
           
        }
    },
    mounted() {
    },
    created(){
      this.getAllStore2()
      this.getAllStore3()
      this.toGetAll(this.listQuery)
      this.getAllxs()
      this.getAllxs2()
      this.getAllhyk()
      this.getAllStore()
      this.getAllxs5()
      this.getAllStore3()
      this.storeBlock()
    },
    methods:{
        storeBlock(){
          var loginname=localStorage.getItem('username')
          var roleid=localStorage.getItem('roleid')
          if(loginname!=null&&(loginname=='系统管理员'||roleid.search('2018053014055110006') !=-1||roleid.search('2018053014114510000') !=-1||roleid.search('2018053014052310002') !=-1)){
            this.isShow=true
          }
        },
        getAllStore3(){
           var roleid=localStorage.getItem('roleid')
            if(localStorage.getItem('username')=='系统管理员'||roleid.search('2018053014055110006') !=-1||roleid.search('2018053014114510000') !=-1||roleid.search('2018053014052310002') !=-1){
                this.startStoreId='F'
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.stores=res.data.rows
                    var obj={}
                    obj.id='F'
                    obj.name='全部运动馆'
                    this.stores.unshift(obj)
                })
            }else if(localStorage.getItem('storenumber')==localStorage.getItem('storeid').split(',').length-1){
               this.startStoreId='F'
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.stores=res.data.rows
                    var obj={}
                    obj.id='F'
                    obj.name='全部运动馆'
                    this.stores.unshift(obj)
                })
            }else{
                this.startStoreId=localStorage.getItem('storeid').split(',')[0]
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    var userStore=localStorage.getItem('storeid').split(',')
                    var storeArr=res.data.rows
                    var mystore=[]
                    userStore.forEach(item1=>{
                        storeArr.forEach(item => {
                            if(item1==item.id){
                                mystore.push(item)
                            }
                        })
                    })
                    this.stores=mystore
                    this.startStoreId=this.stores[0].id
                })
            }    
        },
        //会员列表
        toGetAll(data){
          if(this.clickSearch){
            data.storeid=this.startStoreId
            // data.page=data.page-1
            if(this.hykvalue=='A'){
              console.log('无卡条件')
              
              data.saleuserid=this.xsvalue
              data.status=this.ztvalue
              if(this.sjh==''){
                data.tel='D'
              }else{
                data.tel=this.sjh
              }
              if(this.xm==''){
                data.name='E'
              }else{
                data.name=this.xm
              }
              this.listLoading=true 
              console.log()
              //无卡条件
              this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1U3F', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                if(res.data.total==0){
                  alert('查询暂无数据')
                }else{
                  this.list=res.data.rows
                  this.total=res.data.rows[0].counts
                  this.list.forEach((item, index)=>{
                    item.memgrade=parseInt(item.memgrade)+''
                    item.cardsname=''
                    item.cards=JSON.parse(item.cards)
                    if(item.cards){
                      item.cards.forEach((item1, index)=>{
                        item.cardsname+=item1.cardname+'<br>'
                      })
                    }else{
                      item.cardsname=''
                    }
                  })
                }
                this.listLoading=false
              });
            }else{
              console.log('有卡条件')
              
              data.saleuserid=this.xsvalue
              data.status=this.ztvalue
              data.cardid=this.hykvalue
              if(this.sjh==''){
                data.tel='D'
              }else{
                data.tel=this.sjh
              }
              if(this.xm==''){
                data.name='E'
              }else{
                data.name=this.xm
              }
              this.listLoading=true
              //有卡条件
              this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1U6C', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                 if(res.data.total==0){
                  alert('查询暂无数据')
                }else{
                this.list=res.data.rows
                this.total=res.data.rows[0].counts
                this.list.forEach((item, index)=>{
                  item.memgrade=parseInt(item.memgrade)+''
                  item.cardsname=''
                  item.cards=JSON.parse(item.cards)
                  if(item.cards){
                    item.cards.forEach((item1, index)=>{
                      item.cardsname+=item1.cardname+'<br>'
                    })
                  }else{
                    item.cardsname=''
                  }
                })
                this.listLoading=false
                  }
              });
            
            }
          }else if(this.clickStore){
            
            data.storeid=this.startStoreId
            this.listLoading=true
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFSUYV', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
               if(res.data.total==0){
                  alert('查询暂无数据')
                }else{
              this.list=res.data.rows
              this.total=res.data.rows[0].counts
              this.list.forEach((item, index)=>{
                item.memgrade=parseInt(item.memgrade)+''
                item.cardsname=''
                item.cards=JSON.parse(item.cards)
                if(item.cards){
                  item.cards.forEach((item1, index)=>{
                    item.cardsname+=item1.cardname+'<br>'
                  })
                }else{
                  item.cardsname=''
                }
              })
              this.listLoading=false
                }
            });
          }else if(this.clickSearch==false&&this.clickStore==false){
            console.log(this.startStoreId)
            var roleid=localStorage.getItem('roleid')
            if(this.startStoreId==''&&(loginname=='系统管理员'||roleid.search('2018053014055110006') !=-1||roleid.search('2018053014114510000') !=-1||roleid.search('2018053014052310002') !=-1)){
              data.storeid='F'
            }else{
              data.storeid=this.startStoreId
            }
            this.listLoading=true
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFSUYV', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.list=res.data.rows
              this.total=res.data.rows[0].counts
              this.list.forEach((item, index)=>{
                item.memgrade=parseInt(item.memgrade)+''
                item.cardsname=''
                item.cards=JSON.parse(item.cards)
                if(item.cards){
                  item.cards.forEach((item1, index)=>{
                    item.cardsname+=item1.cardname+'<br>'
                  })
                }else{
                  item.cardsname=''
                }
              })
              this.listLoading=false
            });
          }
        },
        toGetAllByStore(e){
          this.clickStore=true
          this.clickSearch=false
          this.startStoreId=e
          this.listQuery.page=1
          
          this.toGetAll(this.listQuery)
        },
        toGetAllStoreUser(){
          this.clickStore=false
          this.clickSearch=false
          
          this.toGetAll(this.listQuery)
        },
        //获取全部销售
        getAllxs(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFT1UZ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            var noxs={name:'暂无销售', userid:0}
            this.bjxs=res.data.rows
            this.bjxs.unshift(noxs)
          });
        },
        getAllxs5(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFT1UZ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.insertXsList=res.data.rows
          });
        },
        getAllxs2(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFT1UZ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            res.data.rows.forEach((item, index)=>{
              var obj = {}
              obj.value=item.userid
              obj.label=item.name
              this.qbxs.push(obj)
            })
          });
        },
        //测试
        tetest01(){
          var data={tel:'8', name:'罗'}
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVVRY', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          });
        },
        //获取所有运动馆
        getAllStore(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            var nostore={name:'未选运动馆', id:'1'}
            this.allStores=res.data.rows
            this.allStores2=this.allStores
            this.allStores.unshift(nostore)
          });
        },
        getAllStore2(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.theAllStores=res.data.rows
          });
        },
        //获取全部会员卡类型
        getAllhyk(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFT2AA', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            res.data.rows.forEach((item, index)=>{
              var obj = {}
              obj.value=item.cardid
              obj.label=item.cardname
              this.hyklx.push(obj)
            })
          });
        },

        //用户基本信息修改
        updateUser(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEV5DL', this.$qs.stringify(this.form), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
          });
        },
        //禁用启用
        updateStatus(e, id, index){
          var data={
            status:e,
            userid:id
          }
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEV5FN', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.list[index].status=e
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
          });
        },
        //积分修改接口
        updateJf(data){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW2WF', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
          });
        },
        //修改会员等级
        updateGrade(data){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEV5GQ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
          });
        },
        updateToDisEn(e, id, index){
          var status=0
          if(e==0){
            status=1
            this.updateStatus(status, id, index);
          }else if(e==1){
            status=0
            this.updateStatus(status, id, index);
          }
        },
        toOpen4(){
          this.form4.tel=''
          this.form4.name=''
          this.form4.storeId=''
          this.form4.sex='0'
          this.form4.xsid=''
          this.form4.remarks=''
          this.dialogFormVisible4=true
        },
        toOpen3(e){
          this.dialogFormVisible3 = true
          this.form3.memgrade=e.memgrade
          this.form3.userid=e.userid
          this.form3.currentgrade=e.memgrade
        },
        toTrueClose3(){
          this.form3.createdby='2018053108595110000'
          this.form3.createdname='系统管理员'
          this.form3.createdip='127.0.0.1'
          this.updateGrade(this.form3)
          this.dialogFormVisible3=false
        },
        //修改积分弹窗
        toOpen2(e){
          this.dialogFormVisible2 = true
          this.form2.add=0
          this.form2.pre=0
          this.form2.userid=e.userid
          this.form2.currentpoints=e.points
          this.form2.remarks=''
          this.form2.actionstate=''
          this.form2.createdby='2018053108595110000'
          this.form2.createdname='系统管理员'
          this.form2.createdip='127.0.0.1'
          this.form2.changeaction='系统管理员'
        },
        //修改积分弹窗点击确定
        toTrueClose2(){
          if(this.form2.add>0&&this.form2.pre>0){
            this.$message.error('错了哦，这是一条错误消息');
          }else if(this.form2.add>0&&this.form2.pre==0){
            this.form2.points=this.form2.add
            this.form2.actionstate='+'
            this.form2.surpluspoints=parseInt(this.form2.add)+parseInt(this.form2.currentpoints)
            this.updateJf(this.form2)
            this.dialogFormVisible2 = false
          }else if(this.form2.add==0&&this.form2.pre>0){
            this.form2.points=this.form2.pre
            this.form2.actionstate='-'
            this.form2.surpluspoints=parseInt(this.form2.currentpoints)-parseInt(this.form2.points)
            this.updateJf(this.form2)
            this.dialogFormVisible2 = false
          }else if(this.form2.add<0||this.form2.pre<0){
            this.$message.error('错了哦，这是一条错误消息');
          }else{

          }
        },
        //点击打开用户信息编辑弹窗
        toOpen(e){
          this.dialogFormVisible=true
          this.form.name=e.name
          this.form.sex=e.sex
          this.form.tel=e.tel
          this.form.storeId=e.storeid
          this.form.storeName=e.storename
          this.form.xsid=e.saleuserid
          this.form.xsname=e.xs
          this.form.remarks=e.remarks
          this.form.userid=e.userid
          this.form.sourcetype=e.sourcetype
        },
        //会员编辑弹窗点击确定
        toTrueClose(){
          this.dialogFormVisible=false
          this.updateUser()
          this.toGetAll(this.listQuery)
        },
        toTrue4(){
          if(this.form4.name==''||this.form4.sex==''||this.form4.tel==''||this.form4.storeId==''){
            alert('检测有未填信息！')
          }else{
            var phone={}
            phone.tel=this.form4.tel
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLOJG9Q', this.$qs.stringify(phone), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              var row=res.data.rows
              if(row!=null&&row!=''&&row!=undefined){
                  this.$message.error("手机号已存在");
              }else{
                this.form4.createdby=localStorage.getItem('userid')
                this.form4.createdname=localStorage.getItem('username')
                this.form4.lastedby=localStorage.getItem('userid')
                this.form4.lastedname=localStorage.getItem('username')
                if( this.form4.saleuserid==null|| this.form4.saleuserid==''||this.form4.saleuserid==undefined){
                   this.form4.saleuserid=0
                }
                this.form4.createdip='127.0.0.1'
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var day = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes(); 
                var second = date.getSeconds();

                var data={}
                data=this.form4
                data.userid=year+''+month+''+day+''+hour+''+minute+''+second
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1UUV', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                  this.toGetAll(this.listQuery)
                  this.dialogFormVisible4=false
                  this.$message({
                    message: '恭喜你，操作成功',
                    type: 'success'
                  })
                }).catch(error=>{
                  this.$message.error('错了哦，这是一条错误消息');
                });
              }
            }).catch(error=>{
              this.$message.error('错了哦，这是一条错误消息');
            });
          }
        },
        createUser(){
          
        },


    daochu() {
      this.listQuery.limit = 9999;
      this.listQuery.page = 1;
      this.toGetAll(this.listQuery);
      setTimeout(this.daochuexcel, 9000);
      this.listQuery.limit = 20;
      this.listQuery.page = 1;
      setTimeout(this.toGetAll(this.listQuery), 9500);
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
          "会员列表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
    },

        toUpdateNow(index){
          this.list(index).name=this.form.name
          this.list(index).sex=this.form.sex
          this.list(index).tel=this.form.tel
          this.list(index).storeid=this.form.storeId
          this.list(index).storename=this.form.storeName
          this.list(index).saleuserid=this.form.xsid
          this.list(index).remarks=this.form.remarks
          // this.bjxs.forEach((item)=>{
          //   if(this.form.xsid==item.userid){
          //     this.list(index).xs=item.name
          //   }
          // })
        },
        //点击搜索
        toClickSearch(){
          this.clickSearch=true
          this.toGetAll(this.listQuery)
        },
        toUrl(e){
            this.$router.push({
                path:'/afcbdhygl/hyxq',
                query: {
                    item: e
                }
            })
        }
    }
}
</script>

<style scoped>
    .el-col {
        border-radius: 4px;
        margin-top: 10px;
    }
    .el-col span{
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
        color: #989FA8;
    }
</style>
