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
            v-model="qixianobj.day1"
            style="width: 150px; float: left"
            disabled
          />
          <el-input
            v-model="qixianobj.day2"
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
        <el-form-item
          v-if="stoptype == 'T'"
          label="停卡时间"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="stoptime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
            style="width: 270px; float: left"
          />
        </el-form-item>
        <el-form-item
          v-if="stoptype == 'T'"
          label="收款(元)"
          :label-width="formLabelWidth"
        >
          <el-input v-model="stopcard.fee" style="width: 270px; float: left" />
        </el-form-item>
        <el-form-item
          v-if="stoptype == 'P'"
          label="退费(元)"
          :label-width="formLabelWidth"
        >
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
        <el-button type="primary" @click="stopcardtrue()">确 定</el-button>
        <el-button @click="conclecard()">取 消</el-button>
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
          <img :src="img" width="100px" height="100px" />
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
        <el-button
          type="primary"
          style="float: right; margin-right: 20px"
          size="mini"
          @click="tjgjjl"
          >添加跟进记录</el-button
        >
      </el-tab-pane>
    </el-tabs>

    <el-tabs id="hyxq_1" type="border-card" style="margin-top: 10px">
      <el-tab-pane label="会员分析">
        <div style="width: 100%; padding: 20px">
          <div style="width: 33%; float: left">
            <span style="font-size: 18px">消费总金额</span><br /><br /><br />
            <span style="font-size: 22px">￥{{ amount }}元</span><br />
          </div>
          <div style="width: 33%; float: left">
            <span style="font-size: 18px">上课数</span><br /><br /><br />
            <span style="font-size: 22px">{{ courseAmount }}节</span><br />
          </div>
          <div style="width: 33%; float: left">
            <span style="font-size: 18px">有效会员卡</span><br /><br /><br />
            <span style="font-size: 22px">{{ cardamount }}张</span><br />
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="会员卡信息">
        <el-button
          type="primary"
          size="mini"
          style="float: right"
          @click="sxhyk"
          >失效会员卡</el-button
        >
        <el-button
          type="primary"
          size="mini"
          style="float: right; margin-right: 25px"
          @click="getCardAmount"
          >有效会员卡</el-button
        >
        <br />
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

          <el-table-column align="center" label="会员卡" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.cardname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.state == 1">正常</span>
              <span v-if="scope.row.state == 0">停卡</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="是否开卡" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.isopen == true">是</span>
              <span v-if="scope.row.state == false">否</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="购卡金额" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.sellingfee }}</span>
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
              <div v-if="scope.row.lastedby != '转卡'">
                <div v-if="scope.row.cardtype == 'P'">
                  <el-button
                    v-if="scope.row.state == 1 && isyx"
                    type="text"
                    @click="opencard(scope.row)"
                    >停卡</el-button
                  >
                  <el-button
                    v-if="scope.row.state == 0 && isyx"
                    type="text"
                    @click="changestate(scope.row.cardno)"
                    >恢复</el-button
                  >
                  <el-button type="text" @click="openqixian(scope.row)"
                    >期限变更</el-button
                  >
                  <el-button
                    type="text"
                    @click="tpingzhang(scope.row)"
                    v-if="isyx"
                    >平账</el-button
                  >
                  <el-button type="text" @click="zhuanka(scope.row)" v-if="isyx"
                    >转卡</el-button
                  >
                </div>
                <div v-if="scope.row.cardtype == 'S'">
                  <el-button type="text" @click="openxuka(scope.row)"
                    >续卡</el-button
                  >
                  <el-button
                    type="text"
                    @click="openrecard(scope.row)"
                    v-if="isyx"
                    >扣卡</el-button
                  >
                  <el-button
                    v-if="scope.row.state == 1 && isyx"
                    type="text"
                    @click="opencard(scope.row)"
                    >停卡</el-button
                  >
                  <el-button
                    v-if="scope.row.state == 0 && isyx"
                    type="text"
                    @click="changestate(scope.row.cardno)"
                    >恢复</el-button
                  >
                  <el-button type="text" @click="openqixian(scope.row)"
                    >期限变更</el-button
                  >
                  <el-button
                    type="text"
                    @click="tpingzhang(scope.row)"
                    v-if="isyx"
                    >平账</el-button
                  >
                  <el-button type="text" @click="zhuanka(scope.row)" v-if="isyx"
                    >转卡</el-button
                  >
                </div>
              </div>
              <div v-else>此卡已转，无法操作</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="消费记录">
        <!-- 预约记录 -->
        <div style="width: 100%; height: 260px">
          <div style="width: 100%; height: 30px">
            <span style="font-size: 18px; line-height: 30px">预约记录</span>
            <el-button
              type="text"
              style="float: right; line-height: 10px; font-size: 16px"
              @click="gengduo('#hyxq_2')"
              >更多</el-button
            >
          </div>
          <hr />
          <el-table :data="yuyuejilu" style="width: 100%; font-size: 13px">
            <el-table-column prop="date" label="上课时间" width="200">
              <template slot-scope="scope">
                {{
                  scope.row.coursedate.slice(0, 10) +
                  " " +
                  scope.row.coursetime.slice(10)
                }}
              </template>
            </el-table-column>
            <el-table-column prop="coursename" label="课程名称" width="200" />
            <el-table-column prop="name" label="类型" width="120">
              <template slot-scope="scope">
                {{ scope.row.cardtype == "T" ? "团课" : "私教" }}
              </template>
            </el-table-column>
            <el-table-column prop="coachname" label="教练" width="120" />
            <el-table-column prop="courseprice" label="课程价格" width="150" />
            <el-table-column prop="remarks" label="备注" />
            <el-table-column prop="name" label="预约状态" width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.ordstate == 1" style="color: green">
                  已预约
                </span>
                <span v-if="scope.row.ordstate == 2" style="color: red">
                  已取消
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="签到状态" width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.signstate == 1" style="color: green">
                  已签到
                </span>
                <span v-if="scope.row.signstate == 0" style="color: red">
                  未签到
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="createdon" label="预约时间" width="200" />
          </el-table>
        </div>
        <br /><br />
        <!-- 操作记录 -->
        <div style="width: 100%; height: 260px">
          <div style="width: 100%; height: 30px">
            <span style="font-size: 18px; line-height: 30px">操作记录</span>
            <el-button
              type="text"
              style="float: right; line-height: 10px; font-size: 16px"
              @click="gengduo('#hyxq_3')"
              >更多</el-button
            >
          </div>
          <hr />
          <el-table :data="caozuojilu" style="width: 100%; font-size: 13px">
            <el-table-column prop="operatingtime" label="时间" width="200" />
            <el-table-column prop="vipcard" label="会员卡" width="300" />
            <el-table-column prop="operatingtype" label="操作项" width="120" />
            <el-table-column prop="operatingchange" label="变更" width="120">
              <template slot-scope="scope">
                <span
                  v-if="getFirstcharacter(scope.row.operatingchange)"
                  style="color: green"
                >
                  {{ scope.row.operatingchange }}
                </span>
                <span v-else style="color: red">
                  {{ scope.row.operatingchange }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="operatingfee" label="金额" width="150">
              <template slot-scope="scope">
                <span
                  v-if="getFirstcharacter(scope.row.operatingfee)"
                  style="color: green"
                >
                  {{ scope.row.operatingfee }}
                </span>
                <span v-else style="color: red">
                  {{ scope.row.operatingfee }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="operatingtheterm" label="期限" width="300" />
            <el-table-column
              prop="operatingpeople"
              label="操作人"
              width="150"
            />
            <el-table-column prop="operatingremarks" label="备注" />
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="跟进记录">
        <el-table :data="genjinall" style="width: 100%">
          <el-table-column prop="remarks" label="跟进内容" />
          <el-table-column prop="createdname" label="跟进人" width="380" />
          <el-table-column prop="createdon" label="跟进时间" width="380" />
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="体测信息">
        <el-tabs type="border-card" tab-position="right">
          <el-tab-pane label="体重">
            <span
              style="
                margin-left: 143px;
                margin-bottom: -50px;
                color: #307ef8;
                display: block;
              "
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
            />
          </el-tab-pane>
          <el-tab-pane label="基础代谢">
            <span
              style="
                margin-left: 143px;
                margin-bottom: -50px;
                color: #307ef8;
                display: block;
              "
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
              style="
                margin-left: 143px;
                margin-bottom: -50px;
                color: #307ef8;
                display: block;
              "
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
              style="
                margin-left: 143px;
                margin-bottom: -50px;
                color: #307ef8;
                display: block;
              "
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
              style="
                margin-left: 143px;
                margin-bottom: -50px;
                color: #307ef8;
                display: block;
              "
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
          <el-table-column prop="时间" label="体测时间" width="200" />
          <el-table-column prop="身高" label="身高(cm)" width="150" />
          <el-table-column prop="体重" label="体重(kg)" width="150" />
          <el-table-column prop="基础代谢" label="基础代谢(cal)" width="180" />
          <el-table-column prop="体脂率" label="体脂率(%)" width="150" />
          <el-table-column prop="脂肪含量" label="脂肪含量(kg)" width="180" />
          <el-table-column
            prop="骨骼肌含量"
            label="骨骼肌含量(kg)"
            width="180"
          />
          <el-table-column prop="胸围" label="胸围(cm)" width="150" />
          <el-table-column prop="腰围" label="腰围(cm)" width="150" />
          <el-table-column prop="name" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="bianjitice(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="shanchutice(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <br />
      </el-tab-pane>
    </el-tabs>

    <div id="hyxq_2" style="display: none">
      <div style="width: 100%; height: 50px">
        <span style="font-size: 18px; line-height: 60px">预约记录</span>
        <el-button
          type="primary"
          style="float: right; margin-top: 15px"
          size="mini"
          @click="fanhui('#hyxq_2')"
          >返回</el-button
        >
      </div>
      <hr />
      <el-table :data="yuyuejilu" style="width: 100%; font-size: 13px">
        <el-table-column prop="date" label="上课时间" width="200">
          <template slot-scope="scope">
            {{
              scope.row.coursedate.slice(0, 10) +
              " " +
              scope.row.coursetime.slice(10)
            }}
          </template>
        </el-table-column>
        <el-table-column prop="coursename" label="课程名称" width="200" />
        <el-table-column prop="name" label="类型" width="120">
          <template slot-scope="scope">
            {{ scope.row.cardtype == "T" ? "团课" : "私教" }}
          </template>
        </el-table-column>
        <el-table-column prop="coachname" label="教练" width="120" />
        <el-table-column prop="courseprice" label="课程价格" width="150" />
        <el-table-column prop="remarks" label="备注" />
        <el-table-column prop="name" label="预约状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.ordstate == 1" style="color: green">
              已预约
            </span>
            <span v-if="scope.row.ordstate == 2" style="color: red">
              已取消
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="签到状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.signstate == 1" style="color: green">
              已签到
            </span>
            <span v-if="scope.row.signstate == 0" style="color: red">
              未签到
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createdon" label="预约时间" width="200" />
      </el-table>
      <pagination
        :total="total"
        :page.sync="fenye.page"
        :limit.sync="fenye.limit"
        style="float: right"
        @pagination="getyuyuejilu()"
      />
    </div>

    <div id="hyxq_3" style="display: none">
      <div style="width: 100%; height: 50px">
        <span style="font-size: 18px; line-height: 60px">操作记录</span>
        <el-button
          type="primary"
          style="float: right; margin-top: 15px"
          size="mini"
          @click="fanhui('#hyxq_3')"
          >返回</el-button
        >
      </div>
      <hr />
      <el-table :data="caozuojilu" style="width: 100%; font-size: 13px">
        <el-table-column prop="operatingtime" label="时间" width="200" />
        <el-table-column prop="vipcard" label="会员卡" width="300" />
        <el-table-column prop="operatingtype" label="操作项" width="120" />
        <el-table-column prop="operatingchange" label="变更" width="120">
          <template slot-scope="scope">
            <span
              v-if="getFirstcharacter(scope.row.operatingchange)"
              style="color: green"
            >
              {{ scope.row.operatingchange }}
            </span>
            <span v-else style="color: red">
              {{ scope.row.operatingchange }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="operatingfee" label="金额" width="150">
          <template slot-scope="scope">
            <span
              v-if="getFirstcharacter(scope.row.operatingfee)"
              style="color: green"
            >
              {{ scope.row.operatingfee }}
            </span>
            <span v-else style="color: red">
              {{ scope.row.operatingfee }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="operatingtheterm" label="期限" width="300" />
        <el-table-column prop="operatingpeople" label="操作人" width="150" />
        <el-table-column prop="operatingremarks" label="备注" />
      </el-table>
      <pagination
        :total="total"
        :page.sync="fenye.page"
        :limit.sync="fenye.limit"
        style="float: right"
        @pagination="getcaozuojilu()"
      />
    </div>

    <el-dialog
      title="添加跟进记录"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="quxiao"
    >
      <el-input v-model="gjjltext" placeholder="跟进记录" />
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
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        身高：<el-input
          v-model="tice.shengao"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        体重：<el-input
          v-model="tice.tizhong"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        基础代谢：<el-input
          v-model="tice.jichudaixie"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        大腿围L：<el-input
          v-model="tice.datuiweil"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        大腿围R：<el-input
          v-model="tice.datuiweir"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        小腿L：<el-input
          v-model="tice.xiaotuil"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        小腿R：<el-input
          v-model="tice.xiaotuir"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        手臂L：<el-input
          v-model="tice.shoubil"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        手臂R：<el-input
          v-model="tice.shoubir"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        胸围：<el-input
          v-model="tice.xiongwei"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        脂肪含量：<el-input
          v-model="tice.zhifang"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        骨骼肌含量：<el-input
          v-model="tice.gugeji"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        腰围：<el-input
          v-model="tice.yaowei"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br />
        臀围：<el-input
          v-model="tice.tunwei"
          placeholder="请输入数字"
          style="width: 300px; margin-top: 5px"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
        />
        <br /><br />
        <el-button @click="quxiaoaddtice">取 消</el-button>
        <el-button type="primary" @click="addtice">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="转卡" :visible.sync="zkdialogVisible" width="26%">
      <el-tabs>
        <el-tab-pane label="全部转出">
          <el-form label-width="100px">
            <el-form-item label="姓名">
              <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                style="width: 300px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                v-model="zk.zkyxq"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 300px"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-form>
          <el-button type="primary" style="margin-left: 71%" @click="qdzk(1)"
            >确 定</el-button
          >
        </el-tab-pane>
        <el-tab-pane v-if="zktype == 'S'" label="部分转出">
          <el-form label-width="100px">
            <el-form-item label="姓名">
              <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                style="width: 300px"
                @select="handleSelect"
              />
            </el-form-item>
            <el-form-item label="次数">
              <el-input-number v-model="zkcs" :min="1" :max="1000" />
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                v-model="zk.zkyxq"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 300px"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-form>
          <el-button type="primary" style="margin-left: 71%" @click="qdzk(2)"
            >确 定</el-button
          >
        </el-tab-pane>
      </el-tabs>
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
      total: 0,
      fenye: {
        page: 1,
        limit: 20,
      },
      caozuojilu: [],
      zkdialogVisible: false,
      state: "",
      zk: {
        zkid: "",
        zkyxq: "",
      },
      zkclass: {},
      zkcs: 1,
      zktype: "",
      yuyuejilu: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      img: "",
      amount: 0,
      courseAmount: 0,
      cardamount: 0,
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
      stoptime: "",
      stopcard: {},
      payoption: [
        { label: "刷卡", value: "3" },
        { label: "扫码支付", value: "1" },
        { label: "转账", value: "2" },
        { label: "其他", value: "4" },
      ],
      dialogFormVisible4: false,
      recard: {},
      xuka: {},
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
        createdon: "",
      },
      ticetype: "",
      isyx: false,
    };
  },
  created() {
    this.query = this.$route.query.item;
    this.getAllxs();
    this.getAllStore();
    this.getImg();
    this.getAmount();
    this.getCourseAmount();
    this.getCardAmount();
    this.genjinjilu();
    this.getyuyuejilu4();
    this.getcaozuojilu4();
  },
  mounted() {
    this.getticeliebiao();
  },
  methods: {
    getFirstcharacter(e) {
      if (String(e).substr(0, 1) != "-") {
        return true;
      }
      return false;
    },
    getAllxs() {
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getXiaoshou", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          var noxs = { name: "暂无销售", userid: 0 };
          this.bjxs = res.data;
          this.bjxs.unshift(noxs);
        });
    },
    getAllStore() {
      this.$axios
        .post("https://www.facebodyfitness.com/web/new/getStoreIdAll", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          this.theAllStores = res.data;
        });
    },
    getImg() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getImage",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          if (res.data != null) {
            this.img = res.data.img;
          }
        });
    },
    getAmount() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getAmount",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          if (res.data != null) {
            this.amount = res.data.sum;
          }
        });
    },
    getCourseAmount() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getCourseAmount",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          if (res.data != null) {
            this.courseAmount = res.data.count;
          }
        });
    },
    getCardAmount() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getCardByUserid",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.cardamount = res.data.length;
          this.bindCardList = res.data;
          this.isyx = true;
        });
    },
    sxhyk() {
      var data = {};
      data.userid = this.query.userid;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getCardByUseridsx",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.bindCardList = res.data;
          this.isyx = false;
        });
    },
    tpingzhang(e) {
      this.pingzhangobj.cardno = e.cardno;
      this.pingzhangobj.cardid = e.cardid;
      this.pingzhangobj.cardname = e.cardname;
      this.pingzhangobj.typeid = e.typeid;
      this.pingzhangobj.cardid = e.cardid;
      this.pingzhangobj.userid = this.query.userid;
      this.dialogFormVisible = true;
    },
    conclepingzhang() {
      this.dialogFormVisible = false;
      this.pingzhangobj = {};
    },
    pingzhang() {
      if (
        this.pingzhangobj.recamount == "" ||
        this.pingzhangobj.recamount == undefined
      ) {
        this.$message.error("信息填写不完整");
        return;
      }
      if (this.addOrRe == "A") {
        this.pingzhangobj.rectype = "A";
      } else if (this.addOrRe == "R") {
        this.pingzhangobj.rectype = "R";
        this.pingzhangobj.recamount = 0 - this.pingzhangobj.recamount;
      }
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/pingzhang",
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
      this.qixianobj.day1 = e.cardbegin;
      this.qixianobj.day2 = e.cardend;
      this.qixianobj.userid = this.query.userid;
      this.qixianobj.cardtype = e.cardtype;
      this.dialogFormVisible2 = true;
    },
    qixian() {
      if (
        this.datevalue[0] == "" ||
        this.datevalue[0] == undefined ||
        this.datevalue[1] == "" ||
        this.datevalue[1] == undefined
      ) {
        this.$message.error("信息填写不完整");
        return;
      }
      this.qixianobj.schedulebegin = this.datevalue[0]
        .toLocaleDateString()
        .replace(/\//g, "-");
      this.qixianobj.scheduleend = this.datevalue[1]
        .toLocaleDateString()
        .replace(/\//g, "-");
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/qixianbiangeng",
          this.$qs.stringify(this.qixianobj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.dialogFormVisible2 = false;
          this.getCardAmount();
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
      if (this.stopcard.stoptype == "T") {
        this.stopcard.day1 = this.stoptime[0];
        this.stopcard.c = this.stoptime[1];
      }
      this.stopcard.userid = this.query.userid;
      if (
        this.stopcard.fee == "" ||
        this.stopcard.fee == undefined ||
        this.stopcard.payments == "" ||
        this.stopcard.payments == undefined
      ) {
        this.$message.error("信息填写不完整");
        return;
      }
      if (
        this.stopcard.stoptype == "T" &&
        (this.stopcard.disablebegin == "" ||
          this.stopcard.disablebegin == undefined ||
          this.stopcard.disableend == "" ||
          this.stopcard.disableend == undefined)
      ) {
        this.$message.error("信息填写不完整");
        return;
      }
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/tingka",
          this.$qs.stringify(this.stopcard),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.dialogFormVisible3 = false;
          this.getCardAmount();
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
          "https://www.facebodyfitness.com/web/new/huifu",
          this.$qs.stringify(obj),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((res) => {
          this.getCardAmount();
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
      this.recard.userid = this.query.userid;
      if (this.recard.times == "" || this.recard.times == undefined) {
        this.$message.error("信息填写不完整");
        return;
      }

      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/kouci",
          this.$qs.stringify(this.recard),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.dialogFormVisible4 = false;
          this.getCardAmount();
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
      this.xuka.day1 = e.cardbegin;
      this.xuka.day2 = e.cardend;
    },
    conclexuka() {
      this.dialogFormVisible5 = false;
    },
    xukatrue() {
      if (
        this.xuka.saleid == "" ||
        this.xuka.saleid == undefined ||
        this.xuka.storeid == "" ||
        this.xuka.storeid == undefined ||
        this.xuka.payments == "" ||
        this.xuka.payments == undefined ||
        this.xuka.buytimes == "" ||
        this.xuka.buytimes == undefined ||
        this.xuka.sellingfee == "" ||
        this.xuka.sellingfee == undefined
      ) {
        this.$message.error("信息填写不完整");
        return;
      }
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
      this.toxuka();
    },
    toxuka() {
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/xuka",
          this.$qs.stringify(this.xuka),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.xuka = {};
          this.dialogFormVisible5 = false;
          this.getCardAmount();
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
          "https://www.facebodyfitness.com/web/new/getUserSalesFollowup",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.genjinall = res.data;
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
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/setUserSalesFollowup",
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
        $("#tb1,#tb2,#tb3,#tb4,#tb5").html("");
      } else {
        var danwei = document.getElementsByClassName("danwei");
        danwei[0].innerText = "kg";
        danwei[1].innerText = "cal";
        danwei[2].innerText = "%";
        danwei[3].innerText = "kg";
        danwei[4].innerText = "kg";
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
      if (this.ticetype == "insert") {
        this.$axios
          .post(
            "https://www.facebodyfitness.com/web/CCourse/inserttice",
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
      } else if (this.ticetype == "update") {
        this.$axios
          .post(
            "https://www.facebodyfitness.com/web/CCourse/updatetice",
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
          "https://www.facebodyfitness.com/web/CCourse/deletetice",
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
    tianjiatice() {
      this.ticetype = "insert";
      this.dialogVisible2 = true;
    },
    bianjitice(e) {
      this.tice.tizhi = e.体脂率;
      this.tice.shengao = e.身高;
      this.tice.tizhong = e.体重;
      this.tice.jichudaixie = e.基础代谢;
      this.tice.datuiweil = e.大腿围L;
      this.tice.datuiweir = e.大腿围R;
      this.tice.xiaotuil = e.小腿L;
      this.tice.xiaotuir = e.小腿R;
      this.tice.shoubil = e.手臂L;
      this.tice.shoubir = e.手臂R;
      this.tice.xiongwei = e.胸围;
      this.tice.zhifang = e.脂肪含量;
      this.tice.gugeji = e.骨骼肌含量;
      this.tice.yaowei = e.腰围;
      this.tice.tunwei = e.臀围;
      this.tice.createdon = e.时间;
      this.ticetype = "update";
      this.dialogVisible2 = true;
    },
    gengduo(e) {
      if (e == "#hyxq_2") {
        this.getyuyuejilu();
      } else if (e == "#hyxq_3") {
        this.getcaozuojilu();
      }
      $("#hyxq_1").css("display", "none");
      $(e).css("display", "block");
    },
    fanhui(e) {
      if (e == "#hyxq_2") {
        this.getyuyuejilu4();
      } else if (e == "#hyxq_3") {
        this.getcaozuojilu4();
      }
      $("#hyxq_1").css("display", "block");
      $(e).css("display", "none");
    },
    getyuyuejilu4() {
      var data = {};
      data.userid = this.query.userid;
      data.limit = 4;
      data.page = 0;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getOrdOrdercourse",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.yuyuejilu = res.data;
        });
    },
    getyuyuejilu() {
      var data = {};
      data.userid = this.query.userid;
      data.limit = this.fenye.limit;
      data.page = this.fenye.page - 1;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getOrdOrdercourse",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.yuyuejilu = res.data;
          if (res.data.length > 0) {
            this.total = res.data[0].count;
          }
        });
    },
    getcaozuojilu4() {
      var data = {};
      data.userid = this.query.userid;
      data.limit = 4;
      data.page = 0;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getCaozuojilu",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.caozuojilu = res.data;
        });
    },
    getcaozuojilu() {
      var data = {};
      data.userid = this.query.userid;
      data.limit = this.fenye.limit;
      data.page = this.fenye.page - 1;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/getCaozuojilu",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.caozuojilu = res.data;
          if (res.data.length > 0) {
            var data2 = {};
            data2.userid = this.query.userid;
            data2.limit = 999999;
            data2.page = 0;
            this.$axios
              .post(
                "https://www.facebodyfitness.com/web/new/getCaozuojilu",
                this.$qs.stringify(data2),
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then((res) => {
                this.total = res.data.length;
              });
          }
        });
    },
    zhuanka(e) {
      this.zktype = e.cardtype;
      this.zkdialogVisible = true;
      this.zkclass = e;
    },
    querySearchAsync(queryString, cb) {
      var data = {};
      data.name = queryString;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/setUser",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          var results = res.data;
          cb(results);
        });
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(e) {
      this.zk.zkid = e;
    },
    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0;
          var v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    qdzk(e) {
      var data = {};
      data.cardno = this.zkclass.cardno;
      if (
        this.zk.zkid == "" ||
        this.zk.zkyxq == "" ||
        (this.zkcs == "" && e == 2) ||
        (this.zkcs == undefined && e == 2)
      ) {
        this.$message.error("信息填写不完整");
        return;
      }
      if (this.zkcs > this.zkclass.curtimes && this.zktype == "S") {
        this.$message.error("转卡次数大于剩余次数");
        return;
      }
      //转卡停卡
      var zktk = {};
      zktk.cardno = this.zkclass.cardno;
      zktk.userid = this.query.userid;
      zktk.name = this.query.name;
      zktk.tel = this.query.tel;
      zktk.typeid = this.zkclass.typeid;
      zktk.cardid = this.zkclass.cardid;
      zktk.cardname = this.zkclass.cardname;
      zktk.payments = this.zkclass.payment;
      if (e == 1) {
        zktk.curtimes = this.zkclass.curtimes;
        zktk.remarks = "转卡至" + this.zk.zkid.value.slice(0, -11);
      } else if (e == 2) {
        zktk.curtimes = this.zkcs;
        zktk.remarks =
          "转卡" + this.zkcs + "次至" + this.zk.zkid.value.slice(0, -11);
      }
      if (this.zkclass.cardtype == "S") {
        zktk.fee =
          parseInt(this.zkclass.totalfee -
          (this.zkclass.totalfee - zktk.curtimes * this.zkclass.timefee));
      } else {
        zktk.fee = this.zkclass.totalfee;
      }
      zktk.timefee = this.zkclass.timefee;
      zktk.stoptype = "P";
      zktk.day2 = "2099-01-01";

      if (e == 1 || this.zkcs == this.zkclass.curtimes) {
        this.$axios
          .post(
            "https://www.facebodyfitness.com/web/new/quanbuzhuanka",
            this.$qs.stringify(zktk),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((res) => {
            this.$message({
              message: "原卡停卡成功",
              type: "success",
            });
          });
      } else if (e == 2) {
        this.$axios
          .post(
            "https://www.facebodyfitness.com/web/new/bufenzhuanka",
            this.$qs.stringify(zktk),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((res) => {
            this.$message({
              message: "原卡扣次成功",
              type: "success",
            });
          });
      }

      //转卡绑卡
      var zkbk = {};
      zkbk.cardno = this.guid();
      zkbk.cardid = this.zkclass.cardid;
      zkbk.cardname = this.zkclass.cardname;
      zkbk.isfree = this.zkclass.isfree;
      zkbk.typeid = this.zkclass.typeid;
      zkbk.originalfee = this.zkclass.originalfee;
      zkbk.isopen = false;
      zkbk.day1 = this.zk.zkyxq[0];
      zkbk.day2 = this.zk.zkyxq[1];
      zkbk.periodvalidity = this.zkclass.periodvalidity;
      zkbk.curtimes = zktk.curtimes;
      zkbk.totaltimes = zktk.curtimes;
      zkbk.totalfee = zktk.fee;
      zkbk.times = this.zkclass.times;
      zkbk.remarks = "来自" + this.query.name + "转卡";
      zkbk.timefee = this.zkclass.timefee;
      zkbk.userid = this.zk.zkid.name;
      zkbk.payments = this.zkclass.payment;
      zkbk.storeid = this.zkclass.storeid;
      zkbk.storename = this.zkclass.storename;
      zkbk.saleid = this.zkclass.salerid;
      zkbk.salename = this.zkclass.salername;
      zkbk.cardtype = this.zkclass.cardtype;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/web/new/bangka",
          this.$qs.stringify(zkbk),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          // 转卡表
          var value = {};
          value.userid = zktk.userid; //转卡会员
          value.username = zktk.name;
          value.userphone = zktk.tel;
          value.cardno = zktk.cardno;
          value.cardid = zkbk.cardid;
          value.cardname = zktk.cardname;
          value.typeid = zktk.typeid;
          value.curtimes = zktk.curtimes;
          value.newuserid = zkbk.userid;
          value.newusername = this.zk.zkid.value.slice(0, -11);
          value.newuserphone = this.zk.zkid.value.slice(-11);
          this.$axios
            .post(
              "https://www.facebodyfitness.com/web/new/setCrdMembershipCardTransfer",
              this.$qs.stringify(value),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((res) => {});
          this.getCardAmount();
          this.getAmount();
          this.zk.zkid = "";
          this.zk.zkyxq = "";
          this.$message({
            message: "转卡完成",
            type: "success",
          });
        });

      this.zkdialogVisible = false;
    },
  },
};
</script>

<style scoped>
</style>

