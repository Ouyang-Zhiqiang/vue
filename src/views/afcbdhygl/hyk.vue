<template>
  <div id="container" style="padding:15px">
    <el-button>全部运动馆</el-button>
    <el-button>万达馆</el-button>
    <el-button>东鼎馆</el-button>
    <el-button>泗泾馆</el-button>
    <el-button>开元馆</el-button>
    <el-button>亚繁馆</el-button>
    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="会员卡次数">
        <el-button>近7天</el-button>
        <el-button>近15天</el-button>
        <el-button>近30天</el-button>
        <el-date-picker
          v-model="datevalue1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <div id="tab1-1" style="width:1500px;height:300px;margin-top:20px" />
      </el-tab-pane>

      <el-tab-pane label="期卡次卡">
        <div id="tab1-2" style="width:1500px;height:300px;margin-top:20px" />
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="会员卡种类列表">
                
               
        <el-select v-model="searhForm.cardtype" placeholder="会员卡类型" style="margin-top:5px;">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select v-model="searhForm.isonlinebuy" placeholder="在线购买" style="margin-top:5px;">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select v-model="searhForm.state" placeholder="状态" style="margin-top:5px;">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-input v-model="searhForm.cardname" placeholder="会员卡名称" style="width:180px;margin-top:5px;" />

        <el-button type="success" style="margin-top:5px;" @click="toClickSearch">查询</el-button>
        <el-button type="success" style="margin-top:5px;">导出Excel</el-button>
        <el-button type="success" style="margin-top:5px;" @click="toOpen">新建会员卡</el-button>
        <el-dialog title="新增会员卡" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
          <el-form :model="insertForm">
            <el-form-item label="图片" :label-width="formLabelWidth" required>
              <el-upload
                action="https://www.facebodyfitness.com/uploadimg"
                name="upload_file"
                list-type="picture-card"
                :on-success="handleSuccess"
                style="float:left"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </el-form-item>
            <el-form-item label="会员卡名称" :label-width="formLabelWidth" required>
              <el-input v-model="insertForm.cardname" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="支持运动馆" :label-width="formLabelWidth" required>
              <el-checkbox-group v-model="insertForm.storeids">
                <el-checkbox v-for="item in allStores" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="会员卡类型" :label-width="formLabelWidth" required>
              <el-radio v-model="insertForm.cardtype" label="S" style="float:left;margin-top:10px;margin-left:5px">次卡</el-radio>
              <el-radio v-model="insertForm.cardtype" label="P" style="float:left;margin-top:10px;">期卡</el-radio>
            </el-form-item>
            <el-form-item label="设置梯度" :label-width="formLabelWidth">
              <!-- <el-select v-model="insertForm.xsid"  style="width:270px;float:left">
                <el-option v-for="item in insertXsList" :key="item.userid" :label="item.name" :value="item.userid"></el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="转让设置" :label-width="formLabelWidth">
              <el-radio v-model="insertForm.istransfer" label="0" style="float:left;margin-top:10px;margin-left:5px">支持</el-radio>
              <el-radio v-model="insertForm.istransfer" label="1" style="float:left;margin-top:10px;">不支持</el-radio>
            </el-form-item>
            <el-form-item label="是否支持多人共用" :label-width="formLabelWidth">
              <el-radio v-model="insertForm.ismulmem" label="0" style="float:left;margin-top:10px;margin-left:5px">支持</el-radio>
              <el-radio v-model="insertForm.ismulmem" label="1" style="float:left;margin-top:10px;">不支持</el-radio>
            </el-form-item>
            <el-form-item label="在线购买" :label-width="formLabelWidth">
              <el-radio v-model="insertForm.isonlinebuy" label="0" style="float:left;margin-top:10px;margin-left:5px">支持</el-radio>
              <el-radio v-model="insertForm.isonlinebuy" label="1" style="float:left;margin-top:10px;">不支持</el-radio>
            </el-form-item>
            <el-form-item label="从第一节课算开卡" :label-width="formLabelWidth">
              <el-radio v-model="insertForm.isopenedbyfirst" label="0" style="float:left;margin-top:10px;margin-left:5px">支持</el-radio>
              <el-radio v-model="insertForm.isopenedbyfirst" label="1" style="float:left;margin-top:10px;">不支持</el-radio>
            </el-form-item>
            <el-form-item label="支持课程类型" :label-width="formLabelWidth">
              <el-radio v-model="insertForm.coursetype" label="T" style="float:left;margin-top:10px;margin-left:5px">团课</el-radio>
              <el-radio v-model="insertForm.coursetype" label="P" style="float:left;margin-top:10px;">私教</el-radio>
            </el-form-item>
            <el-form-item label="支持团课课程" :label-width="formLabelWidth">
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;" />
              <el-checkbox-group v-model="insertForm.courseId" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="item in allCourse" :key="item.cid" :label="item.cid">{{ item.catetitle }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="效果签名" :label-width="formLabelWidth">
              <el-input v-model="insertForm.labels" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="设为体验卡" :label-width="formLabelWidth">
              <el-radio v-model="insertForm.isfree" label="true" style="float:left;margin-top:10px;margin-left:5px">是</el-radio>
              <el-radio v-model="insertForm.isfree" label="false" style="float:left;margin-top:10px;">否</el-radio>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="toTrue()">确 定</el-button>
          </div>
        </el-dialog>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="会员卡名称" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.cardname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="100" label="支持课程">
            <template slot-scope="scope">
              <span v-if="scope.row.coursetype == 'T'">团课</span>
              <span v-else-if="scope.row.coursetype == 'P'">私教</span>
            </template>
          </el-table-column>

          <el-table-column width="200" align="center" label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.cardtype == 'S'">次卡</span>
              <span v-else-if="scope.row.cardtype == 'P'">期卡</span>
            </template>
          </el-table-column>

          <el-table-column width="80" label="梯度" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.tdcount }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="在线购买" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.isonlinebuy == true">支持</span>
              <span v-else-if="scope.row.isonlinebuy == false">不支持</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="支持场馆" width="400">
            <template slot-scope="scope">
              <span>{{ scope.row.storesjson }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.state == '1'">正常</span>
              <span v-else-if="scope.row.state == '0'">禁用</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="290">
            <template slot-scope="scope">

              <!-- 会员编辑按钮 -->
              <el-button type="text" @click="toOpen(scope.row)">编辑</el-button>
              <el-button v-if="scope.row.state==1" type="text" @click="updateToDisEn(scope.row.status,scope.row.userid,scope.$index)">禁用</el-button>
              <el-button v-else-if="scope.row.state==0" type="text" @click="updateToDisEn(scope.row.status,scope.row.userid,scope.$index)">启用</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAllCards" />
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
            dialogFormVisible:false,
            formLabelWidth:'150px',
            allStores:[],
            allCourse:[],
            checkAll: false,
            isIndeterminate: true,
            insertForm:{
              resid:'',
              resurl:'',
              storeids:[],
              isfree:'false',
              cardtype:'S',
              istransfer:'',
              ismulmem:'',
              isonlinebuy:'',
              isopenedbyfirst:'',
              courseId:[],
              createdby:'系统管理员',
              createdname:'系统管理员',
              lastedby:'系统管理员',
              lastedname:'系统管理员'
            },
            datevalue1:'',
            startStoreId:'A',
            clickSearch:false,
            list:[],
            total: 0,
            listLoading: true,
            listQuery: {
              page: 1,
              limit:20
            },
            options1: [{
            value: 'B',
            label: '全部'
            }, {
            value: 'S',
            label: '次卡'
            }, {
            value: 'P',
            label: '期卡'
            }],
            selectvalue1: '',
            
            options2: [{
            value: 'C',
            label: '全部'
            }, {
            value: 'true',
            label: '支持'
            }, {
            value: 'false',
            label: '不支持'
            }],
            selectvalue2: '',

            selectvalue3: '',
            options3: [{
            value: 'D',
            label: '全部'
            }, {
            value: '1',
            label: '正常'
            }, {
            value: '0',
            label: '已禁用'
            }],
            selectvalue3: '',
            input:'',

            searhForm:{
              cardtype:'',
              isonlinebuy:'',
              state:'',
              cardname:''
              
            },

            tableData: [{
            hykmc: '私教1v1',
            zckc: '私教',
            lx: '次卡',
            td:'1',
            zxgm:'不支持',
            zccg:'万达馆,东鼎馆,泗泾馆,开元馆,亚繁馆',
            px:'0',
            cz:''
            }, {
            hykmc: '私教1v1',
            zckc: '私教',
            lx: '次卡',
            td:'1',
            zxgm:'不支持',
            zccg:'万达馆,东鼎馆,泗泾馆,开元馆,亚繁馆',
            px:'0',
            cz:''
            }, {
            hykmc: '私教1v1',
            zckc: '私教',
            lx: '次卡',
            td:'1',
            zxgm:'不支持',
            zccg:'万达馆,东鼎馆,泗泾馆,开元馆,亚繁馆',
            px:'0',
            cz:''
            }]
        }
    },
    mounted(){
        this.hykcs();
        this.qkck();
        this.getAllCards(this.listQuery);
        this.getAllStore2();
        this.getAllcourse();
    },
    methods:{
        handleSuccess(file){
          this.insertForm.resurl=file
          this.insertForm.resid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)+''
        },
         //禁用恢复
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
        toOpen(){
          this.dialogFormVisible=true
        },
        handleCheckAllChange(val) {
          this.insertForm.courseId = val ? this.allCourse : [];
          this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
          const checkedCount = value.length;
          this.checkAll = checkedCount === this.allCourse.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        insertImg(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2DFK', this.$qs.stringify(this.insertForm), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.insertForm.logoid=this.insertForm.resid
            }).catch(error=>{
              this.$message.error('图片添加失败');
          });
        },
        getAllStore2(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.allStores=res.data.rows
          });
        },
        getAllcourse(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVCN9', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.allCourse=res.data.rows
          })
        },
        getAllCards(data){
          if(this.clickSearch){
            if(this.searhForm.cardtype==''){
              data.cardtype='B'
            }else{
              data.cardtype=this.searhForm.cardtype
            }
            if(this.searhForm.isonlinebuy==''){
              data.isonlinebuy='C'
            }else{
              data.isonlinebuy=this.searhForm.isonlinebuy
            }
            if(this.searhForm.state==''){
              data.state='D'
            }else{
              data.state=this.searhForm.state
            }
            if(this.searhForm.cardname==''){
              data.cardname='E'
            }else{
              data.cardname=this.searhForm.cardname
            }
            this.listLoading=true
            data.page=data.page-1
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEV3S0', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.list=res.data.rows
              this.total=res.data.rows[0].counts
              this.list.forEach((item)=>{
                var storeList=JSON.parse(item.storesjson)
                var stores=''
                storeList.forEach((item)=>{
                  stores+=item.StoreName+';'
                })
                item.storesjson=stores
              })
              console.log(this.list)
              this.listLoading=false
            });
          }else{
            if(this.searhForm.cardtype==''){
              data.cardtype='B'
            }else{
              data.cardtype=this.searhForm.cardtype
            }
            if(this.searhForm.isonlinebuy==''){
              data.isonlinebuy='C'
            }else{
              data.isonlinebuy=this.searhForm.isonlinebuy
            }
            if(this.searhForm.state==''){
              data.state='D'
            }else{
              data.state=this.searhForm.state
            }
            if(this.searhForm.cardname==''){
              data.cardname='E'
            }else{
              data.cardname=this.searhForm.cardname
            }
            this.listLoading=true
            data.page=data.page-1
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEV3S0', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.list=res.data.rows
              this.total=res.data.rows[0].counts
              this.list.forEach((item)=>{
                var storeList=JSON.parse(item.storesjson)
                var stores=''
                storeList.forEach((item)=>{
                  stores+=item.StoreName+';'
                })
                item.storesjson=stores
              })
              console.log(this.list)
              this.listLoading=false
            });
          }
        },
        toClickSearch(){
          this.clickSearch=true
          this.listQuery.page=1
          this.getAllCards(this.listQuery)
        },
        hykcs(){
            const hykcss = this.$echarts.init(document.getElementById('tab1-1'))
            hykcss.setOption({
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['卡数', '金额']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['小团课68课时', '7天7次单人卡', '私教1v1', '员工福利卡', '标准训练卡', '亚繁馆定金卡', '总会员卡']
                },
                series: [
                    {
                        name: '卡数',
                        type: 'bar',
                        data: [1111, 18203, 23489, 29034, 104970, 131744, 141744]
                    },
                    {
                        name: '金额',
                        type: 'bar',
                        data: [11111, 19325, 23438, 31000, 121594, 134141, 141744]
                    }
                ]
            })
        },
        qkck(){
            const qkcks = this.$echarts.init(document.getElementById('tab1-2'))
            qkcks.setOption({
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['期卡', '次卡']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['期卡', '次卡']
                },
                series: [
                    {
                        name: '期卡',
                        type: 'bar',
                        data: [1111, 18203]
                    },
                    {
                        name: '次卡',
                        type: 'bar',
                        data: [11111, 19325]
                    }
                ]
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
