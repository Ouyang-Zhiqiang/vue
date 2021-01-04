<template>
  <div>
    <div id="container" style="padding:50px">
      <el-select v-model="storeid" placeholder="" style="margin-top:0px">
        <el-option
          v-for="item in allStores"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="coachid" placeholder="" style="margin-top:0px">
        <el-option
          v-for="item in allCoach"
          :key="item.userid"
          :label="item.name"
          :value="item.userid"
        />
      </el-select>
      <el-button type="success" style="margin-left:30px" @click="toClickSearch">查询</el-button>

      <el-button type="success" style="margin-left:30px" @click="toOpen">排课</el-button>
      <el-dialog title="排课" :visible.sync="dialogFormVisible" style="width:1600px;margin:0 auto">
        <el-form :model="form">
          <el-form-item label="选择运动馆" :label-width="formLabelWidth" required>
            <el-select v-model="form.storeid" style="width:200px;float:left">
              <el-option v-for="item in allStores" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
            
          <el-form-item label="上课开始时间" :label-width="formLabelWidth" required>
            <el-select v-model="form.hourse" style="width:100px;float:left">
              <el-option v-for="item in startHourse" :key="item" :label="item" :value="item" />
            </el-select><span style="float:left;padding:0 5px">点</span>
            <el-select v-model="form.minutes" style="width:100px;float:left">
              <el-option v-for="item in startMinute" :key="item" :label="item" :value="item" />
            </el-select><span style="float:left;padding:0 5px">分</span>
          </el-form-item>

          <div style="width:100%;height:300px;">
            <div style="width:100%;height:50px;">
              <div v-for="(item) in sevenDays" :key="item" style="width:14.2%;height:100%;float:left;line-height:50px;text-align:center;font-size:16px;font-weight:600"> 
                {{ item }} 
              </div>
            </div>
                
            <div style="width:14.2%;height:200px;float:left">
              <el-select v-model="form1.coachid" style="width:90%;margin-top:5px;margin-left:5px;" placeholder="教练">
                <el-option v-for="item in coachs" :key="item.userid" :label="item.name" :value="item.userid" />
              </el-select>
              <el-select v-model="form1.cid" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课程大类" @change="getCourseItem1(form1.cid,form1.strenth,0)">
                <el-option v-for="item in courseType" :key="item.cid" :label="item.catetitle" :value="item.mycid" />
              </el-select>
              <el-select v-model="form1.strenth" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="强度" @change="getCourseItem1(form1.cid,form1.strenth,0)"> 
                <el-option v-for="item in strenth" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="form1.sid" filterable style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课件">
                <el-option v-for="item in strenthNumberArr1" :key="item.mysid" :label="item.strengthnumber" :value="item.mysid" />
              </el-select>
            </div>
            <div style="width:14.2%;height:200px;float:left">
              <el-select v-model="form2.coachid" style="width:90%;margin-top:5px;margin-left:5px;" placeholder="教练">
                <el-option v-for="item in coachs" :key="item.userid" :label="item.name" :value="item.userid" />
              </el-select>
              <el-select v-model="form2.cid" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课程大类" @change="getCourseItem2(form2.cid,form2.strenth,0)">
                <el-option v-for="item in courseType" :key="item.cid" :label="item.catetitle" :value="item.mycid" />
              </el-select>
              <el-select v-model="form2.strenth" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="强度" @change="getCourseItem2(form2.cid,form2.strenth,0)"> 
                <el-option v-for="item in strenth" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="form2.sid" filterable style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课件">
                <el-option v-for="item in strenthNumberArr2" :key="item.mysid" :label="item.strengthnumber" :value="item.mysid" />
              </el-select>
            </div>
            <div style="width:14.2%;height:200px;float:left">
              <el-select v-model="form3.coachid" style="width:90%;margin-top:5px;margin-left:5px;" placeholder="教练">
                <el-option v-for="item in coachs" :key="item.userid" :label="item.name" :value="item.userid" />
              </el-select>
              <el-select v-model="form3.cid" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课程大类" @change="getCourseItem3(form3.cid,form3.strenth,0)">
                <el-option v-for="item in courseType" :key="item.cid" :label="item.catetitle" :value="item.mycid" />
              </el-select>
              <el-select v-model="form3.strenth" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="强度" @change="getCourseItem3(form3.cid,form3.strenth,0)"> 
                <el-option v-for="item in strenth" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="form3.sid" filterable style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课件">
                <el-option v-for="item in strenthNumberArr3" :key="item.mysid" :label="item.strengthnumber" :value="item.mysid" />
              </el-select>
            </div>
            <div style="width:14.2%;height:200px;float:left">
              <el-select v-model="form4.coachid" style="width:90%;margin-top:5px;margin-left:5px;" placeholder="教练">
                <el-option v-for="item in coachs" :key="item.userid" :label="item.name" :value="item.userid" />
              </el-select>
              <el-select v-model="form4.cid" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课程大类" @change="getCourseItem4(form4.cid,form4.strenth,0)">
                <el-option v-for="item in courseType" :key="item.cid" :label="item.catetitle" :value="item.mycid" />
              </el-select>
              <el-select v-model="form4.strenth" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="强度" @change="getCourseItem4(form4.cid,form4.strenth,0)"> 
                <el-option v-for="item in strenth" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="form4.sid" filterable style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课件">
                <el-option v-for="item in strenthNumberArr4" :key="item.mysid" :label="item.strengthnumber" :value="item.mysid" />
              </el-select>
            </div>
            <div style="width:14.2%;height:200px;float:left">
              <el-select v-model="form5.coachid" style="width:90%;margin-top:5px;margin-left:5px;" placeholder="教练">
                <el-option v-for="item in coachs" :key="item.userid" :label="item.name" :value="item.userid" />
              </el-select>
              <el-select v-model="form5.cid" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课程大类" @change="getCourseItem5(form5.cid,form5.strenth,0)">
                <el-option v-for="item in courseType" :key="item.cid" :label="item.catetitle" :value="item.mycid" />
              </el-select>
              <el-select v-model="form5.strenth" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="强度" @change="getCourseItem5(form5.cid,form5.strenth,0)"> 
                <el-option v-for="item in strenth" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="form5.sid" filterable style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课件">
                <el-option v-for="item in strenthNumberArr5" :key="item.mysid" :label="item.strengthnumber" :value="item.mysid" />
              </el-select>
            </div>
            <div style="width:14.2%;height:200px;float:left">
              <el-select v-model="form6.coachid" style="width:90%;margin-top:5px;margin-left:5px;" placeholder="教练">
                <el-option v-for="item in coachs" :key="item.userid" :label="item.name" :value="item.userid" />
              </el-select>
              <el-select v-model="form6.cid" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课程大类" @change="getCourseItem6(form6.cid,form6.strenth,0)">
                <el-option v-for="item in courseType" :key="item.cid" :label="item.catetitle" :value="item.mycid" />
              </el-select>
              <el-select v-model="form6.strenth" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="强度" @change="getCourseItem6(form6.cid,form6.strenth,0)"> 
                <el-option v-for="item in strenth" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="form6.sid" filterable style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课件">
                <el-option v-for="item in strenthNumberArr6" :key="item.mysid" :label="item.strengthnumber" :value="item.mysid" />
              </el-select>
            </div>
            <div style="width:14.2%;height:200px;float:left">
              <el-select v-model="form7.coachid" style="width:90%;margin-top:5px;margin-left:5px;" placeholder="教练">
                <el-option v-for="item in coachs" :key="item.userid" :label="item.name" :value="item.userid" />
              </el-select>
              <el-select v-model="form7.cid" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课程大类" @change="getCourseItem7(form7.cid,form7.strenth,0)">
                <el-option v-for="item in courseType" :key="item.cid" :label="item.catetitle" :value="item.mycid" />
              </el-select>
              <el-select v-model="form7.strenth" style="width:90%;margin-top:10px;margin-left:5px;" placeholder="强度" @change="getCourseItem7(form7.cid,form7.strenth,0)"> 
                <el-option v-for="item in strenth" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="form7.sid" filterable style="width:90%;margin-top:10px;margin-left:5px;" placeholder="课件">   
                <el-option v-for="item in strenthNumberArr7" :key="item.mysid" :label="item.strengthnumber" :value="item.mysid" />  
              </el-select>
            </div>
          </div>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="toFalse()">取 消</el-button>
          <el-button type="primary" @click="toTrue()">确 定</el-button>
        </div>
      </el-dialog>


      <br>
      <el-button style="margin-top:15px;float:left" @click="preWeek()">上周</el-button>
      <el-button style="margin-top:15px;margin-bottom:10px;float:left;margin-left:20px" @click="nextWeek()">下周</el-button>
      <div style="clear:both" />

      <el-calendar :range="dateRange" style="text-align:center;height:1050px!important">
        <template
          slot="dateCell"
          slot-scope="{date, data}"
          style="text-align:center;"
        >
          <p :class="data.isSelected ? 'is-selected' : ''" style="text-align:center">
            {{ data.day }}
          </p>
          <div v-for="(item,index) in list" :key="index" style="width:98%;margin:0 auto;text-align:left">
            <div v-if="data.day==item.scheduledate" @click="tkUrl(item)">
              <div v-if="item.coursename.substring(0, item.coursename.indexOf('_'))=='Game Day'" style="height:120px;font-size:13px;color:white;padding:12px;border-radius:5px;margin-bottom:5px" class="GameDay">
                <span style="display:block">{{ item.schedulebegin }}-{{ item.scheduleend }}</span><br>
                <span style="padding-bottom:5px">{{ item.coursename }}</span><br>
                <span style="padding-bottom:5px">{{ item.coachname }}</span><br>
                <span style="padding-bottom:5px">约{{ item.yyrs }}/{{ item.reservablenumber }}</span><br>
                <span style="padding-bottom:5px">到{{ item.signednumber }}</span>
              </div>
              <div v-else :class="item.coursename.substring(0, item.coursename.indexOf('_'))" style="height:120px;font-size:13px;color:white;padding:12px;border-radius:5px;margin-bottom:5px">
                <span style="display:block">{{ item.schedulebegin }}-{{ item.scheduleend }}</span><br>
                <span style="padding-bottom:5px">{{ item.coursename }}</span><br>
                <span style="padding-bottom:5px">{{ item.coachname }}</span><br>
                <span style="padding-bottom:5px">约{{ item.yyrs }}/{{ item.reservablenumber }}</span><br>
                <span style="padding-bottom:5px">到{{ item.signednumber }}</span>
              </div>
            </div>
          </div>
        
        </template>
      </el-calendar>
    </div>
  </div>
    
</template>

<script>
import { date } from 'jszip/lib/defaults'

export default {
    data() {
        return {
            dateRange:[],
            sevenDays:[],
            preDay:'',
            nexDay:'',
            allStores:[],
            allCoach:[],
            storeid:'',
            coachid:'A',
            list:[],
            dialogFormVisible:false,
            formLabelWidth:'120px',
            startHourse:['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
            startMinute:['00', '05', '15', '30', '45'],
            stores:[],
            coachs:[],
            courseType:[],
            strenth:[{label:1, value:1}, {label:2, value:2}, {label:3, value:3}],
            teamCourse:[],
            putForm:[],
            form:{storeid:'', hourse:'', minutes:''},
            formList:[],
            form1:{
                storeid:'',
                coachid:'',
                cid:'',
                strenth:'',
                sid:''
            },
            form2:{},
            form3:{},
            form4:{},
            form5:{},
            form6:{},
            form7:{},
            
            strenthNumberArr1:[],
            strenthNumberArr2:[],
            strenthNumberArr3:[],
            strenthNumberArr4:[],
            strenthNumberArr5:[],
            strenthNumberArr6:[],
            strenthNumberArr7:[]

        }
    },
    created(){ 
        this.getAllStore()
        this.getWeek(Date.parse(new Date()))
        this.getAllCoach()
        // this.getStartCources()
        this.getAllCoachs()
        this.getAllCourse();//获取课程大类
    },
    methods:{
        tkUrl(e){
          console.log(e)
            this.$router.push({
                path:'/afcbdkcgl/tkkcxx',
                query: {
                    item: e
                }
            })
        },
        getWeek(currentDay) {
            var currentDate = new Date(currentDay)
            var timesStamp = currentDate.getTime();
            var currenDay = currentDate.getDay();
            var dates = [];
            for (var i = 0; i < 7; i++) {
                dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-'));
            }
            this.preDay=new Date(new Date(dates[0]).getTime() - 24 * 60 * 60 * 1000).toLocaleDateString().replace(/\//g, '-')
            // console.log('pre:  '+this.preDay)
            this.nexDay=new Date(new Date(dates[6]).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString().replace(/\//g, '-')
            // console.log('nex:  '+this.nexDay)
            this.dateRange=[]
            this.dateRange.push(dates[0])
            this.dateRange.push(dates[6])
            // console.log(this.dateRange)
            this.sevenDays=dates
            // console.log(this.sevenDays)
        },
        preWeek(){
            this.getWeek(this.preDay)
            this.getCources()
        },
        nextWeek(){
            this.getWeek(this.nexDay)
            this.getCources()
        },
        getAllStore(){
          var loginname=localStorage.getItem('username')
          var roleid=localStorage.getItem('roleid')
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            if(loginname!=null&&(loginname=='系统管理员'||roleid.search('2018053014055110006') !=-1||roleid.search('2018053014114510000') !=-1||roleid.search('2018053014052310002') !=-1)){
             this.allStores=res.data.rows
             this.storeid=this.allStores[0].id
            }else{
                var userStore=localStorage.getItem('storeid').split(',')
                var storeArr=res.data.rows
                userStore.forEach(item1=>{
                  storeArr.forEach(item => {
                        if(item1==item.id){
                          this.allStores.push(item)
                      }
                    })
                })
                this.storeid=this.allStores[0].id
            }
           this.getCources()
            // console.log(this.allStores)
            // setTimeout(this.getAllCourse(),1000)
          });
        },
        getAllCoach(){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW860', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                var obj={userid:'A', name:'全部教练'}
                this.allCoach=res.data.rows
                this.allCoach.unshift(obj)
            });
        },
        getAllCoachs(){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW860', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.coachs=res.data.rows
            });
        },
        getCources(){
            var data={}
            data.day1=this.dateRange[0]
            data.day2=this.dateRange[1]
            data.storeid=this.storeid
            data.coachid=this.coachid
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG20MJ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.list=res.data.rows
                // console.log(this.list)
            });
        },
        getStartCources(){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                var data={}
                data.day1=this.dateRange[0]
                data.day2=this.dateRange[1]
                data.storeid=res.data.rows[0].id
                data.coachid=this.coachid
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG20MJ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.list=res.data.rows
                    // console.log(this.list)
                });
            })
        },
        getAllCourse(){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVCN9', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.courseType=res.data.rows
            });
        },
        toClickSearch(){
            this.getCources()
        },
        toClickPre(){
            this.preWeek()
            this.getCources()
        },
        toClickNext(){
            this.nextWeek()
            this.getCources()
        },
        toOpen(){
            this.dialogFormVisible=true
        },
        getCourseItem1(cid, strenth, index){
            console.log('cid:'+cid+'strenth:'+strenth+'index'+index)
            var data={}
            data.cid=cid
            data.strenth=strenth
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2548', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.strenthNumberArr1=res.data.rows
            });
        },
        getCourseItem2(cid, strenth, index){
            console.log('cid:'+cid+'strenth:'+strenth+'index'+index)
            var data={}
            data.cid=cid
            data.strenth=strenth
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2548', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.strenthNumberArr2=res.data.rows
            });
        },
        getCourseItem3(cid, strenth, index){
            console.log('cid:'+cid+'strenth:'+strenth+'index'+index)
            var data={}
            data.cid=cid
            data.strenth=strenth
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2548', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.strenthNumberArr3=res.data.rows
            });
        },
        getCourseItem4(cid, strenth, index){
            console.log('cid:'+cid+'strenth:'+strenth+'index'+index)
            var data={}
            data.cid=cid
            data.strenth=strenth
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2548', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.strenthNumberArr4=res.data.rows
            });
        },
        getCourseItem5(cid, strenth, index){
            console.log('cid:'+cid+'strenth:'+strenth+'index'+index)
            var data={}
            data.cid=cid
            data.strenth=strenth
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2548', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.strenthNumberArr5=res.data.rows
            });
        },
        getCourseItem6(cid, strenth, index){
            console.log('cid:'+cid+'strenth:'+strenth+'index'+index)
            var data={}
            data.cid=cid
            data.strenth=strenth
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2548', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.strenthNumberArr6=res.data.rows
            });
        },
        getCourseItem7(cid, strenth, index){
            console.log('cid:'+cid+'strenth:'+strenth+'index'+index)
            var data={}
            data.cid=cid
            data.strenth=strenth
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2548', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.strenthNumberArr7=res.data.rows
            });
        },
        getCourseBase(cid, sid){
            var data={}
            data.cid=cid
            data.sid=sid
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG254G', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            });
        },
        toFalse(){
            this.dialogFormVisible=false
            this.form={}
            this.form1={}
            this.form2={}
            this.form3={}
            this.form4={}
            this.form5={}
            this.form6={}
            this.form7={}
        },
        toTrue(){
            this.formList=[]
            // console.log(this.form1)
            this.formList.push(this.form1)
            this.formList.push(this.form2)
            this.formList.push(this.form3)
            this.formList.push(this.form4)
            this.formList.push(this.form5)
            this.formList.push(this.form6)
            this.formList.push(this.form7)
            console.log(this.form)
            if(this.form.storeid==''||this.form.hourse==''||this.form.minutes==''){
                alert('请检查未填信息')
            }else{
                this.formList.forEach((item, index)=>{
                    item.scheduledate=this.sevenDays[index]
                    item.storeid=this.form.storeid
                    item.schedulebegin=this.form.hourse+':'+this.form.minutes
                    item.scheduleend=this.form.hourse+':'+this.form.minutes
                    item.courseid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
                    //wxd管理员
                    item.createdby='系统管理员'
                    item.createdname='系统管理员'
                    item.lastedby='系统管理员'
                    item.lastedname='系统管理员'
                    // courseType
                    this.courseType.forEach((item1)=>{
                        if(item.cid==item1.mycid){
                            item.reservablenumber=item1.reservablenumber
                            item.minpeople=item1.minpeople
                            item.catetitle=item1.catetitle
                            item.courseduration=item1.courseduration
                        }
                    })
                    this.allStores.forEach((item2)=>{
                        if(item.storeid==item2.id){
                            item.storename=item2.name
                        }
                    })
                    this.coachs.forEach((item3)=>{
                        if(item.coachid==item3.userid){
                            item.coachname=item3.name
                        }
                    })
                    if(index==0){
                        this.strenthNumberArr1.forEach((item11)=>{
                            if(item.sid==item11.mysid){
                                item.strengthnumber=item11.strengthnumber
                                item.coursename=item.catetitle+'_'+item.strengthnumber
                            }
                        })
                    }else if(index==1){
                        this.strenthNumberArr2.forEach((item22)=>{
                            if(item.sid==item22.mysid){
                                item.strengthnumber=item22.strengthnumber
                                item.coursename=item.catetitle+'_'+item.strengthnumber
                            }
                        })
                    }else if(index==2){
                        this.strenthNumberArr3.forEach((item33)=>{
                            if(item.sid==item33.mysid){
                                item.strengthnumber=item33.strengthnumber
                                item.coursename=item.catetitle+'_'+item.strengthnumber
                            }
                        })
                    }else if(index==3){
                        this.strenthNumberArr4.forEach((item44)=>{
                            if(item.sid==item44.mysid){
                                item.strengthnumber=item44.strengthnumber
                                item.coursename=item.catetitle+'_'+item.strengthnumber
                            }
                        })
                    }else if(index==4){
                        this.strenthNumberArr5.forEach((item55)=>{
                            if(item.sid==item55.mysid){
                                item.strengthnumber=item55.strengthnumber
                                item.coursename=item.catetitle+'_'+item.strengthnumber
                            }
                        })
                    }else if(index==5){
                        this.strenthNumberArr6.forEach((item66)=>{
                            if(item.sid==item66.mysid){
                                item.strengthnumber=item66.strengthnumber
                                item.coursename=item.catetitle+'_'+item.strengthnumber
                            }
                        })
                    }else if(index==6){
                        this.strenthNumberArr7.forEach((item77)=>{
                            if(item.sid==item77.mysid){
                                item.strengthnumber=item77.strengthnumber
                                item.coursename=item.catetitle+'_'+item.strengthnumber
                            }
                        })
                    }

                    if(item.coachid==''||item.coachid==undefined||item.cid==''||item.cid==undefined||item.sid==''||item.sid==undefined||item.strenth==''||item.strenth==undefined){
                        
                    }else{
                        this.addTeamCourse(item)
                    }
                })
                // console.log(this.formList)
            }
        },
        //团课排课
        addTeamCourse(e){
            this.dialogFormVisible=false
            var data=e
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVHDX', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.$message({
                    message: '恭喜你，操作成功',
                    type: 'success' 
                    })
                }).catch(error=>{
                    this.$message.error('错了哦，这是一条错误消息');
            });
        }
    }
}
</script>

<style>
    
    .current{
        height: 950px!important;
    }
    .Activity{
        background: #7271d5;
    }
    .Burning{
      background:#59abf8;
    }
    .私教{
      background:#7271d5;
    }
    .Sprint{
      background:#82c3db;
    }
    .Recovery{
       background:#d7699b;
    }
    .VIPR{
      background:#82c3db;
    }
    .Ultmate{
      background:#7271d5;
    }
    .Kick-boxing{
      background:#7271d5;
    }
    .BOOM{
       background:#82c3db;
    }
    .FMT运动评估{
       background:#7271d5;
    }
    .power{
       background:#82c3db;
    }
    .KB现代壶铃{
       background:#82c3db;
    }
    .Movement{
       background: #9277d3;
    }
    .aa{
       background:#82c3db;
    }
    .Warm{
       background:#82c3db;
    }
    .GameDay{
       background:#82c3db;
    }
    .Team{
       background:#82c3db;
    }
</style>
