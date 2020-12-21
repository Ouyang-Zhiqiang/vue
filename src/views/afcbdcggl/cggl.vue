<template>
  <div id="container" style="padding:15px">
    <el-tabs type="border-card">
      <el-tab-pane label="教练信息列表">
        <el-button type="success">导出Excel</el-button>
        <el-button type="success" @click="toOpen1">新增运动馆</el-button>
        <el-dialog title="新增场馆" :visible.sync="dialogFormVisible1" style="width:1527px;margin:0 auto">
          <el-form :model="updateForm">
            <el-form-item label="场馆名称" :label-width="formLabelWidth">
              <el-input v-model="insertForm.name" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="场馆电话" :label-width="formLabelWidth">
              <el-input v-model="insertForm.tel" style="width:270px;float:left" />
            </el-form-item>
             <el-form-item label="省市区" :label-width="formLabelWidth">
              <el-select  label="省" v-model="insertForm.provincename" placeholder="请选择" style="margin-top:0px;width:29%"  @change="onChangeStripe">
                  <el-option
                    v-for="item in province"
                    :key="item.geoid"
                    :label="item.chinaname"
                    :value="item.chinaname"
                  />
                </el-select> 
                <el-select  label="市" v-model="insertForm.cityname" placeholder="请选择" style="margin-top:0px;width:31%"    @change="onChangeCity">
                <el-option
                  v-for="item in county"
                  :key="item.geoid"
                  :label="item.chinaname"
                  :value="item.chinaname"
                />
                </el-select> 
                <el-select  label="区" v-model="insertForm.countyname" placeholder="请选择" style="margin-top:0px;width:30%"      @change="onChangeCounty">
                <el-option
                  v-for="item in city"
                  :key="item.geoid"
                  :label="item.chinaname"
                  :value="item.chinaname"
                />
            </el-select> 
            </el-form-item>

            <el-form-item label="地址" :label-width="formLabelWidth">
              <el-input v-model="insertForm.address" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="经纬度" :label-width="formLabelWidth">
              <el-input v-model="insertForm.longitude" style="width:100px;float:left;padding-right:8px" />
              <el-input v-model="insertForm.latitude" style="width:100px;float:left" />
              <span style="font-size:12px;display:block;float:left">请访问<a href="http://www.gpsspg.com/maps.htm" target="_blank" style="color:blue">http://www.gpsspg.com/maps.htm</a> 此地址，获取场馆的经纬度。</span>
            </el-form-item>
            <el-form-item label="营业时间" :label-width="formLabelWidth">
              <el-input v-model="insertForm.businesshours" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="周边设置" :label-width="formLabelWidth">
              <el-input v-model="insertForm.peripheralfacilities" style="width:270px;float:left" />
            </el-form-item>
            <el-form-item label="运动馆简介" :label-width="formLabelWidth">
              <el-input
                v-model="insertForm.intrtext"
                style="width:270px;float:left;height:100px"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
            <el-form-item label="图片添加" :label-width="formLabelWidth">
              <el-upload
                action="https://www.facebodyfitness.com/uploadimg"
                name="upload_file"
                list-type="picture-card"
                :on-preview="handlePreviewMu"
                :on-remove="handleRemoveMu"
                :before-remove="beforeRemoveMu"
                :on-success="handleSuccess1"
                style="float:left"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="toTrueCloseInsert()">确 定</el-button>
          </div>
        </el-dialog>

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="运动馆名称" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="200" label="电话">
            <template slot-scope="scope">
              <span>{{ scope.row.tel }}</span>
            </template>
          </el-table-column>

          <el-table-column width="300" align="center" label="地址">
            <template slot-scope="scope">
              <span>{{ scope.row.provincename }}{{ scope.row.cityname }}{{ scope.row.countyname }}{{ scope.row.address }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column width="150" label="排序" align="center">
            <template>
              <span>0</span>
            </template>
          </el-table-column> -->

          <el-table-column width="200" label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '1'">正常</span>
              <span v-else-if="scope.row.status == '0'">禁用</span>
            </template>
          </el-table-column>

          <el-table-column width="300" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="toOpen(scope.row)">编辑</el-button>

              <el-dialog title="场馆编辑" :visible.sync="dialogFormVisible" style="width:1527px;margin:0 auto">
                <el-form :model="updateForm">
                  <el-form-item label="场馆名称" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.name" style="width:270px;float:left" />
                  </el-form-item>
                  <el-form-item label="场馆电话" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.tel" style="width:270px;float:left" />
                  </el-form-item>
                  <el-form-item label="省市区" :label-width="formLabelWidth">
                    <el-select  label="省" v-model="updateForm.provincename" placeholder="请选择" style="margin-top:0px;width:29%;margin-left: -46px;"  @change="onChangeStripe">
                        <el-option
                          v-for="item in province"
                          :key="item.geoid"
                          :label="item.chinaname"
                          :value="item.chinaname"
                        />
                      </el-select> 
                      <el-select  label="市" v-model="updateForm.cityname" placeholder="请选择" style="margin-top:0px;width:31%"    @change="onChangeCity">
                      <el-option
                        v-for="item in county"
                        :key="item.geoid"
                        :label="item.chinaname"
                        :value="item.chinaname"
                      />
                      </el-select> 
                      <el-select  label="区" v-model="updateForm.countyname" placeholder="请选择" style="margin-top:0px;width:30%"      @change="onChangeCounty">
                      <el-option
                        v-for="item in city"
                        :key="item.geoid"
                        :label="item.chinaname"
                        :value="item.chinaname"
                      />
                  </el-select> 
                  </el-form-item>
                  <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.address" style="width:270px;float:left" />
                  </el-form-item>
                  <el-form-item label="经纬度" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.longitude" style="width:100px;float:left;padding-right:8px" />
                    <el-input v-model="updateForm.latitude" style="width:100px;float:left" />
                    <span style="font-size:12px;display:block;float:left">请访问<a href="http://www.gpsspg.com/maps.htm" target="_blank" style="color:blue">http://www.gpsspg.com/maps.htm</a> 此地址，获取场馆的经纬度。</span>
                  </el-form-item>
                  <el-form-item label="营业时间" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.businesshours" style="width:270px;float:left" />
                  </el-form-item>
                  <el-form-item label="周边设置" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.peripheralfacilities" style="width:270px;float:left" />
                  </el-form-item>
                  <el-form-item label="运动馆简介" :label-width="formLabelWidth">
                    <el-input
                      v-model="updateForm.intrtext"
                      style="width:270px;float:left;height:100px"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      :placeholder="updateForm.intrtext"
                    />
                  </el-form-item>
                  <el-form-item label="门店图片" :label-width="formLabelWidth">
                    <img :src="updateForm.resurl" style="height:150px;width:250px;float:left">
                  </el-form-item>
                  <el-form-item label="图片修改" :label-width="formLabelWidth">
                    <el-upload
                      action="https://www.facebodyfitness.com/uploadimg"
                      name="upload_file"
                      list-type="picture-card"
                      :on-preview="handlePreviewMu2"
                      :on-remove="handleRemoveMu2"
                      :before-remove="beforeRemoveMu2"
                      :on-success="handleSuccess"
                      style="float:left"
                      multiple
                      :on-exceed="handleExceedMu2"
                      :file-list="fileList2"
                    >
                      <i class="el-icon-plus" />
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="toTrueClose()">确 定</el-button>
                </div>
              </el-dialog>

              <el-button v-if="scope.row.status==1" type="text" @click="updateToDisEn(scope.row.status,scope.row.storeid,scope.$index)">禁用</el-button>
              <el-button v-if="scope.row.status==0" type="text" @click="updateToDisEn(scope.row.status,scope.row.storeid,scope.$index)">恢复</el-button>
              <el-button v-if="scope.row.istop==false" type="text" @click="updateToDisEn2(scope.row.istop,scope.row.storeid,scope.$index)">置顶</el-button>
              <el-button v-if="scope.row.istop==true" type="text" @click="updateToDisEn2(scope.row.istop,scope.row.storeid,scope.$index)">取消</el-button>
            </template>
          </el-table-column>

        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="float:right;" @pagination="getAllStores" />

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
          province:[],
          county:[],
          city:[],
          listQuery: {
            page: 1,
            limit:20
          },
          listLoading:false,
          dialogFormVisible:false,
          formLabelWidth: '150px',
          dialogFormVisible1:false,
          obj:{},
          fileList:[],
          fileList2:[],
          form:{
            cityid:'',
            cityname:''
          },
          insertForm:{
            storeid:'',
            resid:'',
            name:'',
            provinceid:'',
            cityid:'',
            countyid:'',
            provincename:'',
            cityname:'',
            countyname:'',
            address:'',
            tel:'',
            businesshours:'',
            peripheralfacilities:'',
            intrtext:'',
            longitude:'',
            latitude:'',
            resurl:'',
            ressuffixname:'',
            companyid:'0',
            lastedby:localStorage.getItem('username'),
            lastedname:localStorage.getItem('username'),
            createdby:localStorage.getItem('username'),
            createdname:localStorage.getItem('username')
          },
          updateForm:{
            storeid:'',
            resid:'',
            name:'',
            provinceid:'',
            cityid:'',
            countyid:'',
            provincename:'',
            cityname:'',
            countyname:'',
            address:'',
            tel:'',
            businesshours:'',
            peripheralfacilities:'',
            intrtext:'',
            longitude:'',
            latitude:'',
            resurl:'',
            ressuffixname:'',
            companyid:'0',
            lastedby:localStorage.getItem('username'),
            lastedname:localStorage.getItem('username'),
            createdby:localStorage.getItem('username'),
            createdname:localStorage.getItem('username'),
            updateurl:'',
            yuanurl:''
          }
        }
    },
    mounted() {
    },
    created(){
      this.getAllStores(this.listQuery)
      
    },
    methods:{
      //场馆增加  对象实例错误
      toOpen1(){
        this.dialogFormVisible1=true
        this.getProvince('province','142')
      },
    insertimg(){
      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CDIAEC0X7H', this.$qs.stringify(this.obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
      });
    },
    handleRemoveMu(file) {
        this.fileList.forEach((item, index)=>{
            if(file.name==item.name){
            this.fileList.splice(index, 1)
            }
        })
    },
    handlePreviewMu(file) {
        console.log(file);
    },
    handleExceedMu(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemoveMu(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
      handleSuccess1(file){
        var filearr=file.split(',')
        this.obj.urlname=filearr[1]
        this.obj.url=filearr[0]
        this.obj.name=filearr[1]
        var ressuffixname=filearr[1].split('.')
        // this.fileList.push(this.obj)
        this.insertForm.resurl=filearr[0]
        this.insertForm.ressuffixname=ressuffixname[1]
      },
      toTrueCloseInsert(){
        if(this.insertForm.resurl==''){
          this.$message.warning('请添加图片');
        }else{
          this.insertForm.storeid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
          this.insertForm.resid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
          this.insertAndImage()
        }
        this.listLoading=true
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVI98', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.rows[0].counts
          this.listLoading=false
        });
        this.dialogFormVisible1=false
      },
      // insertNoImage(){
      //   var data = this.insertForm
      //   this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVIAH', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
      //     this.$message({
      //       message: '恭喜你，操作成功',
      //       type: 'success'
      //     })
      //   }).catch(error=>{
      //     this.$message.error('错了哦，这是一条错误消息');
      //   });
      // },
      insertAndImage(){
        var data = this.insertForm
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1WWQ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
        });
      },
      //wxd系统管理员 修改图片问题
      toOpen(e){
        this.getProvince('province','142')
        var data={}
        data.storeid=e.storeid //获取图片
        this.dialogFormVisible=true
        this.updateForm.name=e.name
        this.updateForm.provincename=e.provincename
        this.updateForm.cityname=e.cityname
        this.updateForm.countyname=e.countyname
        this.updateForm.address=e.address
        this.updateForm.tel=e.tel
        this.updateForm.businesshours=e.businesshours
        this.updateForm.peripheralfacilities=e.peripheralfacilities
        this.updateForm.intrtext=e.intrtext
        this.updateForm.longitude=e.longitude
        this.updateForm.latitude=e.latitude
        this.updateForm.oldresid=e.resid
        this.updateForm.id=e.storeid
        this.updateForm.storeid=e.storeid
        this.updateForm.createdby=localStorage.getItem('userid')
        this.updateForm.createdname=localStorage.getItem('username')
        this.updateForm.lastedby=localStorage.getItem('userid')
        this.updateForm.lastedname=localStorage.getItem('username')
        this.updateForm.createdip='127.0.0.1'
        //获取图片
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1WOX', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          var mylist = res.data.rows
          mylist.forEach((item)=>{
            if(item.resurl!=null){
              this.updateForm.resurl=item.resurl
              this.updateForm.resid=item.resid
              return;
            }else{
              this.updateForm.resurl=''
              this.updateForm.resid=''
            }
          })
        });
      },
      toTrueClose(){ 
        if(this.updateForm.updateurl==this.updateForm.resurl){
          this.updateStoreNoImage()
        }else{
          this.updateForm.resid=(new Date()).valueOf();
          this.updateStoreAndImage()
        }
        this.listLoading=true
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVI98', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.rows[0].counts
          this.listLoading=false
        });
        this.dialogFormVisible=false
      },
      updateStoreNoImage(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVIEB', this.$qs.stringify(this.updateForm), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
        });
      },
      updateStoreAndImage(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1WVH', this.$qs.stringify(this.updateForm), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
        });
      },
     handleSuccess(file){
        // this.updateForm.updateurl=file
        var filearr=file.split(',')
        this.obj.urlname=filearr[1]
        this.obj.url=filearr[0]
        this.obj.name=filearr[1]
        var ressuffixname=filearr[1].split('.')
        // this.fileList.push(this.obj)
        this.updateForm.resurl=filearr[0]
        this.updateForm.ressuffixname=ressuffixname[1]
      },
     handleRemoveMu2(file) {
        this.fileList.forEach((item, index)=>{
            if(file.name==item.name){
            this.fileList2.splice(index, 1)
            }
        })
    },
    handlePreviewMu2(file) {
        console.log(file);
    },
    handleExceedMu2(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemoveMu2(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
      getAllStores(data){
        this.listLoading=true
        data.page=this.listQuery.page-1
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVI98', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list=res.data.rows
          this.total=res.data.rows[0].counts
          this.listLoading=false
        });
      },
      onChangeStripe(e){
        this.province.forEach(item=>{
              if(e==item.chinaname){
                this.insertForm.provinceid=item.geoid
              }
          })
        this.getCounty('city',this.insertForm.provinceid);
        this.insertForm.countyname=''
        this.insertForm.cityname=''
        this.updateForm.countyname=''
        this.updateForm.cityname=''
      },
      onChangeCity(e){
        this.county.forEach(item=>{
              if(e==item.chinaname){
                this.insertForm.cityid=item.geoid
              }
          })
          this.getcity('county',this.insertForm.cityid)
          this.insertForm.countyname=''
          this.updateForm.countyname=''
      },
      onChangeCounty(e){
        this.city.forEach(item=>{
              if(e==item.chinaname){
                this.insertForm.countyid=item.geoid
              }
          })
      },
      getProvince(geotype,geopid){
        var ss={}
        ss.geotype=geotype
        ss.geopid=geopid
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLOU632', this.$qs.stringify(ss), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.province=res.data.rows
        });
      },
      getCounty(geotype,geopid){
          var ss={}
          ss.geotype=geotype
          ss.geopid=geopid
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLOU632', this.$qs.stringify(ss), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.county=res.data.rows
        });
      },
      getcity(geotype,geopid){
          var ss={}
          ss.geotype=geotype
          ss.geopid=geopid
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLOU632', this.$qs.stringify(ss), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
               this.city=res.data.rows
          });
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
      updateStatus(e, id, index){
        var data={
          status:e,
          storeid:id
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEVIG1', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list[index].status=e
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
        });
      },
      //置顶操作
      updateToDisEn2(e, id, index){
        var istop=false
        if(e==false){
          istop=true
          this.updateStatus2(istop, id, index);
        }else if(e==true){
          istop=false
          this.updateStatus2(istop, id, index);
        }
      },
      updateStatus2(e, id, index){
        var data={
          istop:e,
          storeid:id
        }
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG1WM2', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.list[index].istop=e
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

<style scoped>
    
</style>
