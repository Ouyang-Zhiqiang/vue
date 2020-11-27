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
      <el-dialog title="私教排课" :visible.sync="dialogFormVisible" style="width:1600px;margin:0 auto">
        <el-form :model="form">
            
          <el-form-item label="选择运动馆" :label-width="formLabelWidth" required>
            <el-select v-model="form.storeid" style="width:200px;float:left">
              <el-option v-for="item in allStores" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
            
          <el-form-item label="选择课程" :label-width="formLabelWidth" required>
            <el-select v-model="form.courseid" style="width:200px;float:left">
              <el-option v-for="item in allCourse" :key="item.mycourseid" :label="item.coursename" :value="item.mycourseid" />
            </el-select>
          </el-form-item>

          <el-form-item label="上课日期" :label-width="formLabelWidth" required>
            <el-date-picker
              v-model="form.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>

          <el-form-item label="上课开始时间" :label-width="formLabelWidth" required>
            <el-select v-model="form.hourse" style="width:100px;float:left">
              <el-option v-for="item in startHourse" :key="item" :label="item" :value="item" />
            </el-select><span style="float:left;padding:0 5px">点</span>
            <el-select v-model="form.minutes" style="width:100px;float:left">
              <el-option v-for="item in startMinute" :key="item" :label="item" :value="item" />
            </el-select><span style="float:left;padding:0 5px">分</span>
          </el-form-item>

          <el-form-item label="上课结束时间" :label-width="formLabelWidth" required>
            <el-select v-model="form.hourse1" style="width:100px;float:left">
              <el-option v-for="item in startHourse" :key="item" :label="item" :value="item" />
            </el-select><span style="float:left;padding:0 5px">点</span>
            <el-select v-model="form.minutes1" style="width:100px;float:left">
              <el-option v-for="item in startMinute" :key="item" :label="item" :value="item" />
            </el-select><span style="float:left;padding:0 5px">分</span>
          </el-form-item>

          <el-form-item label="约课间隔时间" :label-width="formLabelWidth" required>
            <template>
              <el-radio v-model="form.intervaltime" label="15">15分钟</el-radio>
              <el-radio v-model="form.intervaltime" label="30">30分钟</el-radio>
              <el-radio v-model="form.intervaltime" label="60">60分钟</el-radio>
            </template>
          </el-form-item>
            
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

      <el-calendar :range="dateRange" style="text-align:center;height:800px!important">
        <template
          slot="dateCell"
          slot-scope="{date, data}"
          style="text-align:center;"
        >
          <p :class="data.isSelected ? 'is-selected' : ''" style="text-align:center">
            {{ data.day }}
          </p>
          <div v-for="(item,index) in list" :key="index" style="width:98%;margin:0 auto;text-align:left">
            <div v-if="data.day==item.scheduledate" @click="sjUrl(item)"  style="height:95px;background:#16a951;font-size:13px;color:white;padding:12px;border-radius:5px;margin-bottom:5px">
              <span style="display:block">{{ item.schedulebegin }}-{{ item.scheduleend }}</span><br>
              <span style="padding-bottom:5px">{{ item.coursename }}</span><br><br>
              <span style="padding-bottom:5px">{{ item.reservednumber }}/{{ item.reservednumber }}</span><br>
            </div>
          </div>
        
        </template>
      </el-calendar>
    </div>
  </div>
    
</template>

<script>

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
            coachid:'',
            list:[],
            form:{
                intervaltime:'15'
            },
            allCourse:[],
            startHourse:['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
            startMinute:['00', '15', '30', '45'],
            formLabelWidth:'150px',
            dialogFormVisible:false,
            allDate:[]
        }
    },
    created(){
        this.getWeek(Date.parse(new Date()))
        this.getAllStore()
        this.getAllCoach()
        this.getStartCources()
        this.getPreCourse()
    },
    methods:{
        sjUrl(e){
            this.$router.push({
                path:'/afcbdkcgl/sjkcxx',
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
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.allStores=res.data.rows
            this.storeid=this.allStores[0].id
            // console.log("this.allStores"+this.allStores)
          });
        },
        getAllCoach(){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW860', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                var obj={userid:'A', name:'全部教练'}
                this.allCoach=res.data.rows
                this.allCoach.unshift(obj)
            });
        },
        getCources(){
            var data={}
            data.CourseDatestart=this.dateRange[0]
            data.CourseDateend=this.dateRange[1]
            data.storeid=this.storeid
            data.coachid=this.coachid
            this.$axios.post('https://www.facebodyfitness.com/web/CCourse/privatelessonschedule', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.list=res.data
            });
        },
        getStartCources(){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                var data={}
                data.CourseDatestart=this.dateRange[0]
                data.CourseDateend=this.dateRange[1]
                data.storeid=res.data.rows[0].id
                data.coachid=this.coachid
                this.$axios.post('https://www.facebodyfitness.com/web/CCourse/privatelessonschedule', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    console.log(res.data)
                    this.list=res.data
                });
            })
        },
        getDate(datestr){
            var temp = datestr.split("-");
            var date = new Date(temp[0], temp[1]-1, temp[2]);
            console.log(date);
            return date;
        },
        getAllDate(start, end){
            this.allDate=[]
            var startTime = this.getDate(start);
            var endTime = this.getDate(end)
            var i=0
             while((endTime.getTime()-startTime.getTime())>=0){
                var year = startTime.getFullYear();
                var month = (startTime.getMonth()+1).toString().length==1?"0"+(startTime.getMonth()+1).toString():(startTime.getMonth()+1).toString();
                var day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
                this.allDate[i]=year+"-"+month+"-"+day;
                startTime.setDate(startTime.getDate()+1);
                i+=1;
             }
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
        getPreCourse(){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2AR4', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.allCourse=res.data.rows
            });
        },
        toOpen(){
            this.dialogFormVisible=true
        },
        toFalse(){
            this.dialogFormVisible=false
        },
        //wxd系统管理员
        toTrue(){
            // console.log(this.form)
            if(this.form.storeid==''||this.form.storeid==undefined||this.form.courseid==''||this.form.courseid==undefined||this.form.hourse==''||this.form.hourse==undefined||this.form.minutes==''||this.form.minutes==undefined||this.form.hourse1==''||this.form.hourse1==undefined||this.form.minutes1==''||this.form.minutes1==undefined||this.form.dateRange==''||this.form.dateRange==undefined){
                alert('检测有未填信息！')
            }else{
                this.getAllDate(new Date(new Date(this.form.dateRange[0]).getTime()).toLocaleDateString().replace(/\//g, '-'), new Date(new Date(this.form.dateRange[1]).getTime()).toLocaleDateString().replace(/\//g, '-'))
                this.allDate.forEach((item)=>{
                    var obj={}
                    this.allStores.forEach((item1)=>{
                        if(this.form.storeid==item1.id){
                            obj.storename=item1.name
                            console.log("item1.name"+item1.name)
                        }
                    })
                    this.allCourse.forEach((item2)=>{
                        if(this.form.courseid==item2.mycourseid){
                            obj.coursename=item2.coursename
                            obj.reservablenumber=item2.reservablenumber
                        }
                    })
                    obj.storeid=this.form.storeid
                    obj.courseid=this.form.courseid
                    obj.scheduledate=item
                    var begin=this.form.hourse+":"+this.form.minutes+":00"
                    obj.schedulebegin=begin
                    var end=this.form.hourse1+":"+this.form.minutes1+":00"
                    obj.scheduleend=end
                    obj.intervaltime=this.form.intervaltime
                    var userid=localStorage.getItem('userid')
                    var username=localStorage.getItem('username')
                    obj.lastedby=userid
                    obj.lastedname=username
                    obj.createdby=userid
                    obj.createdname=username
                    // console.log(obj)
                     console.log("data------"+ localStorage.getItem('resurl'))
                    this.insertPreCourse(obj)
                })
            }  
           
        },
        insertPreCourse(data){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2B8E', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
             this.$message({
                    message: '恭喜你，操作成功',
                    type: 'success' 
                    })
                    this.dialogFormVisible=false
                }).catch(error=>{
                    this.$message.error('错了哦，这是一条错误消息');
            });
        }

    }
}
</script>

<style>   
    .current{
        height: 660px!important;
    }
</style>
