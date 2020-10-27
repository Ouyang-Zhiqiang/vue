<template>
  <div id="container" style="padding:15px">
    <el-dialog title="平账" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
      <el-form :model="pingzhangobj">
        <el-form-item label="操作" :label-width="formLabelWidth">
          <el-radio v-model="addOrRe" label="A">增加</el-radio>
          <el-radio v-model="addOrRe" label="R">减少</el-radio>
        </el-form-item>
        <el-form-item label="金额(元)" :label-width="formLabelWidth">
          <el-input v-model="pingzhangobj.recamount" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="pingzhangobj.remarks" style="width:270px;float:left" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="conclepingzhang()">取 消</el-button>
        <el-button type="primary" @click="pingzhang()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="续卡" :visible.sync="dialogFormVisible5" style="width:1200px;margin:0 auto">
      <el-form :model="xuka">
        <el-form-item label="充值次数" :label-width="formLabelWidth">
          <el-input v-model="xuka.buytimes" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="实收金额" :label-width="formLabelWidth">
          <el-input v-model="xuka.sellingfee" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth">
          <el-select v-model="xuka.payments" style="width:270px;float:left">
            <el-option
              v-for="item in payoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="续卡场馆" :label-width="formLabelWidth">
          <el-select v-model="xuka.storeid" style="width:270px;float:left">
            <el-option
              v-for="item in theAllStores"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="销售人员" :label-width="formLabelWidth">
          <el-select v-model="xuka.saleid" style="width:270px;float:left">
            <el-option
              v-for="item in bjxs"
              :key="item.userid"
              :label="item.name"
              :value="item.userid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息" :label-width="formLabelWidth">
          <el-input v-model="xuka.remarks" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="卡有效期" :label-width="formLabelWidth">
          <el-checkbox v-model="xuka.sz" style="float:left">设置有效期</el-checkbox><br>
          <el-date-picker
            v-model="xuka.mydate"
            style="margin-top: 5px;width:270px"
            type="daterange"
            range-separator=""
            start-placeholder="卡开始日期"
            end-placeholder="卡结束日期"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="conclexuka()">取 消</el-button>
        <el-button type="primary" @click="xukatrue()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="期限变更" :visible.sync="dialogFormVisible2" style="width:1200px;margin:0 auto">
      <el-form :model="qixianobj">
        <el-form-item label="原期限" :label-width="formLabelWidth">
          <!-- <el-input v-if="qixianobj.isopen==0" style="width:270px;float:left">暂未开卡</el-input> -->
          <el-input v-model="qixianobj.oldbegin" style="width:150px;float:left" disabled />
          <el-input v-model="qixianobj.oldend" style="width:150px;float:left;margin-left:10px" disabled />
        </el-form-item>
        <el-form-item label="修改期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="datevalue"
            style="margin-top: 5px;"
            type="daterange"
            range-separator=""
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="qixianobj.remarks" style="width:270px;float:left" />
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelqixian()">取 消</el-button>
        <el-button type="primary" @click="qixian()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="停卡" :visible.sync="dialogFormVisible3" style="width:1200px;margin:0 auto">
      <el-form :model="stopcard">
        <!-- <el-form-item label="停卡期限" :label-width="formLabelWidth">
          <el-radio v-model="stopTime" label="P">永久停卡</el-radio>
          <el-radio v-model="stopTime" label="T">临时停卡</el-radio>
        </el-form-item>
        <el-form-item label="收款(元)" :label-width="formLabelWidth" v-if="stopTime=='T'">
            <el-input v-model="stopcard.recamount"  style="width:270px;float:left"></el-input>
        </el-form-item> -->
        <el-form-item v-if="stopTime=='P'" label="退费(元)" :label-width="formLabelWidth">
          <el-input v-model="stopcard.fee" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth">
          <el-select v-model="stopcard.payments" style="width:270px;float:left">
            <el-option
              v-for="item in payoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="stopcard.remarks" style="width:270px;float:left" />
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="conclecard()">取 消</el-button>
        <el-button type="primary" @click="stopcardtrue()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="扣卡" :visible.sync="dialogFormVisible4" style="width:1200px;margin:0 auto">
      <el-form :model="recard">
        <el-form-item label="减少" :label-width="formLabelWidth">
          <el-input v-model="recard.times" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="recard.remarks" style="width:270px;float:left" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="recardconcle()">取 消</el-button>
        <el-button type="primary" @click="recardtrue()">确 定</el-button>
      </div>
    </el-dialog>

    

    <el-tabs type="border-card" style="margin-top:10px">
      <el-tab-pane label="会员详情">
        <div style="width:150px;height:150px;float:left;">
          <img :src="img.originalpath" width="100px" height="100px">
        </div>
        <div style="width:350px;float:left">
          <span style="font-size:24px;color:#307EF8">{{ query.name }}</span><br>
          <span style="font-size:15px;">等级：lv{{ query.memgrade }}</span><br>
          <span style="font-size:15px;">手机：{{ query.tel }}</span><br>
          <span style="font-size:15px;">积分：{{ query.points }}</span><br>
          <span style="font-size:15px;">时间：{{ query.createdon }}</span><br>
        </div>
        <el-button type="primary" style="float:right" @click="tjgjjl">添加跟进记录</el-button>
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top:10px">
      <el-tab-pane label="会员分析">
        <div style="width:100%;padding:20px">
          <div style="width:33%;float:left;">
            <span style="font-size:18px;">消费总金额</span><br><br><br>
            <span style="font-size:22px">￥{{ amount.sum }}元</span><br>
          </div>
          <div style="width:33%;float:left;">
            <span style="font-size:18px;">上课数</span><br><br><br>
            <span style="font-size:22px">{{ courseAmount.count }}节</span><br>
          </div>
          <div style="width:33%;float:left;">
            <span style="font-size:18px;">有效会员卡</span><br><br><br>
            <span style="font-size:22px">{{ cardamount.count }}张</span><br>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top:10px">
      <el-tab-pane label="会员绑卡">
        <el-table v-loading="listLoading" :data="bindCardList" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="时间" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createdon }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="会员卡(卡号末六位)" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.cardname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1">正常</span>
              <span v-if="scope.row.state==0">停卡</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="余额" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.curtimes }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="期限" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.cardbegin }}</span>~
              <span>{{ scope.row.cardend }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="300">
            <template slot-scope="scope"> 
              <div v-if="scope.row.cardtype=='P'">
                <el-button v-if="scope.row.state==1" type="text" @click="opencard(scope.row)">停卡</el-button>
                <el-button v-if="scope.row.state==0" type="text" @click="changestate(scope.row.cardno)">恢复</el-button>
                <el-button type="text">期限变更</el-button>
                <el-button type="text" @click="tpingzhang(scope.row)">平账</el-button>
              </div>
              <div v-if="scope.row.cardtype=='S'">
                <el-button type="text" @click="openxuka(scope.row)">续卡</el-button>
                <el-button type="text" @click="openrecard(scope.row)">扣卡</el-button>
                <el-button v-if="scope.row.state==1" type="text" @click="opencard(scope.row)">停卡</el-button>
                <el-button v-if="scope.row.state==0" type="text" @click="changestate(scope.row.cardno)">恢复</el-button>
                <el-button type="text" @click="openqixian(scope.row)">期限变更</el-button>
                <el-button type="text" @click="tpingzhang(scope.row)">平账</el-button>
              </div>
            </template>
            
          </el-table-column>
        </el-table>

      </el-tab-pane>

      <el-tab-pane label="最新消费">
        <el-table v-loading="listLoading" :data="myBuyList" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="时间" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.createdon }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="会员卡(卡号末六位)" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.cardname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="购买次数" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.buytimes }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="备注" width="350">
            <template slot-scope="scope">
              <span>{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="跟进记录">
          <el-table :data="genjinall" style="width: 100%">
            <el-table-column prop="remarks" label="跟进内容">
            </el-table-column>
            <el-table-column prop="createdname" label="跟进人" width="380">
            </el-table-column>
            <el-table-column prop="createdon" label="跟进时间" width="380">
            </el-table-column>
          </el-table>
      </el-tab-pane>

    </el-tabs>

    <el-dialog title="添加跟进记录" :visible.sync="dialogVisible" width="30%" :before-close="quxiao">
      <el-input v-model="gjjltext" placeholder="跟进记录"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="addgjjl">确 定</el-button>
      </span>
</el-dialog>
    

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
            dialogFormVisible:false,
            formLabelWidth:'150px',
            img:{},
            amount:{},
            courseAmount:{},
            cardamount:{},
            bindCardList:[],
            myBuyList:[],
            listLoading:false,
            pingzhangShow:false,
            pingzhangobj:{},
            addOrRe:'A',
            dialogFormVisible2:false,
            dialogFormVisible3:false,
            qixianobj:{},
            datevalue:{},
            stopTime:'P',
            stopcard:{},
            payoption:[
              {label:'刷卡', value:'3'},
              {label:'扫码支付', value:'1'},
              {label:'转账', value:'2'},
              {label:'其他', value:'4'}
            ],
            dialogFormVisible4:false,
            recard:{},
            xuka:{
              sz:false,
              mydate:[]
            },
            dialogFormVisible5:false,
            theAllStores:[],
            bjxs:[],
            genjinall:[],
            dialogVisible:false,
            gjjltext:''
        }
    },
    created(){
        this.query=this.$route.query.item
        this.getAllxs()
        this.getAllStore2()
        this.getImg()
        this.getAmount()
        this.getCourseAmount()
        this.getCardAmount()
        this.getBindCardList()
        this.getMyBuyList()
        this.genjinjilu()
    },
    mounted(){
        
    },
    methods:{ 
      getAllxs(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFT1UZ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.bjxs=res.data.rows
            console.log(this.bjxs)
          });
        },
      getAllStore2(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.theAllStores=res.data.rows
            console.log(this.theAllStores)
          });
        },
        getImg(){
            var data={}
            data.userid=this.query.userid
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBCTZ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.img=res.data.rows[0]
            });
        },
        getAmount(){
            var data={}
            data.userid=this.query.userid
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBD03', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.amount=res.data.rows[0]
            });
        },
        getCourseAmount(){
            var data={}
            data.userid=this.query.userid
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBD2Q', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.courseAmount=res.data.rows[0]
            });
        },
        getCardAmount(){
            var data={}
            data.userid=this.query.userid
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBD1I', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.cardamount=res.data.rows[0]
            });
        },
        getBindCardList(){
            var data={}
            data.userid=this.query.userid
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBD8Z', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.bindCardList=res.data.rows
                console.log(this.bindCardList)
            });
        },
        getMyBuyList(){
            var data={}
            data.userid=this.query.userid
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBD94', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.myBuyList=res.data.rows
            });
        },
        tpingzhang(e){
          this.pingzhangobj.cardno=e.cardno
          this.pingzhangobj.cardid=e.cardid
          this.pingzhangobj.cardname=e.cardname
          this.pingzhangobj.typeid=e.typeid
          this.pingzhangobj.cardid=e.cardid
          this.dialogFormVisible=true
        },
        conclepingzhang(){
          this.dialogFormVisible=false
          this.pingzhangobj={}
        },
        pingzhang(){
          if(this.addOrRe=='A'){
            this.pingzhangobj.rectype='A'
          }else if(this.addOrRe=='R'){
            this.pingzhangobj.rectype='R'
            this.pingzhangobj.recamount=0-this.pingzhangobj.recamount
          }
          // console.log(this.pingzhangobj)
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBH6B', this.$qs.stringify(this.pingzhangobj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.dialogFormVisible=false
            this.pingzhangobj={}
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
          });
        },
        cancelqixian(){
          this.dialogFormVisible2=false
          this.qixianobj={}
        },
        openqixian(e){
          this.qixianobj.cardno=e.cardno
          this.qixianobj.cardid=e.cardid
          this.qixianobj.cardname=e.cardname
          this.qixianobj.typeid=e.typeid
          this.qixianobj.cardid=e.cardid
          this.qixianobj.oldbegin=e.cardbegin
          this.qixianobj.oldend=e.cardend
          this.dialogFormVisible2=true
        },
        qixian(){
          this.qixianobj.newbegin=this.datevalue[0].toLocaleDateString().replace(/\//g, '-')
          this.qixianobj.newend=this.datevalue[1].toLocaleDateString().replace(/\//g, '-')
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBH95', this.$qs.stringify(this.qixianobj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.dialogFormVisible2=false
            this.getBindCardList()
            this.qixianobj={}
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
          });
        },
        conclecard(){
          this.dialogFormVisible3=false
          this.stopcard={}
        },
        stopcardtrue(){
          this.stopcard.stoptype=this.stopTime
          
           this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHEG', this.$qs.stringify(this.stopcard), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.dialogFormVisible3=false
            this.getBindCardList()
            this.stopcard={}
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
          });
        },
        opencard(e){
          this.dialogFormVisible3=true
          this.stopcard.cardno=e.cardno
          this.stopcard.cardid=e.cardid
          this.stopcard.cardname=e.cardname
          this.stopcard.typeid=e.typeid
          this.stopcard.curtimes=e.curtimes
        },
        changestate(e){
          var obj={}
          obj.cardno=e
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNC79E', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.getBindCardList()
          this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
          });
        },
        openrecard(e){
          this.dialogFormVisible4=true
          this.recard.cardno=e.cardno
          this.recard.cardid=e.cardid
          this.recard.cardname=e.cardname
          this.recard.typeid=e.typeid
          this.recard.originalfee=e.originalfee
        },
        recardconcle(){
          this.dialogFormVisible4=false
          this.recard={}
        },
        recardtrue(){
          var arr=[]
          var obj={}
          obj.UserId=this.query.userid+''
          obj.UserName=this.query.name
          arr.push(obj)
          this.recard.usersjson=JSON.stringify(arr)
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHBZ', this.$qs.stringify(this.recard), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.dialogFormVisible4=false
          this.getBindCardList()
          this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            })
          }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
          });
        },
        openxuka(e){
          this.dialogFormVisible5=true
          this.xuka.cardid=e.cardid
          this.xuka.cardno=e.cardno
          this.xuka.cardname=e.cardname
          this.xuka.buytype='C'
          this.xuka.cardbegin=e.cardbegin
          this.xuka.cardend=e.cardend
        },
        conclexuka(){
          this.dialogFormVisible5=false
        },
        xukatrue(){
          this.bjxs.forEach(item=>{
            if(this.xuka.saleid==item.userid){
              this.xuka.salename=item.name
            }
          })
          this.theAllStores.forEach(item=>{
            if(item.id==this.xuka.storeid){
              this.xuka.storename=item.name
            }
          })
          console.log(this.xuka)
          if(this.xuka.sz==false){
            this.xuka1()
          }else{
            this.xuka.cardbegin=this.xuka.mydate[0].toLocaleDateString().replace(/\//g, '-')
            this.xuka.cardend=this.xuka.mydate[1].toLocaleDateString().replace(/\//g, '-')
            this.xuka2()
          }
        },
        xuka1(){//无续卡时间
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNDSAB', this.$qs.stringify(this.xuka), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.xuka={}
            this.xuka.sz=false
            this.mydate=[]
            this.dialogFormVisible5=false
            this.$message({
                message: '恭喜你，操作成功',
                type: 'success'
              })
            }).catch(error=>{
              this.$message.error('错了哦，这是一条错误消息');
          });
        },
        xuka2(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNDSGP', this.$qs.stringify(this.xuka), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.xuka={}
            this.xuka.sz=false
            this.mydate=[]
            this.dialogFormVisible5=false
            this.$message({
                message: '恭喜你，操作成功',
                type: 'success'
              })
            }).catch(error=>{
              this.$message.error('错了哦，这是一条错误消息');
          });
        },
        genjinjilu(){   
          var data={}
          data.userid=this.query.userid 
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEV7T4', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.genjinall=res.data.rows
          });
        },
        tjgjjl(){
          this.dialogVisible=true
        },
        quxiao(){
          this.dialogVisible=false
          this.gjjltext=''
        },
        addgjjl(){          
          var data={}
          data.userid=this.query.userid
          data.remarks=this.gjjltext
          data.createdby=localStorage.getItem('userid')
          data.createdname=localStorage.getItem('username')
          data.createdip='127.0.0.1'
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLO6X6B', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.$message({
                message: '操作成功',
                type: 'success'
            })
            this.genjinjilu()
          });
          this.dialogVisible=false
          this.gjjltext=''
        }

    }
}
</script>

<style scoped>

</style>
