<template>
  <div id="container" style="padding:15px;padding-top:25px;">
    
    <div style="width:650px;margin-left:25%;margin-top:40px;">
      <el-form label-width="100px">
        <el-form-item label="姓名">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            style="width:270px;"
            @select="handleSelect"
          />
        </el-form-item>
        <el-form-item label="会员卡" :label-width="formLabelWidth">
          <el-select v-model="xuka.cardid" style="width:270px;float:left" @change="changeCard">
            <el-option
              v-for="item in cardlist"
              :key="item.cardid"
              :label="item.cardname"
              :value="item.cardid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="梯度">
          <template>
            <div>
              <el-radio v-for="(item,index) in tidu" :key="index" v-model="selectedCardno" :label="item.tid" style="display:block;margin-top:10px">
                <span>{{ item.times }}次</span>&nbsp;&nbsp;&nbsp;
                <span>有效期{{ item.periodvalidity }}天</span>&nbsp;&nbsp;&nbsp;
                <span>{{ item.fee }}元</span>&nbsp;&nbsp;&nbsp;
              </el-radio>
              <el-radio v-if="this.showNow" v-model="selectedCardno" style="display:block;margin-top:10px" label="A">
                <span>自定义次数</span>&nbsp;&nbsp;&nbsp;
                <el-input v-model="xuka.curtimes" style="width:150px" />
              </el-radio>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="实付金额" :label-width="formLabelWidth">
          <el-input v-model="xuka.totalfee" style="width:270px" />
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth">
          <el-select v-model="xuka.payment" style="width:270px;float:left">
            <el-option
              v-for="item in payoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开卡场馆" :label-width="formLabelWidth">
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

            

        <el-form-item label="是否开卡">
          <template>
            <div>
              <el-radio v-model="xuka.isopen" style="display:block;margin-top:10px" label="0">
                <span>暂不开卡</span>&nbsp;&nbsp;&nbsp;
              </el-radio>

              <el-radio v-model="xuka.isopen" label="1" style="display:block;margin-top:10px">
                <span>开卡日期</span>&nbsp;&nbsp;&nbsp;<br>
                <el-date-picker
                  v-model="xuka.mydate"
                  type="daterange"
                  range-separator=""
                  start-placeholder="卡开始日期"
                  end-placeholder="卡结束日期"
                  style="display:block;margin-top:7px;width:270px"
                />
              </el-radio>
                  
            </div>
          </template>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="xuka.remarks" style="width:270px" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        formLabelWidth:'100px',
        restaurants: [],
        state: '',
        opencode:'',
        timeout:  null,
        results:[],
        showNow:false,
        user:{},
        form: {
          userid:'',
          currentpoints1:0,
          currentpoints:0,
          points:0,
          add:0,
          pre:0,
          gamepoints:0,
          surpluspoints:0,
          surpluspoints1:0,
          actionstate:'',
          remarks:'',
          query:{},
          mycards:[]
        },
        selectedCardno:'',
        cardlist:[],
        form:{traineenum:1},
        payoption:[
            {label:'刷卡', value:'3'},
            {label:'扫码支付', value:'1'},
            {label:'转账', value:'2'},
            {label:'其他', value:'4'}
        ],
        theAllStores:[],
        bjxs:[],
        xuka:{},
        tidu:[]
      }
    },
    created(){
        this.getAllxs()
        this.getAllStore2()
        this.getAllCards()
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    onLoad(){
      this.getAllUsers()
    },
    methods:{
        getAllCards(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNE7Q9', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.cardlist=res.data.rows
          });
        },
        getAllxs(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24B21OYFT1UZ', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.bjxs=res.data.rows
            console.log(this.bjxs)
          });
        },
      getAllStore2(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.theAllStores=res.data.rows
            // console.log(this.theAllStores)
          });
        },
      changeCard(){
          var data={}
          data.cardid=this.xuka.cardid
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNE7TO', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.tidu=res.data.rows
            if(this.tidu[0].cardtype=='S'){
                this.showNow=true
            }else{
                this.showNow=false
            }
          });
      },
      getTidu(){
          var data={}
          data.cardid=this.xuka.cardid
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNE7TO', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.tidu=res.data.rows
          });
      },
      getUsers(e){
        var data={name:''}
        data.name=e
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAD8', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.jfarr=res.data.rows
          this.listLoading=false
        });
      },
      getAllUsers(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAI3', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.results=res.data.rows
        });
      },
    
      onSubmit() {
        if(this.selectedCardno=='A'){
            this.xuka.times=this.tidu[0].times
            this.xuka.originalfee=this.tidu[0].fee
            this.xuka.periodvalidity=this.tidu[0].periodvalidity
            this.xuka.typeid=this.tidu[0].tid
            this.xuka.timefee= Math.floor((this.xuka.totalfee/this.xuka.curtimes) * 100) / 100
        }else{
            this.tidu.forEach(item=>{
                if(item.tid==this.selectedCardno){
                    this.xuka.curtimes=item.times
                    this.xuka.times=item.times
                    this.xuka.originalfee=item.fee
                    this.xuka.periodvalidity=item.periodvalidity
                    this.xuka.typeid=item.tid
                    this.xuka.timefee= Math.floor((this.xuka.totalfee/this.xuka.curtimes) * 100) / 100
                }
            })
        }
        this.xuka.userid=this.user.userid+''
        this.cardlist.forEach(item=>{
            if(item.cardid==this.xuka.cardid){
                this.xuka.cardname=item.cardname
                this.xuka.cardtype=item.cardtype
                this.xuka.isfree=item.isfree
            }
        })
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
        if(this.xuka.isopen=='0'){
            this.xuka.cardbegin=null
            this.xuka.cardend=null
        }else if(this.xuka.isopen=='1'){
            this.xuka.cardbegin=this.xuka.mydate[0].toLocaleDateString().replace(/\//g, '-')
            this.xuka.cardend=this.xuka.mydate[1].toLocaleDateString().replace(/\//g, '-')
        }
        this.xuka.cardno=this.guid()
        // console.log(this.xuka)
        this.insertCard()
      },
      insertCard(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNE921', this.$qs.stringify(this.xuka), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
          this.$router.push({
              path:'/afcbdhygl/hybk',
              query: {
              }
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
      });
      },
       guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0; var v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
       },
      querySearchAsync(queryString, cb) {
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        // clearTimeout(this.timeout);
        // this.timeout = setTimeout(() => {
        //   cb(results);
        // }, 3000 * Math.random());
        var data={}
        data.name=queryString
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAD8', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          var results=res.data.rows
          // console.log(results)
          cb(results)
        });
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.selectedCardno=''
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAR9', this.$qs.stringify(item), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.user=res.data.rows[0]
          console.log(this.user)
        });
      },
      loadAll() {
        return [];
      },
      yycourse(e){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHI9', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.form={}
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
          this.$router.push({
              path:'/afcbdyyqd/afcbdyyqd',
              query: {
              }
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
      });
      }
    }
}
</script>

<style scoped>
    .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
