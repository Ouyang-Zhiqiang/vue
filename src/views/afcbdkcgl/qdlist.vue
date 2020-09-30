<template>
  <div id="container" style="padding:15px">
    <el-dialog title="修改课程" :show-close="false" :visible.sync="dialogFormVisible1" style="width:1700px;margin:0 auto">
      <el-form :model="updateForm">
        <el-form-item label="课程类型" :label-width="formLabelWidth">
          <el-input :value="query.catetitle" style="width:270px;float:left" disabled />
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="updateForm.strengthnumber" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="强度等级" :label-width="formLabelWidth">
          <el-radio-group v-model="updateForm.strengthgrade" style="float:left;margin-top:10px;">
            <el-radio :label="1">1</el-radio>
            <el-radio :label="2">2</el-radio>
            <el-radio :label="3">3</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="组合添加" :label-width="formLabelWidth">
          <div>
            <el-button style="margin-bottom:5px" @click="addParts1">添加</el-button><br>
            <el-select v-model="myaims" placeholder="课程目标" style="width:300px;margin-bottom:5px">
              <el-option v-for="item in aims" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
            <div v-for="(item1,index1) in updateForm.partsjson" :key="index1" style="width:90%;border:1px solid #DDDDDD;padding:5px;margin-bottom:5px;position:relative">
              <el-select v-model="item1.partname" placeholder="组合名" style="width:100px;margin-bottom:5px">
                <el-option v-for="item in parts" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
              <el-input v-model="item1.time" placeholder="时长" style="width:100px;padding-right:5px" />
              <el-input v-model="item1.specification" placeholder="战术" style="width:100px;padding-right:5px" />
                            
              <div v-for="(item11,index11) in updateForm.partsjson[index1].actions" :key="index11" style="width:100%">
                <el-select v-model="item11.category" placeholder="类别" style="width:100px;float:left;padding-right:5px;" @change="categoryChange1(index1,index11)">
                  <el-option v-for="item in categorys" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-select v-model="item11.strength" placeholder="强度" style="width:100px;float:left;padding-right:5px" @change="strengthChange1(index1,index11)">
                  <el-option v-for="item in strengths" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-select v-model="item11.name" placeholder="动作" style="width:100px;float:left;padding-right:5px">
                  <el-option v-for="item in courseItems" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-input v-model="item11.number" style="width:100px;float:left;padding-right:5px" />
                <!-- <el-input v-model="item11.unit" readonly="readonly" style="width:100px;float:left;"></el-input> -->
                                
                <el-select v-model="item11.unit" style="width:90px;float:left" placeholder="单位">
                  <el-option v-for="item in units" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                                
                <i class="el-icon-remove" style="font-size:20px;margin-left:10px" @click="removeDz1(index1,index11)" />
                <i class="el-icon-circle-plus" style="font-size:20px" @click="addDz1(index1)" />
                <div style="height:5px" />
              </div>
              <div style="clear:both" />
              <i class="el-icon-remove" style="font-size:20px;position:absolute;right:-30px;top:30px" @click="removeParts1(index1)" />
            </div>
          </div>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <div v-for="(item1,index1) in updateForm.imgsjson" :key="index1" style="float:left;">
            <img :src="item1.ResUrl" style="width:120px;height:120px">
            <i class="el-icon-close" style="position:relative;top:-95px;right:30px;font-size:25px" @click="toDeleteImg1(index1)" />
          </div>
          <el-upload
            action="https://www.facebodyfitness.com/uploadimg"
            name="upload_file"
            list-type="picture-card"
            :on-success="handleSuccess1"
            style="float:left"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>

            
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel1()">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="toTrue1()">确认修改</el-button>
        <el-button type="danger" @click="toDelete1()">删 除</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改课程" :visible.sync="dialogFormVisible2" style="width:1700px;margin:0 auto">
      <el-form :model="updateForm">
        <el-form-item label="课程类型" :label-width="formLabelWidth">
          <el-input :value="query.catetitle" style="width:270px;float:left" disabled />
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="updateForm.strengthnumber" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="强度等级" :label-width="formLabelWidth">
          <el-radio-group v-model="updateForm.strengthgrade" style="float:left;margin-top:10px;">
            <el-radio :label="1">1</el-radio>
            <el-radio :label="2">2</el-radio>
            <el-radio :label="3">3</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="组合添加" :label-width="formLabelWidth">
          <div>
            <el-button style="margin-bottom:5px" @click="addParts1">添加</el-button><br>
            <el-select v-model="myaims" placeholder="课程目标" style="width:300px;margin-bottom:5px">
              <el-option v-for="item in aims" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
            <div v-for="(item1,index1) in updateForm.partsjson" :key="index1" style="width:90%;border:1px solid #DDDDDD;padding:5px;margin-bottom:5px;position:relative">
              <el-select v-model="item1.partname" placeholder="组合名" style="width:100px;margin-bottom:5px">
                <el-option v-for="item in parts" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
              <el-input v-model="item1.time" placeholder="时长" style="width:100px;padding-right:5px" />
              <el-input v-model="item1.specification" placeholder="战术" style="width:100px;padding-right:5px" />
              <div v-for="(item11,index11) in updateForm.partsjson[index1].actions" :key="index11" style="width:100%">
                <el-select v-model="item11.category" placeholder="类别" style="width:100px;float:left;padding-right:5px;" @change="categoryChange1(index1,index11)">
                  <el-option v-for="item in categorys" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-select v-model="item11.strength" placeholder="强度" style="width:100px;float:left;padding-right:5px" @change="strengthChange1(index1,index11)">
                  <el-option v-for="item in strengths" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-select v-model="item11.name" placeholder="动作" style="width:100px;float:left;padding-right:5px">
                  <el-option v-for="item in courseItems" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-input v-model="item11.number" style="width:100px;float:left;padding-right:5px" />
                <!-- <el-input v-model="item11.unit" readonly="readonly" style="width:100px;float:left;"></el-input> -->
                <el-select v-model="item11.unit" style="width:90px;float:left" placeholder="单位">
                  <el-option v-for="item in units" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <i class="el-icon-remove" style="font-size:20px;margin-left:10px" @click="removeDz1(index1,index11)" />
                <i class="el-icon-circle-plus" style="font-size:20px" @click="addDz1(index1)" />
                <div style="height:5px" />
              </div>
              <div style="clear:both" />
              <i class="el-icon-remove" style="font-size:20px;position:absolute;right:-30px;top:30px" @click="removeParts1(index1)" />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <div v-for="(item1,index1) in updateForm.imgsjson" :key="index1" style="float:left;">
            <img :src="item1.ResUrl" style="width:120px;height:120px">
            <i class="el-icon-close" style="position:relative;top:-95px;right:30px;font-size:25px" @click="toDeleteImg1(index1)" />
          </div>
          <el-upload
            action="https://www.facebodyfitness.com/uploadimg"
            name="upload_file"
            list-type="picture-card"
            :on-success="handleSuccess1"
            style="float:left"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="训练项目" :label-width="formLabelWidth">
                        <el-select v-model="form.trainingjson" placeholder="" style="margin-top:5px">
                        <el-option
                            v-for="item in items"
                            :key="item.tid"
                            :label="item.trainingtitle"
                            :value="item.tid"
                        />
                        </el-select>
                    </el-form-item> -->
                    
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel2()">取 消</el-button>
        <el-button type="primary" @click="toTrue2()">确认修改</el-button>
        <el-button type="danger" @click="toDelete2()">删 除</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改课程" :visible.sync="dialogFormVisible3" style="width:1700px;margin:0 auto">
      <el-form :model="updateForm">
        <el-form-item label="课程类型" :label-width="formLabelWidth">
          <el-input :value="query.catetitle" style="width:270px;float:left" disabled />
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="updateForm.strengthnumber" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="强度等级" :label-width="formLabelWidth">
          <el-radio-group v-model="updateForm.strengthgrade" style="float:left;margin-top:10px;">
            <el-radio :label="1">1</el-radio>
            <el-radio :label="2">2</el-radio>
            <el-radio :label="3">3</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="组合添加" :label-width="formLabelWidth">
          <div>
            <el-button style="margin-bottom:5px" @click="addParts1">添加</el-button><br>
            <el-select v-model="myaims" placeholder="课程目标" style="width:300px;margin-bottom:5px">
              <el-option v-for="item in aims" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
            <div v-for="(item1,index1) in updateForm.partsjson" :key="index1" style="width:90%;border:1px solid #DDDDDD;padding:5px;margin-bottom:5px;position:relative">
              <el-select v-model="item1.partname" placeholder="组合名" style="width:100px;margin-bottom:5px">
                <el-option v-for="item in parts" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
              <el-input v-model="item1.time" placeholder="时长" style="width:100px;padding-right:5px" />
              <el-input v-model="item1.specification" placeholder="战术" style="width:100px;padding-right:5px" />
              <div v-for="(item11,index11) in updateForm.partsjson[index1].actions" :key="index11" style="width:100%">
                <el-select v-model="item11.category" placeholder="类别" style="width:100px;float:left;padding-right:5px;" @change="categoryChange1(index1,index11)">
                  <el-option v-for="item in categorys" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-select v-model="item11.strength" placeholder="强度" style="width:100px;float:left;padding-right:5px" @change="strengthChange1(index1,index11)">
                  <el-option v-for="item in strengths" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-select v-model="item11.name" placeholder="动作" style="width:100px;float:left;padding-right:5px">
                  <el-option v-for="item in courseItems" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-input v-model="item11.number" style="width:100px;float:left;padding-right:5px" />
                <!-- <el-input v-model="item11.unit" readonly="readonly" style="width:100px;float:left;"></el-input> -->
                <el-select v-model="item11.unit" style="width:90px;float:left" placeholder="单位">
                  <el-option v-for="item in units" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <i class="el-icon-remove" style="font-size:20px;margin-left:10px" @click="removeDz1(index1,index11)" />
                <i class="el-icon-circle-plus" style="font-size:20px" @click="addDz1(index1)" />
                <div style="height:5px" />
              </div>
              <div style="clear:both" />
              <i class="el-icon-remove" style="font-size:20px;position:absolute;right:-30px;top:30px" @click="removeParts1(index1)" />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <div v-for="(item1,index1) in updateForm.imgsjson" :key="index1" style="float:left;">
            <img :src="item1.ResUrl" style="width:120px;height:120px">
            <i class="el-icon-close" style="position:relative;top:-95px;right:30px;font-size:25px" @click="toDeleteImg1(index1)" />
          </div>
          <el-upload
            action="https://www.facebodyfitness.com/uploadimg"
            name="upload_file"
            list-type="picture-card"
            :on-success="handleSuccess1"
            style="float:left"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="训练项目" :label-width="formLabelWidth">
                <el-select v-model="form.trainingjson" placeholder="" style="margin-top:5px">
                <el-option
                    v-for="item in items"
                    :key="item.tid"
                    :label="item.trainingtitle"
                    :value="item.tid"
                />
                </el-select>
            </el-form-item> -->
            
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel3()">取 消</el-button>
        <el-button type="primary" @click="toTrue3()">确认修改</el-button>
        <el-button type="danger" @click="toDelete3()">删 除</el-button>
      </div>
    </el-dialog>

    <p style="font-family:Helvetica Neue;font-size:25px;padding-left:10px;padding-bottom:10px">{{ query.catetitle }}</p> 
    <el-button type="success" style="position:absolute;right:160px;top:35px" @click="toOpen">新增课程</el-button>
    <el-dialog title="新增课程" :visible.sync="dialogFormVisible" style="width:1700px;margin:0 auto">
      <el-form :model="form">
        <el-form-item label="课程类型" :label-width="formLabelWidth">
          <el-input :value="query.catetitle" style="width:270px;float:left" disabled />
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.strengthnumber" style="width:270px;float:left" />
        </el-form-item>
        <el-form-item label="强度等级" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.strengthgrade" label="1">1</el-radio>
            <el-radio v-model="form.strengthgrade" label="2">2</el-radio>
            <el-radio v-model="form.strengthgrade" label="3">3</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="组合添加" :label-width="formLabelWidth">
          <div>
            <el-button style="margin-bottom:5px" @click="addParts">添加</el-button><br>
            <el-select v-model="myaims" placeholder="课程目标" style="width:300px;margin-bottom:5px">
              <el-option v-for="item in aims" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
            <div v-for="(item1,index1) in form.partsjson" :key="index1" style="width:90%;border:1px solid #DDDDDD;padding:5px;margin-bottom:5px;position:relative">
              <el-select v-model="item1.partname" placeholder="组合名" style="width:100px;margin-bottom:5px">
                <el-option v-for="item in parts" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
              <el-input v-model="item1.time" placeholder="时长" style="width:100px;padding-right:5px" />
              <el-input v-model="item1.specification" placeholder="战术" style="width:100px;padding-right:5px" />
                        
              <div v-for="(item11,index11) in form.partsjson[index1].actions" :key="index11" style="width:100%">
                <el-select v-model="item11.category" placeholder="类别" style="width:100px;float:left;padding-right:5px;" @change="categoryChange(index1,index11)">
                  <el-option v-for="item in categorys" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-select v-model="item11.strength" placeholder="强度" style="width:100px;float:left;padding-right:5px" @change="strengthChange(index1,index11)">
                  <el-option v-for="item in strengths" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-select v-model="item11.name" placeholder="动作" style="width:100px;float:left;padding-right:5px">
                  <el-option v-for="item in courseItems" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <el-input v-model="item11.number" style="width:100px;float:left;padding-right:5px" />
                <el-select v-model="item11.unit" style="width:90px;float:left" placeholder="单位">
                  <el-option v-for="item in units" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
                <i class="el-icon-remove" style="font-size:20px;margin-left:10px" @click="removeDz(index1,index11)" />
                <i class="el-icon-circle-plus" style="font-size:20px" @click="addDz(index1)" />
                <div style="height:5px" />
              </div>
              <div style="clear:both" />
              <i class="el-icon-remove" style="font-size:20px;position:absolute;right:-30px;top:30px" @click="removeParts(index1)" />
                    
            </div>
          </div>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
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
        <el-form-item label="训练项目" :label-width="formLabelWidth">
          <el-button style="float:right;margin-right:300px" @click="addInput">添加</el-button>
          <div v-for="(item1,index) in form.trainingjsons" :key="index">
            <el-select v-model="item1.tid" placeholder="" style="margin-top:5px">
              <el-option
                v-for="item in items"
                :key="item.tid"
                :label="item.trainingtitle"
                :value="item.tid"
              />
            </el-select>
            <i class="el-icon-error" style="font-size:20px;cursor:pointer;margin-left:10px" @click="removeInput(index)" />
          </div>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toTrue()">确 定</el-button> 
      </div>
    </el-dialog>

    <el-button type="success" style="position:absolute;right:30px;top:35px">导出Excel</el-button>
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span> <span>强度：</span> <i class="el-icon-star-off" /> </span>
      </div>
      <div v-for="(item,index) in list1" :key="index" style="width:20%;float:left">
        <div style="width:100%;height:35px;float:left;cursor:pointer;">
          <span class="qdname" @click="toOpen1(item)">{{ item.strengthnumber }}</span>
                
        </div>
      </div>
      <pagination v-show="total1>0" :total="total1" :page.sync="listQuery1.page1" :limit.sync="listQuery1.limit1" style="float:right;" @pagination="getStrenth1" />
    </el-card>
    
    <el-card class="box-card" style="margin-top:40px">
      <div slot="header" class="clearfix">
        <span> <span>强度：</span> <i class="el-icon-star-off" /> <i class="el-icon-star-off" /> </span>
      </div>
      <div v-for="(item,index) in list2" :key="index" style="width:20%;float:left">
        <div style="width:100%;height:35px;float:left;cursor:pointer;">
                
          <span class="qdname" @click="toOpen2(item)">{{ item.strengthnumber }}</span>
                
        </div>
      </div>
      <pagination v-show="total2>0" :total="total2" :page.sync="listQuery2.page2" :limit.sync="listQuery2.limit2" style="float:right;" @pagination="getStrenth2" />
    </el-card>

    <el-card class="box-card" style="margin-top:40px">
      <div slot="header" class="clearfix">
        <span> <span>强度：</span> <i class="el-icon-star-off" /> <i class="el-icon-star-off" /> <i class="el-icon-star-off" /> </span>
      </div>
      <div v-for="(item,index) in list3" :key="index" style="width:20%;float:left">
        <div style="width:100%;height:35px;float:left;cursor:pointer;">
                
          <span class="qdname" @click="toOpen3(item)">{{ item.strengthnumber }}</span>
                
        </div>
      </div>
      <pagination v-show="total3>0" :total="total3" :page.sync="listQuery3.page3" :limit.sync="listQuery3.limit3" style="float:right;" @pagination="getStrenth3" />
    </el-card>
  </div>
</template>

<script>
import { fetchList } from '@/api/hy';
import Pagination from '@/components/Pagination';
import { date } from 'jszip/lib/defaults'
export default {
    components: { Pagination },
    data(){
        return{ 
            loading:false,
            listLoading:false,
            courseItems:[],
            dialogFormVisible2:false,
            dialogFormVisible3:false,
            formLabelWidth:'150px',
            query:{},
            form: {
                trainingjsons:[{tid:''}],
                trainingjson:[],
                strengthgrade:'1',
                imgsjson:[],
                partsjson:[{partname:'', actions:[{name:'', unit:'', number:'', category:'', strength:''}]}]
            },
            list:[],
            dialogFormVisible:false,
            items:[],
            dialogFormVisible1:false,
            updateForm:{
                partsjson:[{partname:'', actions:[{name:'', unit:'', number:'', category:'', strength:''}]}]
            },
            list1: null,
            total1: 0,
            listLoading:false,
            listLoading1: true,
            listQuery1: {
                page1: 1,
                limit1:20
            },
            myaims:'',
            list2: null,
            total2: 0,
            listLoading2: true,
            listQuery2: {
                page2: 1,
                limit2:20
            },
            list3: null,
            total3: 0,
            listLoading3: true,
            listQuery3: {
                page3: 1,
                limit3:20
            },
            categorys:[],
            strengths:[],
            parts:[],
            actions:[],
            aims:[],
            units:[]
        }
    },
    mounted() {
    },
    created(){
        this.query=this.$route.query.item
        // localStorage.setItem('mycid',this.query.mycid)
        // console.log(localStorage.getItem('mycid'))
        // this.getStrenth(this.query)
        // console.log(this.query)
        this.getStrenth1(this.listQuery1)
        this.getStrenth2(this.listQuery2)
        this.getStrenth3(this.listQuery3)  
        this.getIteams()
        this.getCategory()
        this.getStrength()
        this.getParts()
        this.getAims()
        this.getUnits()
    },
    methods:{
        // getStrenth(e){
        //   this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG248M',this.$qs.stringify(e),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        //       this.list=res.data.rows
        //     //   console.log(this.list)
        //   })
        // },
        getUnits(){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU1C1', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.units=res.data.rows
        })
        },
        getCategory(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWTWHF', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.categorys=res.data.rows
        })
        },
        getStrength(){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWTWHU', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.strengths=res.data.rows
        })
        },
        getAims(){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWUNBS', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.aims=res.data.rows
        })
        },
        getParts(){
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU1CF', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.parts=res.data.rows
        })
        },
        getStrenth1(data){
          data.mycid=this.query.mycid
          data.page1=this.listQuery1.page1-1
          data.limit1=this.listQuery1.limit1
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU06Z', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.list1=res.data.rows
            //   console.log(this.list1)
              if(res.data.rows[0].counts){
                  this.total1=res.data.rows[0].counts
              }
              console.log('list1:'+this.list1)
          })
        },
        getStrenth2(data){
          data.mycid=this.query.mycid
          data.page2=this.listQuery2.page2-1
          data.limit2=this.listQuery2.limit2
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU07H', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.list2=res.data.rows
              if(res.data.rows[0].counts){
                  this.total2=res.data.rows[0].counts
                  console.log(res.data.rows[0].counts)
              }
          })
        },
        getStrenth3(data){
          data.mycid=this.query.mycid
          data.page3=this.listQuery3.page3-1
          data.limit3=this.listQuery3.limit3
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU07L', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.list3=res.data.rows
              if(res.data.rows[0].counts){
                  this.total3=res.data.rows[0].counts
              }
          })
        },
        getIteams(){
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG24BL', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.items=res.data.rows
            //   console.log(this.items)
          })
        },
        insertItem(){
            var data={}
            
            data.strengthgrade=this.form.strengthgrade
            data.strengthnumber=this.form.strengthnumber

            // data.resid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
            // data.resurl=this.form.img
            
            data.imgsjson=JSON.stringify(this.form.imgsjson)
            data.cid=this.query.mycid
            data.partsjson=this.form.partsjson
            data.partsjson[0].aims=this.myaims
            data.partsjson=JSON.stringify(this.form.partsjson)
            this.myaims=''
            data.createdname='系统管理员'
            data.createdip='127.0.0.1'
            data.changeaction='系统管理员'
            data.createdby='系统管理员'
            data.lastedip='127.0.0.1'
            data.lastedby='系统管理员'
            data.lastedname='系统管理员'
            
            // var arr2=[]
            // var resobj={}
            // resobj.ResId=data.resid
            // resobj.ResUrl=data.resurl
            // arr2.push(resobj)
            // data.imgsjson=JSON.stringify(arr2)
            var arr=[]
            if(this.form.trainingjson){
                this.form.trainingjsons.forEach((item)=>{
                    this.items.forEach((item1)=>{
                        if(item.tid==item1.tid){
                            var objitem={}
                            objitem.Tid=item1.tid
                            objitem.TrainingTitle=item1.trainingtitle
                            arr.push(objitem)
                        }
                    })
                })
            }
            data.trainingjson=JSON.stringify(arr)
            data.coursename=this.query.catetitle+'_'+this.form.strengthnumber
            data.courseduration=this.query.courseduration
            data.reservablenumber=this.query.reservablenumber
            data.minpeople=this.query.minpeople
            

            data.sid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
            console.log(data)
            
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG24E0', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.$message({
                    message: '恭喜你，操作成功',
                    type: 'success'
                    })
                    this.form={
                        trainingjsons:[{tid:''}],
                        trainingjson:[],
                        strengthgrade:'1',
                        imgsjson:[],
                        partsjson:[{partname:'', actions:[{name:'', unit:'', number:'', category:'', strength:''}]}]
                    }
                    this.listQuery1.page1=1
                    this.listQuery2.page2=1
                    this.listQuery3.page3=1
                    this.getStrenth1(this.listQuery1)
                    this.getStrenth2(this.listQuery2)
                    this.getStrenth3(this.listQuery3) 
                }).catch(error=>{
                    this.$message.error('错了哦，这是一条错误消息');
            });
        },
        toOpen(){
            this.myaims=''
            this.dialogFormVisible=true
        },
        toTrue(){
            this.dialogFormVisible=false
            this.insertItem()
        },
        handleSuccess(file){
            console.log(file)
            var filearr=file.split(',')
            var data ={}
            data.resurl=filearr[0]
            data.resname=filearr[1]
            data.createdby='系统管理员'
            data.lastedby='系统管理员'
            data.resid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
            var obj={}
            obj.ResId=data.resid
            obj.ResUrl=data.resurl
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2AC4', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.form.imgsjson.push(obj)
            })
        },
        toOpen1(e){
            this.myaims=''
            this.updateForm=e
            console.log(this.updateForm)
            if(typeof this.updateForm.imgsjson==='string'){
                this.updateForm.imgsjson=JSON.parse(this.updateForm.imgsjson)
            }
            if(typeof this.updateForm.trainingjson==='string'){
                this.updateForm.trainingjsons=JSON.parse(this.updateForm.trainingjson)
            }
            if(this.updateForm.partsjson){
                if(typeof this.updateForm.partsjson==='string'){
                    this.updateForm.partsjson=JSON.parse(this.updateForm.partsjson)
                    
                        this.myaims=this.updateForm.partsjson[0].aims
                }
            }else{
                this.updateForm.partsjson=[{partname:'', aims:'', actions:[{name:'', unit:'', number:'', category:'', strength:''}]}]
            }
            // console.log(this.updateForm.trainingjsons)
            console.log(this.updateForm)
            this.dialogFormVisible1=true
        },
        handleSuccess1(file){
            var arrfile = file.split(',')
            var data ={}
            data.resurl=arrfile[0]
            data.resname=arrfile[1]
            data.createdby='系统管理员'
            data.lastedby='系统管理员'
            data.resid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2AC4', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.updateForm.imgsjson.push(data)
            })
        },
        toTrue1(){ 
            this.dialogFormVisible1=false
            this.loading=true
            this.updateMethods()
        },
        //点击x删图片
        toDeleteImg1(e){
            console.log(e)
            this.updateForm.imgsjson.splice(e, 1)
            console.log(this.updateForm.imgsjson)
        },
        toDelete1(){
            var data=this.updateForm
            console.log(data)
            // data.isremoved=true
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2AMF', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
             this.$message({
                    message: '恭喜你，操作成功',
                    type: 'success'
                    })
                    this.listQuery1.page1=1
                    this.listQuery2.page2=1
                    this.listQuery3.page3=1
                    this.getStrenth1(this.listQuery1)
                    this.getStrenth2(this.listQuery2)
                    this.getStrenth3(this.listQuery3) 
                    this.dialogFormVisible1=false
                }).catch(error=>{
                    this.$message.error('错了哦，这是一条错误消息');
            });
        },
        toCancel1(){
            this.dialogFormVisible1=false
            this.updateForm={}
        },
        toOpen2(e){
            // console.log(e)
            this.myaims=''
            this.updateForm=e
            if(typeof this.updateForm.imgsjson==='string'){
                this.updateForm.imgsjson=JSON.parse(this.updateForm.imgsjson)
            }
            if(typeof this.updateForm.trainingjson==='string'){
                this.updateForm.trainingjsons=JSON.parse(this.updateForm.trainingjson)
            }
            if(this.updateForm.partsjson){
                if(typeof this.updateForm.partsjson==='string'){
                    this.updateForm.partsjson=JSON.parse(this.updateForm.partsjson)
                    if(this.updateForm.partsjson[0].aims){
                        this.myaims=this.updateForm.partsjson[0].aims
                    }else{
                        this.updateForm.partsjson[0].aims=''
                    }
                }
            }else{
                this.updateForm.partsjson=[{partname:'', aims:'', actions:[{name:'', unit:'', number:'', category:'', strength:''}]}]
            }
            // console.log(this.updateForm.trainingjsons)
            this.dialogFormVisible2=true
        },
        toTrue2(){ 
            this.dialogFormVisible2=false
            this.updateMethods()
        },
        toCancel2(){
            this.dialogFormVisible2=false
            this.updateForm={}
        },
        toDelete2(){
            var data=this.updateForm
            console.log(data)
            // data.isremoved=true
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2AMF', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
             this.$message({
                    message: '恭喜你，操作成功',
                    type: 'success'
                    })
                    this.listQuery1.page1=1
                    this.listQuery2.page2=1
                    this.listQuery3.page3=1
                    this.getStrenth1(this.listQuery1)
                    this.getStrenth2(this.listQuery2)
                    this.getStrenth3(this.listQuery3) 
                    this.dialogFormVisible2=false
                }).catch(error=>{
                    this.$message.error('错了哦，这是一条错误消息');
            });
        },
        toOpen3(e){
            // console.log(e)
            this.myaims=''
            this.updateForm=e
            if(typeof this.updateForm.imgsjson==='string'){
                this.updateForm.imgsjson=JSON.parse(this.updateForm.imgsjson)
            }
            if(typeof this.updateForm.trainingjson==='string'){
                this.updateForm.trainingjsons=JSON.parse(this.updateForm.trainingjson)
            }
            if(this.updateForm.partsjson){
                if(typeof this.updateForm.partsjson==='string'){
                    this.updateForm.partsjson=JSON.parse(this.updateForm.partsjson)
                    if(this.updateForm.partsjson[0].aims){
                        this.myaims=this.updateForm.partsjson[0].aims
                    }else{
                        this.updateForm.partsjson[0].aims=''
                    }
                }
            }else{
                this.updateForm.partsjson=[{partname:'', aims:'', actions:[{name:'', unit:'', number:'', category:'', strength:''}]}]
            }
            // console.log(this.updateForm.trainingjsons)
            this.dialogFormVisible3=true
        },
        toTrue3(){ 
            this.dialogFormVisible3=false
            this.updateMethods()
        },
        toCancel3(){
            this.dialogFormVisible3=false
            this.updateForm={}
        },
        toDelete3(){
            var data=this.updateForm
            console.log(data)
            // data.isremoved=true
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2AMF', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
             this.$message({
                    message: '恭喜你，操作成功',
                    type: 'success'
                    })
                    this.listQuery1.page1=1
                    this.listQuery2.page2=1
                    this.listQuery3.page3=1
                    this.getStrenth1(this.listQuery1)
                    this.getStrenth2(this.listQuery2)
                    this.getStrenth3(this.listQuery3) 
                    this.dialogFormVisible3=false
                }).catch(error=>{
                    this.$message.error('错了哦，这是一条错误消息');
            });
        },
        addInput(){
            var objs={tid:''}
            this.form.trainingjsons.push(objs)
        },
        removeInput(index){
            console.log(index)
            this.form.trainingjsons.splice(index, 1)
        },
        addUpdateInput(){
            var objs={Tid:''}
            console.log(this.updateForm.trainingjsons)
            this.updateForm.trainingjsons.push(objs)
        },
        removeUpdateInput(index){
            console.log(index)
            this.updateForm.trainingjsons.splice(index, 1)
        },
        removeDz(index1, index11){
            this.form.partsjson[index1].actions.splice(index11, 1)
        },
        addDz(index1){
            var obj={name:'', unit:'', number:'', category:'', strength:''}
            this.form.partsjson[index1].actions.push(obj)
        },
        // partsjson:[{partname:'',actions:[{name:'',unit:'',number:'',category:'',strength:''}]}]
        addParts(){
            var obj={partname:'', aims:'', time:'', specification:'', actions:[{name:'', unit:'', number:'', category:'', strength:'', dz:[]}]}
            this.form.partsjson.push(obj)
        },
        removeParts(index){
            this.form.partsjson.splice(index, 1)
        },
        categoryChange(index1, index11){
            var data={}
            data.category=this.form.partsjson[index1].actions[index11].category
            data.strength=this.form.partsjson[index1].actions[index11].strength
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU1NJ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.courseItems=res.data.rows
            })
        },
        strengthChange(index1, index11){
            var data={}
            data.category=this.form.partsjson[index1].actions[index11].category
            data.strength=this.form.partsjson[index1].actions[index11].strength
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU1NJ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                // console.log(this.form.partsjson)
                // console.log(index1+','+index11)
                // this.form.partsjson[index1].actions[index11].dz=res.data.rows
                // console.log(this.form.partsjson[index1].actions[index11].dz)
                this.courseItems=res.data.rows
            })
        },
        actionChange(index1, index11){ 
            this.courseItems.forEach(item=>{
                if(this.form.partsjson[index1].actions[index11].name=item.name){
                    this.form.partsjson[index1].actions[index11].unit=item.unit
                }
            })
        },
         categoryChange1(index1, index11){
            var data={}
            data.category=this.updateForm.partsjson[index1].actions[index11].category
            data.strength=this.updateForm.partsjson[index1].actions[index11].strength
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU1NJ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.courseItems=res.data.rows
            })
        },
        strengthChange1(index1, index11){
            var data={}
            data.category=this.updateForm.partsjson[index1].actions[index11].category
            data.strength=this.updateForm.partsjson[index1].actions[index11].strength
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24C2HHHWU1NJ', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.courseItems=res.data.rows
            })
        },
        actionChange1(index1, index11){
            this.courseItems.forEach(item=>{
                if(this.updateForm.partsjson[index1].actions[index11].name=item.name){
                    this.updateForm.partsjson[index1].actions[index11].unit=item.unit
                }
            })
        },
        removeDz1(index1, index11){
            this.updateForm.partsjson[index1].actions.splice(index11, 1)
        },
        addDz1(index1){
            var obj={name:'', unit:'', number:'', category:'', strength:''}
            this.updateForm.partsjson[index1].actions.push(obj)
        },
        // partsjson:[{partname:'',actions:[{name:'',unit:'',number:'',category:'',strength:''}]}]
        addParts1(){
            var obj={partname:'', aims:'', actions:[{name:'', unit:'', number:'', category:'', strength:'', dz:[]}]}
            this.updateForm.partsjson.push(obj)
        },
        removeParts1(index){
            this.updateForm.partsjson.splice(index, 1)
        },
        // updateCompany(){
        //   this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG23W1',this.$qs.stringify(this.form),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
        //   this.$message({
        //         message: '恭喜你，操作成功',
        //         type: 'success'
        //       })
        //     }).catch(error=>{
        //       this.$message.error('错了哦，这是一条错误消息');
        //     });
        // }
        updateMethods(){
            this.updateForm.imgsjson=JSON.stringify(this.updateForm.imgsjson)
            this.updateForm.partsjson[0].aims=this.myaims
            this.updateForm.partsjson=JSON.stringify(this.updateForm.partsjson)
            this.myaims=''
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG2AKO', this.$qs.stringify(this.updateForm), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.loading=false
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
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .el-icon-star-off{
      width: 35px;
  }
  .qdname:hover{ color:blue;}
  .el-dialog__headerbtn{
      display: none;
  }
</style>
