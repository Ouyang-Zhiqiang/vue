<template>
  <div id="container" style="padding: 15px">
    <el-dialog
      title="平账"
      :visible.sync="dialogFormVisible"
      style="width: 1200px; margin: 0 auto"
    >
      <el-form :model="pingzhangobj">
        <el-form-item label="操作" :label-width="formLabelWidth">
          <el-radio v-model="addOrRe" label="A">增加</el-radio>
          <el-radio v-model="addOrRe" label="R">减少</el-radio>
        </el-form-item>
        <el-form-item label="金额(元)" :label-width="formLabelWidth">
          <el-input
            v-model="pingzhangobj.recamount"
            style="width: 270px; float: left"
          />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="pingzhangobj.remarks"
            style="width: 270px; float: left"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="conclepingzhang()">取 消</el-button>
        <el-button type="primary" @click="pingzhang()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="续卡"
      :visible.sync="dialogFormVisible5"
      style="width: 1200px; margin: 0 auto"
    >
      <el-form :model="xuka">
        <el-form-item label="充值次数" :label-width="formLabelWidth">
          <el-input v-model="xuka.buytimes" style="width: 270px; float: left" />
        </el-form-item>
        <el-form-item label="实收金额" :label-width="formLabelWidth">
          <el-input
            v-model="xuka.sellingfee"
            style="width: 270px; float: left"
          />
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth">
          <el-select v-model="xuka.payments" style="width: 270px; float: left">
            <el-option
              v-for="item in payoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="续卡场馆" :label-width="formLabelWidth">
          <el-select v-model="xuka.storeid" style="width: 270px; float: left">
            <el-option
              v-for="item in theAllStores"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="销售人员" :label-width="formLabelWidth">
          <el-select v-model="xuka.saleid" style="width: 270px; float: left">
            <el-option
              v-for="item in bjxs"
              :key="item.userid"
              :label="item.name"
              :value="item.userid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息" :label-width="formLabelWidth">
          <el-input v-model="xuka.remarks" style="width: 270px; float: left" />
        </el-form-item>
        <el-form-item label="卡有效期" :label-width="formLabelWidth">
          <el-checkbox v-model="xuka.sz" style="float: left"
            >设置有效期</el-checkbox
          ><br />
          <el-date-picker
            v-model="xuka.mydate"
            style="margin-top: 5px; width: 270px"
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

    <el-dialog
      title="期限变更"
      :visible.sync="dialogFormVisible2"
      style="width: 1200px; margin: 0 auto"
    >
      <el-form :model="qixianobj">
        <el-form-item label="原期限" :label-width="formLabelWidth">
          <!-- <el-input v-if="qixianobj.isopen==0" style="width:270px;float:left">暂未开卡</el-input> -->
          <el-input
            v-model="qixianobj.oldbegin"
            style="width: 150px; float: left"
            disabled
          />
          <el-input
            v-model="qixianobj.oldend"
            style="width: 150px; float: left; margin-left: 10px"
            disabled
          />
        </el-form-item>
        <el-form-item label="修改期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="datevalue"
            style="margin-top: 5px"
            type="daterange"
            range-separator=""
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="qixianobj.remarks"
            style="width: 270px; float: left"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelqixian()">取 消</el-button>
        <el-button type="primary" @click="qixian()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="停卡"
      :visible.sync="dialogFormVisible3"
      style="width: 1200px; margin: 0 auto"
    >
      <el-form :model="stopcard">
        <el-form-item label="停卡期限" :label-width="formLabelWidth">
          <el-radio v-model="stoptype" label="P">永久停卡</el-radio>
          <el-radio v-model="stoptype" label="T">临时停卡</el-radio>
        </el-form-item>
        <el-form-item v-if="stoptype=='T'" label="停卡时间" :label-width="formLabelWidth"> 
          <el-date-picker v-model="stoptime" type="daterange"
           range-separator="-" start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
            style="width:270px;float:left">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="收款(元)" :label-width="formLabelWidth" v-if="stoptype=='T'">
            <el-input v-model="stopcard.recamount"  style="width:270px;float:left"></el-input>
        </el-form-item>
        <el-form-item v-if="stoptype == 'P'" label="退费(元)" :label-width="formLabelWidth">
          <el-input v-model="stopcard.fee" style="width: 270px; float: left" />
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth">
          <el-select
            v-model="stopcard.payments"
            style="width: 270px; float: left"
          >
            <el-option
              v-for="item in payoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="stopcard.remarks"
            style="width: 270px; float: left"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="conclecard()">取 消</el-button>
        <el-button type="primary" @click="stopcardtrue()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="扣卡"
      :visible.sync="dialogFormVisible4"
      style="width: 1200px; margin: 0 auto"
    >
      <el-form :model="recard">
        <el-form-item label="减少" :label-width="formLabelWidth">
          <el-input v-model="recard.times" style="width: 270px; float: left" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="recard.remarks"
            style="width: 270px; float: left"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="recardconcle()">取 消</el-button>
        <el-button type="primary" @click="recardtrue()">确 定</el-button>
      </div>
    </el-dialog>

    <el-tabs type="border-card" style="margin-top: 10px">
      <el-tab-pane label="会员详情">
        <div style="width: 150px; height: 150px; float: left">
          <img :src="img.originalpath" width="100px" height="100px" />
        </div>
        <div style="width: 350px; float: left">
          <span style="font-size: 24px; color: #307ef8">{{ query.name }}</span
          ><br />
          <span style="font-size: 15px">等级：lv{{ query.memgrade }}</span
          ><br />
          <span style="font-size: 15px">手机：{{ query.tel }}</span
          ><br />
          <span style="font-size: 15px">积分：{{ query.points }}</span
          ><br />
          <span style="font-size: 15px">时间：{{ query.createdon }}</span
          ><br />
        </div>
        <el-button type="primary" style="float: right" @click="toOpen(query)" size="mini"
          >编辑</el-button
        >
        <el-button type="primary" style="float: right;margin-right:20px" @click="tjgjjl" size="mini"
          >添加跟进记录</el-button
        >
      </el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card" style="margin-top: 10px" id="hyxq_1">

      <el-tab-pane label="会员分析">
        <div style="width: 100%; padding: 20px">
          <div style="width: 33%; float: left">
            <span style="font-size: 18px">消费总金额</span><br /><br /><br />
            <span style="font-size: 22px">￥{{ amount.sum }}元</span><br />
          </div>
          <div style="width: 33%; float: left">
            <span style="font-size: 18px">上课数</span><br /><br /><br />
            <span style="font-size: 22px">{{ courseAmount.count }}节</span
            ><br />
          </div>
          <div style="width: 33%; float: left">
            <span style="font-size: 18px">有效会员卡</span><br /><br /><br />
            <span style="font-size: 22px">{{ cardamount.count }}张</span><br />
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="会员卡信息">
        <el-button type="primary" size="mini" @click="sxhyk" style="float:right">失效会员卡</el-button>
        <el-button type="primary" size="mini" @click="yxhyk" style="float:right;margin-right:25px">有效会员卡</el-button>
        <br/>
        <el-table
          v-loading="listLoading" 
          :data="bindCardList"
          border
          fit
          highlight-current-row
          style="margin-top: 20px"
        >
          <el-table-column align="center" label="绑卡时间" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createdon }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="会员卡"
            width="250"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.cardname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.state == 1">正常</span>
              <span v-if="scope.row.state == 0">停卡</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="购卡金额" width="80">
            <template slot-scope="scope">
               <span>{{scope.row.sellingfee}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="余额" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.curtimes }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="期限" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.cardbegin }}</span
              >~
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
              <div v-if="scope.row.cardtype == 'P'">
                <el-button
                  v-if="scope.row.state == 1"
                  type="text"
                  @click="opencard(scope.row)"
                  >停卡</el-button
                >
                <el-button
                  v-if="scope.row.state == 0"
                  type="text"
                  @click="changestate(scope.row.cardno)"
                  >恢复</el-button
                >
                <el-button type="text" @click="openqixian(scope.row)">期限变更</el-button>
                <el-button type="text" @click="tpingzhang(scope.row)"
                  >平账</el-button
                >
              </div>
              <div v-if="scope.row.cardtype == 'S'">
                <el-button type="text" @click="openxuka(scope.row)"
                  >续卡</el-button
                >
                <el-button type="text" @click="openrecard(scope.row)"
                  >扣卡</el-button
                >
                <el-button
                  v-if="scope.row.state == 1"
                  type="text"
                  @click="opencard(scope.row)"
                  >停卡</el-button
                >
                <el-button
                  v-if="scope.row.state == 0"
                  type="text"
                  @click="changestate(scope.row.cardno)"
                  >恢复</el-button
                >
                <el-button type="text" @click="openqixian(scope.row)"
                  >期限变更</el-button
                >
                <el-button type="text" @click="tpingzhang(scope.row)"
                  >平账</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="消费记录">
        <!-- 预约记录 -->
        <div style="width:100%;height:270px;">
          <div style="width:100%;height:30px;">
              <span style="font-size:18px;line-height:30px">预约记录</span>
              <el-button type="text" style="float:right;line-height:10px;font-size:16px" @click="gengduo('#hyxq_2')">更多</el-button>
          </div>
          <hr/>
      <el-table
      :data="yuyuejilu4"
      style="width: 100%;font-size:13px;">
      <el-table-column
        prop="date"
        label="上课时间"
        width="200">
        <template slot-scope="scope">
        {{ scope.row.coursedate+' '+scope.row.coursetime }}
        </template>
      </el-table-column>
      <el-table-column
        prop="coursename"
        label="课程名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="类型"
        width="120">
        <template slot-scope="scope">
        {{ scope.row.cardtype=='T'?'团课':'私教'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="coachname"
        label="教练"
        width="120">
      </el-table-column>
      <el-table-column
        prop="courseprice"
        label="课程价格"
        width="150">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="name"
        label="预约状态"
        width="150">
        <template slot-scope="scope">
        <span v-if="scope.row.ordstate==1" style="color:green">
            已预约
          </span>
          <span v-if="scope.row.ordstate==2" style="color:red">
            已取消
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="签到状态"
        width="150">
        <template slot-scope="scope">
        <span v-if="scope.row.signstate==1" style="color:green">
            已签到
          </span>
          <span v-if="scope.row.signstate==0" style="color:red">
            未签到
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdon"
        label="预约时间"
        width="200">
      </el-table-column>
    </el-table>   
    </div>
    <br/><br/>
    <!-- 操作记录 -->
    <div style="width:100%;height:270px;">
      <div style="width:100%;height:30px;">
        <span style="font-size:18px;line-height:30px">操作记录</span>
        <el-button type="text" style="float:right;line-height:10px;font-size:16px" @click="gengduo('#hyxq_3')">更多</el-button>
      </div>
    <hr/>
      <el-table
      :data="caozuojilu4"
      style="width: 100%;font-size:13px;">
      <el-table-column
        prop="operatingtime"
        label="时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="vipcard"
        label="会员卡"
        width="300">
      </el-table-column>
      <el-table-column
        prop="operatingtype"
        label="操作项"
        width="120">
      </el-table-column>
      <el-table-column
        prop="operatingchange"
        label="变更"
        width="120">
         <template slot-scope="scope">
          <span v-if="getFirstcharacter(scope.row.operatingchange)" style="color:green">
            +{{scope.row.operatingchange}}
          </span>
          <span v-else style="color:red">
             {{scope.row.operatingchange}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operatingfee"
        label="金额"
        width="150">
        <template slot-scope="scope">
          <span v-if="getFirstcharacter(scope.row.operatingfee)" style="color:green">
            +{{scope.row.operatingfee}}
          </span>
          <span v-else style="color:red">
             {{scope.row.operatingfee}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operatingtheterm"
        label="期限"
        width="300">
      </el-table-column>
      <el-table-column
        prop="operatingpeople"
        label="操作人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="operatingremarks"
        label="备注">
      </el-table-column>
    </el-table>   
    </div>
    </el-tab-pane>

      <el-tab-pane label="跟进记录">
        <el-table :data="genjinall" style="width: 100%">
          <el-table-column prop="remarks" label="跟进内容"> </el-table-column>
          <el-table-column prop="createdname" label="跟进人" width="380">
          </el-table-column>
          <el-table-column prop="createdon" label="跟进时间" width="380">
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="体测信息">
        <el-tabs type="border-card" tab-position="right">
          <el-tab-pane label="体重">
            <span
              style="margin-left: 143px; margin-bottom: -50px; color: #307ef8;display:block" 
              class="danwei"
            >
              kg
            </span>

            <div
              id="tb1"
              style="
                width: 1500px;
                height: 255px;
                font-size: 80px;
                text-align: center;
                line-height: 255px;
              "
            ></div>
          </el-tab-pane>
          <el-tab-pane label="基础代谢">
            <span
              style="margin-left: 143px; margin-bottom: -50px; color: #307ef8;display:block"
              class="danwei"
            >
              cal
            </span>
            <div
              id="tb2"
              style="
                width: 1500px;
                height: 255px;
                font-size: 80px;
                text-align: center;
                line-height: 255px;
              "
            />
          </el-tab-pane>
          <el-tab-pane label="体脂率">
            <span
              style="margin-left: 143px; margin-bottom: -50px; color: #307ef8;display:block"
              class="danwei"
            >
              %
            </span>
            <div
              id="tb3"
              style="
                width: 1500px;
                height: 255px;
                font-size: 80px;
                text-align: center;
                line-height: 255px;
              "
            />
          </el-tab-pane>
          <el-tab-pane label="脂肪含量">
            <span
              style="margin-left: 143px; margin-bottom: -50px; color: #307ef8;display:block"
              class="danwei"
            >
              kg
            </span>
            <div
              id="tb4"
              style="
                width: 1500px;
                height: 255px;
                font-size: 80px;
                text-align: center;
                line-height: 255px;
              "
            />
          </el-tab-pane>
          <el-tab-pane label="骨骼肌">
            <span
              style="margin-left: 143px; margin-bottom: -50px; color: #307ef8;display:block"
              class="danwei"
            >
              kg
            </span>
            <div
              id="tb5"
              style="
                width: 1500px;
                height: 255px;
                font-size: 80px;
                text-align: center;
                line-height: 255px;
              "
            />
          </el-tab-pane>
        </el-tabs>
        <br />
        <el-button
          style="float: right"
          size="mini"
          type="primary"
          @click="tianjiatice()"
          >添加体测</el-button
        >
        <br />
        <el-table :data="ticeliebiao" style="width: 100%">
          <el-table-column prop="时间" label="体测时间" width="200">
          </el-table-column>
          <el-table-column prop="身高" label="身高(cm)" width="150">
          </el-table-column>
          <el-table-column prop="体重" label="体重(kg)" width="150">
          </el-table-column>
          <el-table-column prop="基础代谢" label="基础代谢(cal)" width="180">
          </el-table-column>
          <el-table-column prop="体脂率" label="体脂率(%)" width="150">
          </el-table-column>
          <el-table-column prop="脂肪含量" label="脂肪含量(kg)" width="180">
          </el-table-column>
          <el-table-column prop="骨骼肌含量" label="骨骼肌含量(kg)" width="180">
          </el-table-column>
          <el-table-column prop="胸围" label="胸围(cm)" width="150">
          </el-table-column>
          <el-table-column prop="腰围" label="腰围(cm)" width="150">
          </el-table-column>
          <el-table-column prop="name" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="bianjitice(scope.row)">编辑</el-button>
              <el-button type="text" @click="shanchutice(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <br />
      </el-tab-pane>
    </el-tabs>

    <div id="hyxq_2" style="display:none">
          <div style="width:100%;height:50px;">
              <span style="font-size:18px;line-height:60px">预约记录</span>
              <el-button type="primary" style="float:right;margin-top:15px" size="mini" @click="fanhui('#hyxq_2')">返回</el-button>
          </div>
          <hr/>
      <el-table
      :data="yuyuejilu4"
      style="width: 100%;font-size:13px;">
      <el-table-column
        prop="date"
        label="上课时间"
        width="200">
        <template slot-scope="scope">
        {{ scope.row.coursedate+' '+scope.row.coursetime }}
        </template>
      </el-table-column>
      <el-table-column
        prop="coursename"
        label="课程名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="类型"
        width="120">
        <template slot-scope="scope">
        {{ scope.row.cardtype=='T'?'团课':'私教'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="coachname"
        label="教练"
        width="120">
      </el-table-column>
      <el-table-column
        prop="courseprice"
        label="课程价格"
        width="150">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="name"
        label="预约状态"
        width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.ordstate==1" style="color:green">
            已预约
          </span>
          <span v-if="scope.row.ordstate==2" style="color:red">
            已取消
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="签到状态"
        width="150">
        <template slot-scope="scope">
         <span v-if="scope.row.signstate==1" style="color:green">
            已签到
          </span>
          <span v-if="scope.row.signstate==0" style="color:red">
            未签到
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdon"
        label="预约时间"
        width="200">
      </el-table-column>
    </el-table> 
    <pagination :total="total" :page.sync="fenye.page" :limit.sync="fenye.limit" style="float:right;" @pagination="getyuyuejilu()"/> 
    </div>

    <div id="hyxq_3" style="display:none">
          <div style="width:100%;height:50px;">
              <span style="font-size:18px;line-height:60px">操作记录</span>
              <el-button type="primary" style="float:right;margin-top:15px" size="mini" @click="fanhui('#hyxq_3')">返回</el-button>
          </div>
          <hr/>
      <el-table
      :data="caozuojilu4"
      style="width: 100%;font-size:13px;">
      <el-table-column
        prop="operatingtime"
        label="时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="vipcard"
        label="会员卡"
        width="300">
      </el-table-column>
      <el-table-column
        prop="operatingtype"
        label="操作项"
        width="120">
      </el-table-column>
      <el-table-column
        prop="operatingchange"
        label="变更"
        width="120">
         <template slot-scope="scope">
          <span v-if="getFirstcharacter(scope.row.operatingchange)" style="color:green">
            +{{scope.row.operatingchange}}
          </span>
          <span v-else style="color:red">
             {{scope.row.operatingchange}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operatingfee"
        label="金额"
        width="150">
        <template slot-scope="scope">
          <span v-if="getFirstcharacter(scope.row.operatingfee)" style="color:green">
            +{{scope.row.operatingfee}}
          </span>
          <span v-else style="color:red">
             {{scope.row.operatingfee}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operatingtheterm"
        label="期限"
        width="300">
      </el-table-column>
      <el-table-column
        prop="operatingpeople"
        label="操作人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="operatingremarks"
        label="备注">
      </el-table-column>
    </el-table>   
    <pagination :total="total" :page.sync="fenye.page" :limit.sync="fenye.limit" style="float:right;" @pagination="getcaozuojilu()"/> 
    </div>

    <el-dialog
      title="添加跟进记录"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="quxiao"
    >
      <el-input v-model="gjjltext" placeholder="跟进记录"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="addgjjl">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="体测信息"
      :visible.sync="dialogVisible2"
      width="25%"
      :before-close="quxiaoaddtice"
    >
      <div
        slot="footer"
        class="dialog-footer"
        style="margin-top: -60px; width: 400px; font-size: 14px"
      >
        体脂率：<el-input
          v-model="tice.tizhi"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        身高：<el-input
          v-model="tice.shengao"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        体重：<el-input
          v-model="tice.tizhong"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        基础代谢：<el-input
          v-model="tice.jichudaixie"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        大腿围L：<el-input
          v-model="tice.datuiweil"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        大腿围R：<el-input
          v-model="tice.datuiweir"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        小腿L：<el-input
          v-model="tice.xiaotuil"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        小腿R：<el-input
          v-model="tice.xiaotuir"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        手臂L：<el-input
          v-model="tice.shoubil"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        手臂R：<el-input
          v-model="tice.shoubir"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        胸围：<el-input
          v-model="tice.xiongwei"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        脂肪含量：<el-input
          v-model="tice.zhifang"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        骨骼肌含量：<el-input
          v-model="tice.gugeji"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        腰围：<el-input
          v-model="tice.yaowei"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br />
        臀围：<el-input
          v-model="tice.tunwei"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')"
        ></el-input>
        <br /><br />
        <el-button @click="quxiaoaddtice">取 消</el-button>
        <el-button type="primary" @click="addtice">确 定</el-button>
      </div>
    </el-dialog>
 <el-dialog title="会员编辑" :visible.sync="dialogFormVisible6" style="width:1200px;margin:0 auto">
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
                <el-option v-for="item in theAllStores" :key="item.id" :label="item.name" :value="item.id" />
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
            <el-button @click="dialogFormVisible6 = false">取 消</el-button>
            <el-button type="primary" @click="toTrueClose()">确 定</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import { Input } from "element-ui";
import data from "../pdf/content";
import { fetchList } from "@/api/hy";
import Pagination from "@/components/Pagination";
import $ from "jquery";

export default {
  components: { Pagination },
  data() {
    return {
      total:0,
      fenye:{
        page:1,
        limit:20
      },
      caozuojilu4:[],
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
     sources:[
         {id:0, name:'自然到店'},
         {id:1, name:'老带新'},
         {id:2, name:'拉访'},
         {id:3, name:'大众点评'},
         {id:4, name:'活动'},
         {id:5, name:'其他'}
            ],
      dialogFormVisible6:false,
      yuyuejilu4: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      img: {},
      amount: {},
      courseAmount: {},
      cardamount: {},
      bindCardList: [],
      listLoading: false,
      pingzhangShow: false,
      pingzhangobj: {},
      addOrRe: "A",
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      qixianobj: {},
      datevalue: {},
      stoptype: "P",
      stoptime:'',
      stopcard: {},
      payoption: [
        { label: "刷卡", value: "3" },
        { label: "扫码支付", value: "1" },
        { label: "转账", value: "2" },
        { label: "其他", value: "4" },
      ],
      dialogFormVisible4: false,
      recard: {},
      xuka: {
        sz: false,
        mydate: [],
      },
      dialogFormVisible5: false,
      theAllStores: [],
      bjxs: [],
      genjinall: [],
      dialogVisible: false,
      dialogVisible2: false,
      gjjltext: "",
      ticeliebiao: [],
      tice: {
        tizhi: "",
        shengao: "",
        tizhong: "",
        jichudaixie: "",
        datuiweil: "",
        datuiweir: "",
        xiaotuil: "",
        xiaotuir: "",
        shoubil: "",
        shoubir: "",
        xiongwei: "",
        zhifang: "",
        gugeji: "",
        yaowei: "",
        tunwei: "",
        userid: "",
        createdby: "",
        createdname: "",
        createdon:""
      },
      ticetype:''
    };
  },
  created() {
    this.query = this.$route.query.item
    this.getAllxs()
    this.getAllStore2()
    this.getImg()
    this.getAmount()
    this.getCourseAmount()
    this.getCardAmount()
    this.yxhyk()
    this.genjinjilu()
    this.getyuyuejilu4()
    this.getcaozuojilu4()
  },
  mounted() {
    this.getticeliebiao();
  },
  methods: {
    getFirstcharacter(e){
      if(String(e).substr(0,1)!='-'){
        return true
      }
      return false
    },
    getAllxs() {
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24B21OYFT1UZ",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          var noxs={name:'暂无销售', userid:0}
            this.bjxs=res.data.rows
            this.bjxs.unshift(noxs)
        });
    },
    getAllStore2() {
      this.$axios
        .post("https://www.facebodyfitness.com/hi/main?hi=24BACFMEVSWV", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.theAllStores = res.data.rows;
        });
    },
    getImg() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBCTZ",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.img = res.data.rows[0];
        });
    },
    getAmount() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBD03",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.amount = res.data.rows[0];
        });
    },
    getCourseAmount() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBD2Q",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.courseAmount = res.data.rows[0];
        });
    },
    getCardAmount() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBD1I",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.cardamount = res.data.rows[0];
        });
    },
    yxhyk() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLODOA9",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.bindCardList = res.data.rows;
        });
    },
    sxhyk() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLODOAH",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.bindCardList = res.data.rows;
        });
    },
    //点击打开用户信息编辑弹窗
        toOpen(e){
          this.dialogFormVisible6=true
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
          this.dialogFormVisible6=false
          this.updateUser()
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
    tpingzhang(e) {
      this.pingzhangobj.cardno = e.cardno;
      this.pingzhangobj.cardid = e.cardid;
      this.pingzhangobj.cardname = e.cardname;
      this.pingzhangobj.typeid = e.typeid;
      this.pingzhangobj.cardid = e.cardid;
      this.dialogFormVisible = true;
    },
    conclepingzhang() {
      this.dialogFormVisible = false;
      this.pingzhangobj = {};
    },
    pingzhang() {
      if (this.addOrRe == "A") {
        this.pingzhangobj.rectype = "A";
      } else if (this.addOrRe == "R") {
        this.pingzhangobj.rectype = "R";
        this.pingzhangobj.recamount = 0 - this.pingzhangobj.recamount;
      }
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBH6B",
          this.$qs.stringify(this.pingzhangobj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.dialogFormVisible = false;
          this.pingzhangobj = {};
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    cancelqixian() {
      this.dialogFormVisible2 = false;
      this.qixianobj = {};
    },
    openqixian(e) {
      this.qixianobj.cardno = e.cardno;
      this.qixianobj.cardid = e.cardid;
      this.qixianobj.cardname = e.cardname;
      this.qixianobj.typeid = e.typeid;
      this.qixianobj.cardid = e.cardid;
      this.qixianobj.oldbegin = e.cardbegin;
      this.qixianobj.oldend = e.cardend;
      this.qixianobj.userid =this.query.userid;
      this.qixianobj.isopen=e.isopen
      this.dialogFormVisible2 = true;
    },
    qixian() {
      this.qixianobj.newbegin = this.datevalue[0]
        .toLocaleDateString()
        .replace(/\//g, "-");
      this.qixianobj.newend = this.datevalue[1]
        .toLocaleDateString()
        .replace(/\//g, "-");
        if(this.qixianobj.isopen==false||this.qixianobj.isopen==''||this.qixianobj.isopen==null){    
          this.$axios
            .post(
              "https://www.facebodyfitness.com/hi/main?hi=24CQRLLODE1I",
              this.$qs.stringify(this.qixianobj),
              { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            )
            .then((res) => {
            })
            .catch((error) => {
              this.$message.error("错了哦，这是一条错误消息");
            });
        }

      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBH95",
          this.$qs.stringify(this.qixianobj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.dialogFormVisible2 = false;
          this.yxhyk();
          this.qixianobj = {};
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    conclecard() {
      this.dialogFormVisible3 = false;
      this.stopcard = {};
    },
    stopcardtrue() {
      this.stopcard.stoptype = this.stoptype;
      this.stopcard.createdby = localStorage.getItem("userid");
      this.stopcard.createdname = localStorage.getItem("username");
      if(this.stopcard.stoptype=='T'){
        this.stopcard.disablebegin=this.stoptime[0]
        this.stopcard.disableend=this.stoptime[1]
      }
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHEG",
          this.$qs.stringify(this.stopcard),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.dialogFormVisible3 = false;
          this.yxhyk();
          this.stopcard = {};
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    opencard(e) {
      this.dialogFormVisible3 = true;
      this.stopcard.cardno = e.cardno;
      this.stopcard.cardid = e.cardid;
      this.stopcard.cardname = e.cardname;
      this.stopcard.typeid = e.typeid;
      this.stopcard.curtimes = e.curtimes;
    },
    changestate(e) {
      var obj = {};
      obj.cardno = e;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNC79E",
          this.$qs.stringify(obj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.yxhyk();
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    openrecard(e) {
      this.dialogFormVisible4 = true;
      this.recard.cardno = e.cardno;
      this.recard.cardid = e.cardid;
      this.recard.cardname = e.cardname;
      this.recard.typeid = e.typeid;
      this.recard.originalfee = e.originalfee;
    },
    recardconcle() {
      this.dialogFormVisible4 = false;
      this.recard = {};
    },
    recardtrue() {
      var arr = [];
      var obj = {};
      obj.UserId = this.query.userid + "";
      obj.UserName = this.query.name;
      arr.push(obj);
      this.recard.usersjson = JSON.stringify(arr);
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBHBZ",
          this.$qs.stringify(this.recard),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.dialogFormVisible4 = false;
          this.yxhyk();
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    openxuka(e) {
      this.dialogFormVisible5 = true;
      this.xuka.cardid = e.cardid;
      this.xuka.cardno = e.cardno;
      this.xuka.cardname = e.cardname;
      this.xuka.buytype = "C";
      this.xuka.cardbegin = e.cardbegin;
      this.xuka.cardend = e.cardend;
    },
    conclexuka() {
      this.dialogFormVisible5 = false;
    },
    xukatrue() {
      this.bjxs.forEach((item) => {
        if (this.xuka.saleid == item.userid) {
          this.xuka.salename = item.name;
        }
      });
      this.theAllStores.forEach((item) => {
        if (item.id == this.xuka.storeid) {
          this.xuka.storename = item.name;
        }
      });
      if (this.xuka.sz == false) {
        this.xuka1();
      } else {
        this.xuka.cardbegin = this.xuka.mydate[0]
          .toLocaleDateString()
          .replace(/\//g, "-");
        this.xuka.cardend = this.xuka.mydate[1]
          .toLocaleDateString()
          .replace(/\//g, "-");
        this.xuka2();
      }
    },
    xuka1() {
      //无续卡时间
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNDSAB",
          this.$qs.stringify(this.xuka),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.xuka = {};
          this.xuka.sz = false;
          this.mydate = [];
          this.dialogFormVisible5 = false;
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    xuka2() {
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNDSGP",
          this.$qs.stringify(this.xuka),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.xuka = {};
          this.xuka.sz = false;
          this.mydate = [];
          this.dialogFormVisible5 = false;
          this.$message({
            message: "恭喜你，操作成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    genjinjilu() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24BACFMEV7T4",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.genjinall = res.data.rows;
        });
    },
    tjgjjl() {
      this.dialogVisible = true;
    },
    quxiao() {
      this.dialogVisible = false;
      this.gjjltext = "";
    },
    addgjjl() {
      var data = {};
      data.userid = this.query.userid;
      data.remarks = this.gjjltext;
      data.createdby = localStorage.getItem("userid");
      data.createdname = localStorage.getItem("username");
      data.createdip = "127.0.0.1";
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLO6X6B",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.genjinjilu();
        });
      this.dialogVisible = false;
      this.gjjltext = "";
    },
    tcxxtu() {
      if (this.ticeliebiao.length <= 0) {
        $(".danwei").text("没有数据哦,赶快添加一条吧>_<");
        $("#tb1,#tb2,#tb3,#tb4,#tb5").html('');
      } else {
        var danwei = document.getElementsByClassName("danwei");
        danwei[0].innerText  = "kg";
        danwei[1].innerText  = "cal";
        danwei[2].innerText  = "%";
        danwei[3].innerText  = "kg";
        danwei[4].innerText  = "kg";
        const tb1 = this.$echarts.init(document.getElementById("tb1"));
        var shijian = new Array();
        var tizhong = new Array();
        var jichudaixie = new Array();
        var tizhilv = new Array();
        var zhifang = new Array();
        var gugeji = new Array();
        for (var i = 0; i < this.ticeliebiao.length; i++) {
          shijian.push(this.ticeliebiao[i].时间);
          tizhong.push(
            this.ticeliebiao[i].体重 != null ? this.ticeliebiao[i].体重 : 0
          );
          jichudaixie.push(
            this.ticeliebiao[i].基础代谢 != null
              ? this.ticeliebiao[i].基础代谢
              : 0
          );
          tizhilv.push(
            this.ticeliebiao[i].体脂率 != null ? this.ticeliebiao[i].体脂率 : 0
          );
          zhifang.push(
            this.ticeliebiao[i].脂肪含量 != null
              ? this.ticeliebiao[i].脂肪含量
              : 0
          );
          gugeji.push(
            this.ticeliebiao[i].骨骼肌含量 != null
              ? this.ticeliebiao[i].骨骼肌含量
              : 0
          );
        }
        tb1.setOption({
          label: {
            show: true,
            position: "top",
            color: "#333",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: {
            type: "category",
            data: shijian,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: tizhong,
              type: "line",
            },
          ],
        });
        const tb2 = this.$echarts.init(document.getElementById("tb2"));
        tb2.setOption({
          label: {
            show: true,
            position: "top",
            color: "#333",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: {
            type: "category",
            data: shijian,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: jichudaixie,
              type: "line",
            },
          ],
        });
        const tb3 = this.$echarts.init(document.getElementById("tb3"));
        tb3.setOption({
          label: {
            show: true,
            position: "top",
            color: "#333",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: {
            type: "category",
            data: shijian,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: tizhilv,
              type: "line",
            },
          ],
        });
        const tb4 = this.$echarts.init(document.getElementById("tb4"));
        tb4.setOption({
          label: {
            show: true,
            position: "top",
            color: "#333",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: {
            type: "category",
            data: shijian,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: zhifang,
              type: "line",
            },
          ],
        });
        const tb5 = this.$echarts.init(document.getElementById("tb5"));
        tb5.setOption({
          label: {
            show: true,
            position: "top",
            color: "#333",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: {
            type: "category",
            data: shijian,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: gugeji,
              type: "line",
            },
          ],
        });
      }
    },
    getticeliebiao() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/CCourse/ticeliebiao",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.ticeliebiao = res.data;
          this.tcxxtu();
        });
    },
    addtice() {
      this.tice.createdby = localStorage.getItem("userid");
      this.tice.createdname = localStorage.getItem("username");
      this.tice.userid = this.query.userid;
      if(this.ticetype=='insert'){
        this.$axios
        .post(
          "http://localhost:8081/web/CCourse/inserttice",
          this.$qs.stringify(this.tice),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.getticeliebiao();
          this.quxiaoaddtice();
        });
      }else if(this.ticetype=='update'){
        this.$axios
        .post(
          "http://localhost:8081/web/CCourse/updatetice",
          this.$qs.stringify(this.tice),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.getticeliebiao();
          this.quxiaoaddtice();
          
        });
      }


      
    },
    quxiaoaddtice() {
      this.dialogVisible2 = false;
      this.tice.tizhi = "";
      this.tice.shengao = "";
      this.tice.tizhong = "";
      this.tice.jichudaixie = "";
      this.tice.datuiweil = "";
      this.tice.datuiweir = "";
      this.tice.xiaotuil = "";
      this.tice.xiaotuir = "";
      this.tice.shoubil = "";
      this.tice.shoubir = "";
      this.tice.xiongwei = "";
      this.tice.zhifang = "";
      this.tice.gugeji = "";
      this.tice.yaowei = "";
      this.tice.tunwei = "";
    },
    deletetice(e) {
      var data = {};
      data.time = e.时间;
      data.userid = this.query.userid;
      this.$axios
        .post(
          "http://localhost:8081/web/CCourse/deletetice",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.getticeliebiao();
          this.$message({
            message: "已删除",
            type: "success",
          });
        });
    },
    shanchutice(e) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deletetice(e);
        })
        .catch(() => {});
    },
    tianjiatice(){
      this.ticetype='insert'
      this.dialogVisible2 = true;
    },
    bianjitice(e){  
      this.tice.tizhi = e.体脂率
      this.tice.shengao = e.身高
      this.tice.tizhong = e.体重
      this.tice.jichudaixie = e.基础代谢
      this.tice.datuiweil = e.大腿围L
      this.tice.datuiweir = e.大腿围R
      this.tice.xiaotuil = e.小腿L
      this.tice.xiaotuir = e.小腿R
      this.tice.shoubil = e.手臂L
      this.tice.shoubir = e.手臂R
      this.tice.xiongwei = e.胸围
      this.tice.zhifang = e.脂肪含量
      this.tice.gugeji = e.骨骼肌含量
      this.tice.yaowei = e.腰围
      this.tice.tunwei = e.臀围
      this.tice.createdon = e.时间
      this.ticetype='update'
      this.dialogVisible2 = true;
    },
    gengduo(e){
      
      if(e=='#hyxq_2'){
        this.getyuyuejilu()
      }else if(e=='#hyxq_3'){
        this.getcaozuojilu()
      }
        $("#hyxq_1").css("display","none")
        $(e).css("display","block")
    },
    fanhui(e){
      if(e=='#hyxq_2'){
        this.getyuyuejilu4()
      }else if(e=='#hyxq_3'){
        this.getcaozuojilu4()
      }
        $("#hyxq_1").css("display","block")
        $(e).css("display","none")
    },
    getyuyuejilu4(){
      var data={}
      data.userid=this.query.userid
      data.limit=4
      data.page=0
        this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24BACFMEVC9U",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.yuyuejilu4=res.data.rows
        });
    },
    getyuyuejilu(){
      var data={}
      data.userid=this.query.userid
      data.limit=this.fenye.limit
      data.page=this.fenye.page-1
        this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24BACFMEVC9U",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.yuyuejilu4=res.data.rows
          if(res.data.rows.length>0){
            this.total=res.data.rows[0].yuyuetotal
          }
        });
    },    
    getcaozuojilu4(){
      var data={}
      data.userid=this.query.userid
      data.limit=4
      data.page=0
        this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLOCH1H",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.caozuojilu4=res.data.rows
        });
    },
    getcaozuojilu(){
      var data={}
      data.userid=this.query.userid
      data.limit=this.fenye.limit
      data.page=this.fenye.page-1
        this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLOCH1H",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.caozuojilu4=res.data.rows
          if(res.data.rows.length>0){
          var data2={}
          data2.userid=this.query.userid
          data2.limit=999999
          data2.page=0
          this.$axios
          .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLOCH1H",
          this.$qs.stringify(data2),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
        .then((res) => {
          this.total=res.data.rows.length
        });
            
        }
        });
    }

  },
};
</script>

<style scoped>
  
</style>

