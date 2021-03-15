<template>
  <div>
    <table id="out-table" border="1" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <th colspan="15">
            <h2>{{ this.name }}</h2>
          </th>
        </tr>
      </thead>
      <tr>
        <th colspan="2">
          <el-select
            v-model="value"
            placeholder="总部"
            style="width: 185px"
            @change="yfxz()"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              style="text-align: center"
            />
          </el-select>
        </th>
        <th>一月</th>
        <th>二月</th>
        <th>三月</th>
        <th>四月</th>
        <th>五月</th>
        <th>六月</th>
        <th>七月</th>
        <th>八月</th>
        <th>九月</th>
        <th>十月</th>
        <th>十一月</th>
        <th>十二月</th>
        <th>合计</th>
      </tr>

      <tr class="tr1">
        <td>人员成本</td>
        <td>工资</td>
        <td>
          <span>{{ costall[0].gongzi }}</span><input v-model="costall[0].gongzi">
        </td>
        <td>
          <span>{{ costall[1].gongzi }}</span><input v-model="costall[1].gongzi">
        </td>
        <td>
          <span>{{ costall[2].gongzi }}</span><input v-model="costall[2].gongzi">
        </td>
        <td>
          <span>{{ costall[3].gongzi }}</span><input v-model="costall[3].gongzi">
        </td>
        <td>
          <span>{{ costall[4].gongzi }}</span><input v-model="costall[4].gongzi">
        </td>
        <td>
          <span>{{ costall[5].gongzi }}</span><input v-model="costall[5].gongzi">
        </td>
        <td>
          <span>{{ costall[6].gongzi }}</span><input v-model="costall[6].gongzi">
        </td>
        <td>
          <span>{{ costall[7].gongzi }}</span><input v-model="costall[7].gongzi">
        </td>
        <td>
          <span>{{ costall[8].gongzi }}</span><input v-model="costall[8].gongzi">
        </td>
        <td>
          <span>{{ costall[9].gongzi }}</span><input v-model="costall[9].gongzi">
        </td>
        <td>
          <span>{{ costall[10].gongzi }}</span><input v-model="costall[10].gongzi">
        </td>
        <td>
          <span>{{ costall[11].gongzi }}</span><input v-model="costall[11].gongzi">
        </td>
        <td>{{ gongziall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>社保公积金</td>
        <td>
          <span>{{ costall[0].shebao }}</span><input v-model="costall[0].shebao">
        </td>
        <td>
          <span>{{ costall[1].shebao }}</span><input v-model="costall[1].shebao">
        </td>
        <td>
          <span>{{ costall[2].shebao }}</span><input v-model="costall[2].shebao">
        </td>
        <td>
          <span>{{ costall[3].shebao }}</span><input v-model="costall[3].shebao">
        </td>
        <td>
          <span>{{ costall[4].shebao }}</span><input v-model="costall[4].shebao">
        </td>
        <td>
          <span>{{ costall[5].shebao }}</span><input v-model="costall[5].shebao">
        </td>
        <td>
          <span>{{ costall[6].shebao }}</span><input v-model="costall[6].shebao">
        </td>
        <td>
          <span>{{ costall[7].shebao }}</span><input v-model="costall[7].shebao">
        </td>
        <td>
          <span>{{ costall[8].shebao }}</span><input v-model="costall[8].shebao">
        </td>
        <td>
          <span>{{ costall[9].shebao }}</span><input v-model="costall[9].shebao">
        </td>
        <td>
          <span>{{ costall[10].shebao }}</span><input v-model="costall[10].shebao">
        </td>
        <td>
          <span>{{ costall[11].shebao }}</span><input v-model="costall[11].shebao">
        </td>
        <td>{{ shebaoall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>福利</td>
        <td>
          <span>{{ costall[0].fuli }}</span><input v-model="costall[0].fuli">
        </td>
        <td>
          <span>{{ costall[1].fuli }}</span><input v-model="costall[1].fuli">
        </td>
        <td>
          <span>{{ costall[2].fuli }}</span><input v-model="costall[2].fuli">
        </td>
        <td>
          <span>{{ costall[3].fuli }}</span><input v-model="costall[3].fuli">
        </td>
        <td>
          <span>{{ costall[4].fuli }}</span><input v-model="costall[4].fuli">
        </td>
        <td>
          <span>{{ costall[5].fuli }}</span><input v-model="costall[5].fuli">
        </td>
        <td>
          <span>{{ costall[6].fuli }}</span><input v-model="costall[6].fuli">
        </td>
        <td>
          <span>{{ costall[7].fuli }}</span><input v-model="costall[7].fuli">
        </td>
        <td>
          <span>{{ costall[8].fuli }}</span><input v-model="costall[8].fuli">
        </td>
        <td>
          <span>{{ costall[9].fuli }}</span><input v-model="costall[9].fuli">
        </td>
        <td>
          <span>{{ costall[10].fuli }}</span><input v-model="costall[10].fuli">
        </td>
        <td>
          <span>{{ costall[11].fuli }}</span><input v-model="costall[11].fuli">
        </td>
        <td>{{ fuliall }}</td>
      </tr>
      <tr class="tr1">
        <td>日常成本</td>
        <td>租金物业</td>
        <td>
          <span>{{ costall[0].zujin }}</span><input v-model="costall[0].zujin">
        </td>
        <td>
          <span>{{ costall[1].zujin }}</span><input v-model="costall[1].zujin">
        </td>
        <td>
          <span>{{ costall[2].zujin }}</span><input v-model="costall[2].zujin">
        </td>
        <td>
          <span>{{ costall[3].zujin }}</span><input v-model="costall[3].zujin">
        </td>
        <td>
          <span>{{ costall[4].zujin }}</span><input v-model="costall[4].zujin">
        </td>
        <td>
          <span>{{ costall[5].zujin }}</span><input v-model="costall[5].zujin">
        </td>
        <td>
          <span>{{ costall[6].zujin }}</span><input v-model="costall[6].zujin">
        </td>
        <td>
          <span>{{ costall[7].zujin }}</span><input v-model="costall[7].zujin">
        </td>
        <td>
          <span>{{ costall[8].zujin }}</span><input v-model="costall[8].zujin">
        </td>
        <td>
          <span>{{ costall[9].zujin }}</span><input v-model="costall[9].zujin">
        </td>
        <td>
          <span>{{ costall[10].zujin }}</span><input v-model="costall[10].zujin">
        </td>
        <td>
          <span>{{ costall[11].zujin }}</span><input v-model="costall[11].zujin">
        </td>
        <td>{{ zujinall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>水电</td>
        <td>
          <span>{{ costall[0].shuidian }}</span><input v-model="costall[0].shuidian">
        </td>
        <td>
          <span>{{ costall[1].shuidian }}</span><input v-model="costall[1].shuidian">
        </td>
        <td>
          <span>{{ costall[2].shuidian }}</span><input v-model="costall[2].shuidian">
        </td>
        <td>
          <span>{{ costall[3].shuidian }}</span><input v-model="costall[3].shuidian">
        </td>
        <td>
          <span>{{ costall[4].shuidian }}</span><input v-model="costall[4].shuidian">
        </td>
        <td>
          <span>{{ costall[5].shuidian }}</span><input v-model="costall[5].shuidian">
        </td>
        <td>
          <span>{{ costall[6].shuidian }}</span><input v-model="costall[6].shuidian">
        </td>
        <td>
          <span>{{ costall[7].shuidian }}</span><input v-model="costall[7].shuidian">
        </td>
        <td>
          <span>{{ costall[8].shuidian }}</span><input v-model="costall[8].shuidian">
        </td>
        <td>
          <span>{{ costall[9].shuidian }}</span><input v-model="costall[9].shuidian">
        </td>
        <td>
          <span>{{ costall[10].shuidian }}</span><input v-model="costall[10].shuidian">
        </td>
        <td>
          <span>{{ costall[11].shuidian }}</span><input v-model="costall[11].shuidian">
        </td>
        <td>{{ shuidianall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>办公费</td>
        <td>
          <span>{{ costall[0].bangong }}</span><input v-model="costall[0].bangong">
        </td>
        <td>
          <span>{{ costall[1].bangong }}</span><input v-model="costall[1].bangong">
        </td>
        <td>
          <span>{{ costall[2].bangong }}</span><input v-model="costall[2].bangong">
        </td>
        <td>
          <span>{{ costall[3].bangong }}</span><input v-model="costall[3].bangong">
        </td>
        <td>
          <span>{{ costall[4].bangong }}</span><input v-model="costall[4].bangong">
        </td>
        <td>
          <span>{{ costall[5].bangong }}</span><input v-model="costall[5].bangong">
        </td>
        <td>
          <span>{{ costall[6].bangong }}</span><input v-model="costall[6].bangong">
        </td>
        <td>
          <span>{{ costall[7].bangong }}</span><input v-model="costall[7].bangong">
        </td>
        <td>
          <span>{{ costall[8].bangong }}</span><input v-model="costall[8].bangong">
        </td>
        <td>
          <span>{{ costall[9].bangong }}</span><input v-model="costall[9].bangong">
        </td>
        <td>
          <span>{{ costall[10].bangong }}</span><input v-model="costall[10].bangong">
        </td>
        <td>
          <span>{{ costall[11].bangong }}</span><input v-model="costall[11].bangong">
        </td>
        <td>{{ bangongall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>修理费</td>
        <td>
          <span>{{ costall[0].xiuli }}</span><input v-model="costall[0].xiuli">
        </td>
        <td>
          <span>{{ costall[1].xiuli }}</span><input v-model="costall[1].xiuli">
        </td>
        <td>
          <span>{{ costall[2].xiuli }}</span><input v-model="costall[2].xiuli">
        </td>
        <td>
          <span>{{ costall[3].xiuli }}</span><input v-model="costall[3].xiuli">
        </td>
        <td>
          <span>{{ costall[4].xiuli }}</span><input v-model="costall[4].xiuli">
        </td>
        <td>
          <span>{{ costall[5].xiuli }}</span><input v-model="costall[5].xiuli">
        </td>
        <td>
          <span>{{ costall[6].xiuli }}</span><input v-model="costall[6].xiuli">
        </td>
        <td>
          <span>{{ costall[7].xiuli }}</span><input v-model="costall[7].xiuli">
        </td>
        <td>
          <span>{{ costall[8].xiuli }}</span><input v-model="costall[8].xiuli">
        </td>
        <td>
          <span>{{ costall[9].xiuli }}</span><input v-model="costall[9].xiuli">
        </td>
        <td>
          <span>{{ costall[10].xiuli }}</span><input v-model="costall[10].xiuli">
        </td>
        <td>
          <span>{{ costall[11].xiuli }}</span><input v-model="costall[11].xiuli">
        </td>
        <td>{{ xiuliall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>日用品</td>
        <td>
          <span>{{ costall[0].riyong }}</span><input v-model="costall[0].riyong">
        </td>
        <td>
          <span>{{ costall[1].riyong }}</span><input v-model="costall[1].riyong">
        </td>
        <td>
          <span>{{ costall[2].riyong }}</span><input v-model="costall[2].riyong">
        </td>
        <td>
          <span>{{ costall[3].riyong }}</span><input v-model="costall[3].riyong">
        </td>
        <td>
          <span>{{ costall[4].riyong }}</span><input v-model="costall[4].riyong">
        </td>
        <td>
          <span>{{ costall[5].riyong }}</span><input v-model="costall[5].riyong">
        </td>
        <td>
          <span>{{ costall[6].riyong }}</span><input v-model="costall[6].riyong">
        </td>
        <td>
          <span>{{ costall[7].riyong }}</span><input v-model="costall[7].riyong">
        </td>
        <td>
          <span>{{ costall[8].riyong }}</span><input v-model="costall[8].riyong">
        </td>
        <td>
          <span>{{ costall[9].riyong }}</span><input v-model="costall[9].riyong">
        </td>
        <td>
          <span>{{ costall[10].riyong }}</span><input v-model="costall[10].riyong">
        </td>
        <td>
          <span>{{ costall[11].riyong }}</span><input v-model="costall[11].riyong">
        </td>
        <td>{{ riyongall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>公关</td>
        <td>
          <span>{{ costall[0].gongguan }}</span><input v-model="costall[0].gongguan">
        </td>
        <td>
          <span>{{ costall[1].gongguan }}</span><input v-model="costall[1].gongguan">
        </td>
        <td>
          <span>{{ costall[2].gongguan }}</span><input v-model="costall[2].gongguan">
        </td>
        <td>
          <span>{{ costall[3].gongguan }}</span><input v-model="costall[3].gongguan">
        </td>
        <td>
          <span>{{ costall[4].gongguan }}</span><input v-model="costall[4].gongguan">
        </td>
        <td>
          <span>{{ costall[5].gongguan }}</span><input v-model="costall[5].gongguan">
        </td>
        <td>
          <span>{{ costall[6].gongguan }}</span><input v-model="costall[6].gongguan">
        </td>
        <td>
          <span>{{ costall[7].gongguan }}</span><input v-model="costall[7].gongguan">
        </td>
        <td>
          <span>{{ costall[8].gongguan }}</span><input v-model="costall[8].gongguan">
        </td>
        <td>
          <span>{{ costall[9].gongguan }}</span><input v-model="costall[9].gongguan">
        </td>
        <td>
          <span>{{ costall[10].gongguan }}</span><input v-model="costall[10].gongguan">
        </td>
        <td>
          <span>{{ costall[11].gongguan }}</span><input v-model="costall[11].gongguan">
        </td>
        <td>{{ gongguanall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>推广费</td>
        <td>
          <span>{{ costall[0].tuiguang }}</span><input v-model="costall[0].tuiguang">
        </td>
        <td>
          <span>{{ costall[1].tuiguang }}</span><input v-model="costall[1].tuiguang">
        </td>
        <td>
          <span>{{ costall[2].tuiguang }}</span><input v-model="costall[2].tuiguang">
        </td>
        <td>
          <span>{{ costall[3].tuiguang }}</span><input v-model="costall[3].tuiguang">
        </td>
        <td>
          <span>{{ costall[4].tuiguang }}</span><input v-model="costall[4].tuiguang">
        </td>
        <td>
          <span>{{ costall[5].tuiguang }}</span><input v-model="costall[5].tuiguang">
        </td>
        <td>
          <span>{{ costall[6].tuiguang }}</span><input v-model="costall[6].tuiguang">
        </td>
        <td>
          <span>{{ costall[7].tuiguang }}</span><input v-model="costall[7].tuiguang">
        </td>
        <td>
          <span>{{ costall[8].tuiguang }}</span><input v-model="costall[8].tuiguang">
        </td>
        <td>
          <span>{{ costall[9].tuiguang }}</span><input v-model="costall[9].tuiguang">
        </td>
        <td>
          <span>{{ costall[10].tuiguang }}</span><input v-model="costall[10].tuiguang">
        </td>
        <td>
          <span>{{ costall[11].tuiguang }}</span><input v-model="costall[11].tuiguang">
        </td>
        <td>{{ tuiguangall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>外部服务费</td>
        <td>
          <span>{{ costall[0].waibu }}</span><input v-model="costall[0].waibu">
        </td>
        <td>
          <span>{{ costall[1].waibu }}</span><input v-model="costall[1].waibu">
        </td>
        <td>
          <span>{{ costall[2].waibu }}</span><input v-model="costall[2].waibu">
        </td>
        <td>
          <span>{{ costall[3].waibu }}</span><input v-model="costall[3].waibu">
        </td>
        <td>
          <span>{{ costall[4].waibu }}</span><input v-model="costall[4].waibu">
        </td>
        <td>
          <span>{{ costall[5].waibu }}</span><input v-model="costall[5].waibu">
        </td>
        <td>
          <span>{{ costall[6].waibu }}</span><input v-model="costall[6].waibu">
        </td>
        <td>
          <span>{{ costall[7].waibu }}</span><input v-model="costall[7].waibu">
        </td>
        <td>
          <span>{{ costall[8].waibu }}</span><input v-model="costall[8].waibu">
        </td>
        <td>
          <span>{{ costall[9].waibu }}</span><input v-model="costall[9].waibu">
        </td>
        <td>
          <span>{{ costall[10].waibu }}</span><input v-model="costall[10].waibu">
        </td>
        <td>
          <span>{{ costall[11].waibu }}</span><input v-model="costall[11].waibu">
        </td>
        <td>{{ waibuall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>市场活动费</td>
        <td>
          <span>{{ costall[0].shichang }}</span><input v-model="costall[0].shichang">
        </td>
        <td>
          <span>{{ costall[1].shichang }}</span><input v-model="costall[1].shichang">
        </td>
        <td>
          <span>{{ costall[2].shichang }}</span><input v-model="costall[2].shichang">
        </td>
        <td>
          <span>{{ costall[3].shichang }}</span><input v-model="costall[3].shichang">
        </td>
        <td>
          <span>{{ costall[4].shichang }}</span><input v-model="costall[4].shichang">
        </td>
        <td>
          <span>{{ costall[5].shichang }}</span><input v-model="costall[5].shichang">
        </td>
        <td>
          <span>{{ costall[6].shichang }}</span><input v-model="costall[6].shichang">
        </td>
        <td>
          <span>{{ costall[7].shichang }}</span><input v-model="costall[7].shichang">
        </td>
        <td>
          <span>{{ costall[8].shichang }}</span><input v-model="costall[8].shichang">
        </td>
        <td>
          <span>{{ costall[9].shichang }}</span><input v-model="costall[9].shichang">
        </td>
        <td>
          <span>{{ costall[10].shichang }}</span><input v-model="costall[10].shichang">
        </td>
        <td>
          <span>{{ costall[11].shichang }}</span><input v-model="costall[11].shichang">
        </td>
        <td>{{ shichangall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>采购器械</td>
        <td>
          <span>{{ costall[0].caigou }}</span><input v-model="costall[0].caigou">
        </td>
        <td>
          <span>{{ costall[1].caigou }}</span><input v-model="costall[1].caigou">
        </td>
        <td>
          <span>{{ costall[2].caigou }}</span><input v-model="costall[2].caigou">
        </td>
        <td>
          <span>{{ costall[3].caigou }}</span><input v-model="costall[3].caigou">
        </td>
        <td>
          <span>{{ costall[4].caigou }}</span><input v-model="costall[4].caigou">
        </td>
        <td>
          <span>{{ costall[5].caigou }}</span><input v-model="costall[5].caigou">
        </td>
        <td>
          <span>{{ costall[6].caigou }}</span><input v-model="costall[6].caigou">
        </td>
        <td>
          <span>{{ costall[7].caigou }}</span><input v-model="costall[7].caigou">
        </td>
        <td>
          <span>{{ costall[8].caigou }}</span><input v-model="costall[8].caigou">
        </td>
        <td>
          <span>{{ costall[9].caigou }}</span><input v-model="costall[9].caigou">
        </td>
        <td>
          <span>{{ costall[10].caigou }}</span><input v-model="costall[10].caigou">
        </td>
        <td>
          <span>{{ costall[11].caigou }}</span><input v-model="costall[11].caigou">
        </td>
        <td>{{ caigouall }}</td>
      </tr>
      <tr class="tr1">
        <td />
        <td>其他</td>
        <td>
          <span>{{ costall[0].qita }}</span><input v-model="costall[0].qita">
        </td>
        <td>
          <span>{{ costall[1].qita }}</span><input v-model="costall[1].qita">
        </td>
        <td>
          <span>{{ costall[2].qita }}</span><input v-model="costall[2].qita">
        </td>
        <td>
          <span>{{ costall[3].qita }}</span><input v-model="costall[3].qita">
        </td>
        <td>
          <span>{{ costall[4].qita }}</span><input v-model="costall[4].qita">
        </td>
        <td>
          <span>{{ costall[5].qita }}</span><input v-model="costall[5].qita">
        </td>
        <td>
          <span>{{ costall[6].qita }}</span><input v-model="costall[6].qita">
        </td>
        <td>
          <span>{{ costall[7].qita }}</span><input v-model="costall[7].qita">
        </td>
        <td>
          <span>{{ costall[8].qita }}</span><input v-model="costall[8].qita">
        </td>
        <td>
          <span>{{ costall[9].qita }}</span><input v-model="costall[9].qita">
        </td>
        <td>
          <span>{{ costall[10].qita }}</span><input v-model="costall[10].qita">
        </td>
        <td>
          <span>{{ costall[11].qita }}</span><input v-model="costall[11].qita">
        </td>
        <td>{{ qitaall }}</td>
      </tr>
      <tr>
        <td>收入扣除项</td>
        <td>产品成本</td>
        <td>{{ revenue[0] }}</td>
        <td>{{ revenue[1] }}</td>
        <td>{{ revenue[2] }}</td>
        <td>{{ revenue[3] }}</td>
        <td>{{ revenue[4] }}</td>
        <td>{{ revenue[5] }}</td>
        <td>{{ revenue[6] }}</td>
        <td>{{ revenue[7] }}</td>
        <td>{{ revenue[8] }}</td>
        <td>{{ revenue[9] }}</td>
        <td>{{ revenue[10] }}</td>
        <td>{{ revenue[11] }}</td>
        <td>{{ chanpingall }}</td>
      </tr>
      <tr>
        <td />
        <td>管理费</td>
        <td>{{ revenue2[0] }}</td>
        <td>{{ revenue2[1] }}</td>
        <td>{{ revenue2[2] }}</td>
        <td>{{ revenue2[3] }}</td>
        <td>{{ revenue2[4] }}</td>
        <td>{{ revenue2[5] }}</td>
        <td>{{ revenue2[6] }}</td>
        <td>{{ revenue2[7] }}</td>
        <td>{{ revenue2[8] }}</td>
        <td>{{ revenue2[9] }}</td>
        <td>{{ revenue2[10] }}</td>
        <td>{{ revenue2[11] }}</td>
        <td>{{ guanliall }}</td>
      </tr>
    </table>
    <br>
    <el-button
      type="primary"
      style="float: right; margin-right: 120px"
      @click="daochu()"
    >导出</el-button>
    <el-button
      type="primary"
      style="float: right; margin-right: 10px"
      @click="tijiao()"
    >提交</el-button>
    <br><br><br>

    <table
      id="out-table2"
      border="1"
      style="border-collapse: collapse; text-align: center"
    >
      <thead>
        <tr>
          <th colspan="14">
            <h2>营收报表</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            <el-select
              v-model="xsvalue"
              placeholder="销售率"
              style="width: 98px"
            >
              <el-option
                v-for="item in qbxs"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </th>
          <th>一月份</th>
          <th>二月份</th>
          <th>三月份</th>
          <th>四月份</th>
          <th>五月份</th>
          <th>六月份</th>
          <th>七月份</th>
          <th>八月份</th>
          <th>九月份</th>
          <th>十月份</th>
          <th>十一月份</th>
          <th>十二月份</th>
          <th>合计</th>
        </tr>

        <tr>
          <td>门店营收</td>
          <td>
            <span>{{ list[0].mdys }}</span><input v-model="list[0].mdys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[1].mdys }}</span><input v-model="list[1].mdys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[2].mdys }}</span><input v-model="list[2].mdys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[3].mdys }}</span><input v-model="list[3].mdys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[4].mdys }}</span><input v-model="list[4].mdys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[5].mdys }}</span><input v-model="list[5].mdys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[6].mdys }}</span><input v-model="list[6].mdys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[7].mdys }}</span><input v-model="list[7].mdys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[8].mdys }}</span><input v-model="list[8].mdys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[9].mdys }}</span><input v-model="list[9].mdys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[10].mdys }}</span><input v-model="list[10].mdys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[11].mdys }}</span><input v-model="list[11].mdys" @change="countMoney()">
          </td>
          <td>{{ totalmdys }}</td>
        </tr>
        <tr>
          <td>门店成本</td>
          <td>{{ mdcb[0].sum }}</td>
          <td>{{ mdcb[1].sum }}</td>
          <td>{{ mdcb[2].sum }}</td>
          <td>{{ mdcb[3].sum }}</td>
          <td>{{ mdcb[4].sum }}</td>
          <td>{{ mdcb[5].sum }}</td>
          <td>{{ mdcb[6].sum }}</td>
          <td>{{ mdcb[7].sum }}</td>
          <td>{{ mdcb[8].sum }}</td>
          <td>{{ mdcb[9].sum }}</td>
          <td>{{ mdcb[10].sum }}</td>
          <td>{{ mdcb[11].sum }}</td>
          <td>{{ totalcost }}</td>
        </tr>
        <tr>
          <td>门店利润</td>
          <td>{{ list[0].mdlr }}</td>
          <td>{{ list[1].mdlr }}</td>
          <td>{{ list[2].mdlr }}</td>
          <td>{{ list[3].mdlr }}</td>
          <td>{{ list[4].mdlr }}</td>
          <td>{{ list[5].mdlr }}</td>
          <td>{{ list[6].mdlr }}</td>
          <td>{{ list[7].mdlr }}</td>
          <td>{{ list[8].mdlr }}</td>
          <td>{{ list[9].mdlr }}</td>
          <td>{{ list[10].mdlr }}</td>
          <td>{{ list[11].mdlr }}</td>
          <td>{{ totalmdlr }}</td>
        </tr>
        <tr>
          <td>总部营收</td>
          <td>
            <span>{{ list[0].zbys }}</span><input v-model="list[0].zbys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[1].zbys }}</span><input v-model="list[1].zbys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[2].zbys }}</span><input v-model="list[2].zbys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[3].zbys }}</span><input v-model="list[3].zbys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[4].zbys }}</span><input v-model="list[4].zbys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[5].zbys }}</span><input v-model="list[5].zbys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[6].zbys }}</span><input v-model="list[6].zbys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[7].zbys }}</span><input v-model="list[7].zbys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[8].zbys }}</span><input v-model="list[8].zbys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[9].zbys }}</span><input v-model="list[9].zbys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[10].zbys }}</span><input v-model="list[10].zbys" @change="countMoney()">
          </td>
          <td>
            <span>{{ list[11].zbys }}</span><input v-model="list[11].zbys" @change="countMoney()">
          </td>
          <td>{{ totalzbys }}</td>
        </tr>
        <tr>
          <td>总部成本</td>
          <td>{{ zbcb[0].sum }}</td>
          <td>{{ zbcb[1].sum }}</td>
          <td>{{ zbcb[2].sum }}</td>
          <td>{{ zbcb[3].sum }}</td>
          <td>{{ zbcb[4].sum }}</td>
          <td>{{ zbcb[5].sum }}</td>
          <td>{{ zbcb[6].sum }}</td>
          <td>{{ zbcb[7].sum }}</td>
          <td>{{ zbcb[8].sum }}</td>
          <td>{{ zbcb[9].sum }}</td>
          <td>{{ zbcb[10].sum }}</td>
          <td>{{ zbcb[11].sum }}</td>
          <td>{{ totalzbcost }}</td>
        </tr>
        <tr>
          <td>总部利润</td>
          <td>{{ list[0].zblr }}</td>
          <td>{{ list[1].zblr }}</td>
          <td>{{ list[2].zblr }}</td>
          <td>{{ list[3].zblr }}</td>
          <td>{{ list[4].zblr }}</td>
          <td>{{ list[5].zblr }}</td>
          <td>{{ list[6].zblr }}</td>
          <td>{{ list[7].zblr }}</td>
          <td>{{ list[8].zblr }}</td>
          <td>{{ list[9].zblr }}</td>
          <td>{{ list[10].zblr }}</td>
          <td>{{ list[11].zblr }}</td>
          <td>{{ totalzblr }}</td>
        </tr>
        <tr>
          <td>总营收</td>
          <td>{{ list[0].zys }}</td>
          <td>{{ list[1].zys }}</td>
          <td>{{ list[2].zys }}</td>
          <td>{{ list[3].zys }}</td>
          <td>{{ list[4].zys }}</td>
          <td>{{ list[5].zys }}</td>
          <td>{{ list[6].zys }}</td>
          <td>{{ list[7].zys }}</td>
          <td>{{ list[8].zys }}</td>
          <td>{{ list[9].zys }}</td>
          <td>{{ list[10].zys }}</td>
          <td>{{ list[11].zys }}</td>
          <td>{{ totalzys }}</td>
        </tr>
        <tr>
          <td>总利润</td>
          <td>{{ list[0].zlr }}</td>
          <td>{{ list[1].zlr }}</td>
          <td>{{ list[2].zlr }}</td>
          <td>{{ list[3].zlr }}</td>
          <td>{{ list[4].zlr }}</td>
          <td>{{ list[5].zlr }}</td>
          <td>{{ list[6].zlr }}</td>
          <td>{{ list[7].zlr }}</td>
          <td>{{ list[8].zlr }}</td>
          <td>{{ list[9].zlr }}</td>
          <td>{{ list[10].zlr }}</td>
          <td>{{ list[11].zlr }}</td>
          <td>{{ totalzlr }}</td>
        </tr>
      </tbody>
    </table>
    <br>
    <el-button
      type="primary"
      style="float: right; margin-right: 120px"
      @click="daochu2()"
    >导出</el-button>
    <el-button
      type="primary"
      style="float: right; margin-right: 10px"
      @click="toTrueClose2()"
    >提交</el-button>
  </div>
</template>

<script>
import $ from "jquery";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      ss: [{ ss1: "ddd" }, { ss1: "sss" }],
      options: [
        {
          value: "1",
          label: "总部"
        },
        {
          value: "2",
          label: "门店"
        },
        {
          value: "3",
          label: "合计"
        }
      ],
      value: "",
      costall: [],
      revenue: [],
      revenue2: [],
      shebaoall: 0,
      fuliall: 0,
      zujinall: 0,
      shuidianall: 0,
      bangongall: 0,
      xiuliall: 0,
      riyongall: 0,
      gongguanall: 0,
      tuiguangall: 0,
      waibuall: 0,
      shichangall: 0,
      caigouall: 0,
      qitaall: 0,
      chanpingall: 0,
      guanliall: 0,
      name: "",
      list: [],
      totalmdys: 0,
      totalmdlr: 0,
      totalzbys: 0,
      totalzblr: 0,
      totalzys: 0,
      totalzlr: 0,
      totalcost: 0,
      totalzbcost: 0,
      zbcb: [],
      mdcb: [],
      qbxs: [
        {
          value: "C",
          label: "销售率"
        },
        {
          value: "0.75",
          label: "75%"
        },
        {
          value: "0.546",
          label: "54.6%"
        },
        {
          value: "0.3179",
          label: "31.79%"
        }
      ],
      xsvalue: "C"
    };
  },
  mounted() {
    this.yfxz();
    this.getzbCost();
    this.getmdCost();
    this.getAllTest();
  },
  methods: {
    yfxz() {
      if (this.value == 1 || this.value == "") {
        this.selectzb();
        this.name = "总部成本";
      } else if (this.value == 2) {
        this.selectmd();
        this.name = "门店成本";
      } else {
        this.selecthj();
        this.name = "合计成本";
      }
    },
    selectzb() {
      this.select(1);
      $(".tr1").find("input").prop("disabled", false);
      $(".button1").attr("disabled", false);
    },
    selectmd() {
      this.select(2);
      $(".tr1").find("input").prop("disabled", false);
      $(".button1").attr("disabled", false);
    },
    selecthj() {
      this.select(3);
      $(".tr1").find("input").prop("disabled", true);
      $(".button1").attr("disabled", true);
    },
    select(e) {
      var data = {};
      data.accountid = e;
      this.$axios
        .post(
          "http://localhost:8081/web/CAnalysis/selectcost",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.costall = res.data;
          this.jszs();
        });
      this.$axios
        .post(
          "http://localhost:8081/web/CAnalysis/selectrevenue",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.revenue = res.data;
          for (var i = 0; i < res.data.length; i++) {
            this.revenue[i] = (res.data[i].revenue * 0.38).toFixed(2);
            this.revenue2[i] = ((this.revenue[i] / 0.38) * 0.1).toFixed(2);
          }
          this.jszs2();
        });
    },
    tijiao() {
      var data = {};
      var jsonstr = JSON.stringify(this.costall);
      data.jsonstr = jsonstr;
      this.$axios
        .post(
          "http://localhost:8081/web/CAnalysis/updatecost",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.costall = res.data;
          this.getzbCost();
          this.getmdCost();
          this.getAllTest();
          this.jszs();
        });
    },
    jszs() {
      this.gongziall = 0;
      this.shebaoall = 0;
      this.fuliall = 0;
      this.zujinall = 0;
      this.shuidianall = 0;
      this.bangongall = 0;
      this.xiuliall = 0;
      this.riyongall = 0;
      this.gongguanall = 0;
      this.tuiguangall = 0;
      this.waibuall = 0;
      this.shichangall = 0;
      this.caigouall = 0;
      this.qitaall = 0;
      for (var i = 0; i < this.costall.length; i++) {
        this.gongziall +=
          this.costall[i].gongzi != null && this.costall[i].gongzi != ""
            ? this.costall[i].gongzi
            : 0;
        this.shebaoall +=
          this.costall[i].shebao != null && this.costall[i].shebao != ""
            ? this.costall[i].shebao
            : 0;
        this.fuliall +=
          this.costall[i].fuli != null && this.costall[i].fuli != ""
            ? this.costall[i].fuli
            : 0;
        this.zujinall +=
          this.costall[i].zujin != null && this.costall[i].zujin != ""
            ? this.costall[i].zujin
            : 0;
        this.shuidianall +=
          this.costall[i].shuidian != null && this.costall[i].shuidian != ""
            ? this.costall[i].shuidian
            : 0;
        this.bangongall +=
          this.costall[i].bangong != null && this.costall[i].bangong != ""
            ? this.costall[i].bangong
            : 0;
        this.xiuliall +=
          this.costall[i].xiuli != null && this.costall[i].xiuli != ""
            ? this.costall[i].xiuli
            : 0;
        this.riyongall +=
          this.costall[i].riyong != null && this.costall[i].riyong != ""
            ? this.costall[i].riyong
            : 0;
        this.gongguanall +=
          this.costall[i].gongguan != null && this.costall[i].gongguan != ""
            ? this.costall[i].gongguan
            : 0;
        this.tuiguangall +=
          this.costall[i].tuiguang != null && this.costall[i].tuiguang != ""
            ? this.costall[i].tuiguang
            : 0;
        this.waibuall +=
          this.costall[i].waibu != null && this.costall[i].waibu != ""
            ? this.costall[i].waibu
            : 0;
        this.shichangall +=
          this.costall[i].shichang != null && this.costall[i].shichang != ""
            ? this.costall[i].shichang
            : 0;
        this.caigouall +=
          this.costall[i].caigou != null && this.costall[i].caigou != ""
            ? this.costall[i].caigou
            : 0;
        this.qitaall +=
          this.costall[i].qita != null && this.costall[i].qita != ""
            ? this.costall[i].qita
            : 0;
      }
    },
    jszs2() {
      this.chanpingall = 0;
      this.guanliall = 0;
      console.log(this.revenue.length);
      for (var i = 0; i < this.revenue.length; i++) {
        this.chanpingall +=
          this.revenue[i] != null && this.revenue[i] != ""
            ? parseFloat(this.revenue[i])
            : 0;
        this.guanliall +=
          this.revenue2[i] != null && this.revenue2[i] != ""
            ? parseFloat(this.revenue2[i])
            : 0;
      }
      this.chanpingall = this.chanpingall.toFixed(2);
      this.guanliall = this.guanliall.toFixed(2);
    },
    daochu() {
      /* generate workbook object from table */
      const wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* get binary string as output */
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        var name = this.name + ".xlsx";
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    countMoney() {
                 this.totalmdys=0
                 this.totalmdlr=0
                 this.totalzbys=0
                 this.totalzblr=0
                 this.totalzys=0
                 this.totalzlr=0
                 this.totalcost=0
                 this.totalzbcost=0
                 for(var i=0;i<this.list.length;i++){
                  this.list[i].mdlr=this.list[i].mdys-this.mdcb[i].sum
                  this.list[i].zblr=this.list[i].zbys-this.zbcb[i].sum
                  this.list[i].zys=this.list[i].mdys+this.list[i].zbys
                  this.list[i].zlr=this.list[i].mdlr+this.list[i].zblr
                  this.totalmdys=parseFloat(this.totalmdys)+parseFloat(this.list[i].mdys)
                  this.totalmdlr=parseFloat(this.totalmdlr)+parseFloat(this.list[i].mdlr)
                  this.totalzbys=parseFloat(this.totalzbys)+parseFloat(this.list[i].zbys)
                  this.totalzblr=parseFloat(this.totalzblr)+parseFloat(this.list[i].zblr)
                  this.totalzys=parseFloat(this.totalzys)+parseFloat(this.list[i].zys)
                  this.totalzlr=parseFloat(this.totalzlr)+parseFloat(this.list[i].zlr)
                  this.totalcost=parseFloat(this.totalcost)+parseFloat(this.mdcb[i].sum)
                  this.totalzbcost=parseFloat(this.totalzbcost)+parseFloat(this.zbcb[i].sum)
              }
    },
    getAllTest() {
      this.$axios
        .post("https://www.facebodyfitness.com/hi/main?hi=24BIUVHG20AT", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then((res) => {
          this.list = res.data.rows
          this.countMoney()
          this.listLoading = false
        });
    },
    //获取总部成本
    getzbCost() {
      var status = {};
      status.fenbu = 1;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLO28O6",
          this.$qs.stringify(status),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.zbcb = res.data.rows;
        });
    },
    //获取门店成本
    getmdCost() {
      var status = {};
      status.fenbu = 2;
      this.$axios
        .post(
          "https://www.facebodyfitness.com/hi/main?hi=24CQRLLO28O6",
          this.$qs.stringify(status),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.mdcb = res.data.rows;
        });
    },
    toTrueClose2() {
      var data = {};
      data.str = JSON.stringify(this.list);
      this.$axios
        .post(
          "http://localhost:8081/web/TjTest/updateAllTest",
          this.$qs.stringify(data),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.getAllTest();
          this.yfxz();
          this.listLoading = false;
          this.$message({
            message: "恭喜你，操作成功",
            type: "success"
          });
        })
        .catch((error) => {
          this.$message.error("错了哦，这是一条错误消息");
        });
    },
    daochu2() {
      /* generate workbook object from table */
      const wb = XLSX.utils.table_to_book(
        document.querySelector("#out-table2")
      ); /* get binary string as output */
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        var name = "营收报表" + ".xlsx";
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  }
};
</script>

<style>
table {
  border-collapse: collapse;
  text-align: center;
  table-layout: fixed;
  width: 1400px;
  margin: 0 auto;
  font-size: 14px;
}
table td,
table th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 35px;
}
table thead th {
  background-color: #cce8eb;
  width: 100px;
}
table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #f5fafa;
}
table tr:nth-child(even) input {
  background: #f5fafa;
}
table input {
  border: none;
  width: 90px;
  text-align: center;
  outline: none;
}
table span {
  display: none;
}
table thead th {
  background-color: #cce8eb;
}
</style>
