<template>
  <div class="container" style="padding:15px">
    <div>
      <el-button v-for="(item,index) in theAllstores" :key="index" v-model="storeid" @click="storeSearch(item.id)">{{ item.name }}</el-button>
    </div>
    <el-date-picker
      v-model="date1"
      style="margin-top: 20px;width:280px"
      type="daterange"
      range-separator=""
      start-placeholder="起始时间"
      end-placeholder="结束时间"
      @change="datechange"
    />

    <el-button type="success" style="margin-left:20px" @click="getAll">查 询</el-button>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="营收分析" style="padding-top:25px;padding-left:50px">
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">课程营收总金额(元)</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ courserevenuetotal1.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">新单金额(元)</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ courserevenuetotal2.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">续费金额(元)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ courserevenuetotal3.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">团课单节平均价（次卡）</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ AveragePrice.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">私教单节平均价（次卡）</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ AveragePrice2.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">次卡销课总金额(元)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ money.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">团课次卡消课金额(元)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ money2.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">私教次卡消课金额(元)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ money3.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">平均客单价(元)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ AveragePrice4.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">团课平均销课单价(元)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ AveragePrice5.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">私教平均销课单价(元)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ AveragePrice6.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">团课单节平均价(元)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ AverageUnitPrice.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">私教单节平均价(元)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ AverageUnitPrice2.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">商品总金额(元)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ money4.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">客单价(元)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ CustomerPrice.toFixed(2) }}</span>
        </div>
        <div style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">商品售出总数(件)</span><br>
          <div style="height:18px" />
          <span style="font-size:18px;">{{ goodsnumber }}</span>
        </div>
                
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="销课分析" style="padding-top:25px;padding-left:50px">
        <div v-for="(item,index) in xklist" :key="index" style="width:220px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">{{ item.type }}</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ item.count }}</span>
        </div>

        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">团课总上座率</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ zszl }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">团课体验课转化率</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ tktyzhl }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">私教体验课转化率</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ sjtyzhl }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">团课消课节数</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ tkxknumber }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">私教消课节数</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ sjxknumber }}</span>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-tabs type="border-card" style="margin-top:25px">
      <el-tab-pane label="会员分析" style="padding-top:20px;padding-left:50px">
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">沉睡客户量</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ peoples[0].number }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">潜在客户量</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ peoples[1].potentialCustomersNumber }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">潜在体验客户量</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ peoples[2].onlyIsFreenumber }}</span>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-tabs type="border-card" style="margin-top:25px">
      <el-tab-pane label="流量分析" style="padding-top:20px;padding-left:50px">
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">总转化率</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ liuliang[0].总转化率 }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">计算转化率</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ liuliang[0].计算转化率 }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">自然流量转化率</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ liuliang[0].自然流量转化率 }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">线上流量转化率</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ liuliang[0].线上流量转化率 }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">老带新转化率</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ liuliang[0].老带新转化率 }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">到访转化率</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ liuliang[0].到访转化率 }}</span>
        </div>
        <div style="width:210px;height:100px;text-align:left;float:left;padding-bottom:25px">
          <span style="font-size:15px;font-weight:500;">拉访转化率</span><br>
          <div style="height:15px" />
          <span style="font-size:18px;">{{ liuliang[0].拉访转化率 }}</span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
    
</template>

<script>
export default {
    data(){
        return{ 
            theAllstores:[],
            date1:'',
            storeid:'',
            
            courserevenuetotal1:'',
            courserevenuetotal2:'',
            courserevenuetotal3:'',
            AveragePrice:'',
            AveragePrice2:'',
            money:'',
            money2:'',
            money3:'',
            AveragePrice4:'',
            AveragePrice5:'',
            AveragePrice6:'',
            AverageUnitPrice:'',
            AverageUnitPrice2:'',
            money4:'',
            CustomerPrice:'',
            CustomerPrice:'',
            goodsnumber:'',

            xklist:[],
            peoples:[],
            liuliang:[],

            zszl:'',
            tktyzhl:'',
            sjtyzhl:'',
            tkxknumber:'',
            sjxknumber:''

        }
    },
    created(){
        this.date1=['', '']
        var TimeNow = new Date();
        this.date1[0] = new Date(TimeNow.getFullYear(), TimeNow.getMonth(), 1).toLocaleDateString().replace(/\//g, '-')
        this.date1[1] = new Date().toLocaleDateString().replace(/\//g, '-')
        this.getAllStore2()
        this.getAll()
    },
    mounted() {
        
    },
    methods:{
       
        datechange(){
            this.date1[0] = this.date1[0].toLocaleDateString().replace(/\//g, '-')
            this.date1[1] = this.date1[1].toLocaleDateString().replace(/\//g, '-')
            // console.log(this.date1)
        },
         getAllStore2(){
            if(localStorage.getItem('username')=='系统管理员'){
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.theAllstores=res.data.rows
                    var obj={}
                    obj.id=''
                    obj.name='全部运动馆'
                    this.theAllstores.unshift(obj)
                })
            }else if(localStorage.getItem('storenumber')==localStorage.getItem('storeid').split(',').length-1){
                this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.theAllstores=res.data.rows
                    var obj={}
                    obj.id=''
                    obj.name='全部运动馆'
                    this.theAllstores.unshift(obj)
                })
            }else{
                this.storeid=localStorage.getItem('storeid').split(',')[0]
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
                    this.theAllstores=mystore
                    this.storeid=this.theAllstores[0].id
                })
            }    
        },
        allStoreSearch(){
            this.storeid=''
            this.getAll()
        },
        storeSearch(e){
            this.storeid=e
            this.getAll()
        },
        async getAll(){
            this.kcyszje()
            this.xdje()
            this.xfje()
            this.xfje()
            this.tkdjpjjck()
            this.sjdjpjjck()
            this.ckxkzje()
            this.tkckxkje()
            this.sjckxkje()
            this.pjkdj()
            this.tkpjxkdj()
            this.sjpjxkdj()
            this.tkdjpjj()
            this.sjdjpjj()
            this.sjdjpjj()
            this.spzje()
            this.kdj()
            this.spsczs()
             this.xkgl()
            this.llfx()
            this.hyfx()
            
            this.tkzszl()
            this.tktykzhl()
            this.sjtykzhl()
            this.tkxkjs()
            this.sjxkjs()
        },
        tkzszl(){//团课总上座率
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CCourse/getTotalAttendance', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.zszl=res.data.TotalAttendance
                // console.log(res)
            });
        },

        tktykzhl(){//团课体验课转化率
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CCourse/getTConversionRateOfGroupLessons', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.tktyzhl=res.data.ConversionRateOfGroupLessons
                // console.log(res.data)
            });
        },

        sjtykzhl(){//私教体验课转化率
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CCourse/getPConversionRateOfGroupLessons', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.sjtyzhl=res.data.ConversionRateOfGroupLessons
                // console.log(res.data)
            });
        },
        tkxkjs(){//团课销课节数
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CCourse/getNumberOfLessonsGroupLessons', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.tkxknumber=res.data.Tnumber
                // console.log(res.data)
            });
        },
        sjxkjs(){//私教销课节数
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CCourse/getNumberOfPrivateLessons', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.sjxknumber=res.data.Tnumber
                // console.log(res)
            });
        },

        xkgl(){//销课管理
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/activeManagement', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.xklist=res.data
                // console.log(res.data)
            });
        },
        kcyszje(){//课程营收总金额
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getCourseRevenuetotal', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.courserevenuetotal1=res.data.courserevenuetotal
            });
        },
        xdje(){//新单金额
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getCourseRevenueTotalFirst', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.courserevenuetotal2=res.data.courserevenuetotal
            });
        },
        xfje(){//续费金额
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getCourseRevenueTotalContinue', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.courserevenuetotal3=res.data.courserevenuetotal
                // console.log(res)
            });
        },
        tkdjpjjck(){//团课单节平均价（次卡）
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getAveragePriceSingleGroupLesson', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.AveragePrice=res.data.AveragePrice
                // console.log(res)
            });
        },
        sjdjpjjck(){//私教单节平均价（次卡）
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getPrivateEducationSingleSectionAveragePrice', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.AveragePrice2=res.data.AveragePrice
                // console.log(res)
                // console.log(res.data.AverageUnitPrice)
            });
        },
        ckxkzje(){//次卡销课总金额
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getSubcardMoney', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.money=res.data.money
                // console.log(res)
            });
        },
        tkckxkje(){//团课次卡消课金额
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getTeamSubcardMoney', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.money2=res.data.money
            });
        },
        sjckxkje(){//私教次卡消课金额
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getPrivateTeamSubcardMoney', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.money3=res.data.money
            });
        },
        pjkdj(){//平均客单价
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getAverageunit', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.AveragePrice4=res.data.AveragePrice
            });
        },
        tkpjxkdj(){//团课平均销课单价
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getGroupAverageUnitPrice', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.AveragePrice5=res.data.AveragePrice
            });
        },
        sjpjxkdj(){//私教平均销课单价
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getPrivateAverageUnitPrice', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.AveragePrice6=res.data.AverageUnitPrice
                // console.log(res)
            });
        },
        tkdjpjj(){//团课单节平均价
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getGroupAveragePriceUnit', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.AverageUnitPrice=res.data.AverageUnitPrice
            });
        },
        sjdjpjj(){//私教单节平均价
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getPrivateAveragePriceUnit', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.AverageUnitPrice2=res.data.AverageUnitPrice
            });
        },
        spzje(){//商品总金额
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getTotalAmountofGoods', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.money4=res.data.money
            });
        },
        kdj(){//客单价
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getCustomerPrice', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.CustomerPrice=res.data.CustomerPrice
            });
        },
        spsczs(){//商品售出总数
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/web/CRevenue/getGoodsnumber', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.goodsnumber=res.data.goodsnumber
            });
        },
        hyfx(){//会员分析
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/documentaryManagement', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                // console.log(res.data)
                this.peoples=res.data
                // console.log(this.peoples)
            });
        },
        llfx(){//流量分析
            var data={}
            data.storeid=this.storeid
            data.CourseDatestart=this.date1[0]
            data.CourseDateend =this.date1[1]
            this.$axios.post('https://www.facebodyfitness.com/transformationManagement', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                // console.log(res.data)
                // console.log(JSON.parse(res.data))
                this.liuliang=res.data
            });
        }
    }
}
</script>

<style scoped>
    
</style>
