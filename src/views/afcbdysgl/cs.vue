<template>
  <div id="fdsfdff">
    <el-select v-model="xsvalue" placeholder="销售率" style="margin-left: 10%;margin-top: 12px;">
      <el-option
        v-for="item in qbxs"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <table
      id="out-table"
      border="1"
      style="margin-top: 1%;
    margin-left: 10%;border-collapse: collapse;    text-align: center;"
    >
      <thead>
        <tr>
          <th>营收/月份</th>
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
      </thead>
      <tbody>
        <tr>
          <td>门店营收</td>
          <td><span>{{ list[0].mdys }}</span><input v-model="list[0].mdys" @change="countMoney()"></td>
          <td><span>{{ list[1].mdys }}</span><input v-model="list[1].mdys" @change="countMoney()"></td>
          <td><span>{{ list[2].mdys }}</span><input v-model="list[2].mdys" @change="countMoney()"></td>
          <td><span>{{ list[3].mdys }}</span><input v-model="list[3].mdys" @change="countMoney()"></td>
          <td><span>{{ list[4].mdys }}</span><input v-model="list[4].mdys" @change="countMoney()"></td>
          <td><span>{{ list[5].mdys }}</span><input v-model="list[5].mdys" @change="countMoney()"></td>
          <td><span>{{ list[6].mdys }}</span><input v-model="list[6].mdys" @change="countMoney()"></td>
          <td><span>{{ list[7].mdys }}</span><input v-model="list[7].mdys" @change="countMoney()"></td>
          <td><span>{{ list[8].mdys }}</span><input v-model="list[8].mdys" @change="countMoney()"></td>
          <td><span>{{ list[9].mdys }}</span><input v-model="list[9].mdys" @change="countMoney()"></td>
          <td><span>{{ list[10].mdys }}</span><input v-model="list[10].mdys" @change="countMoney()"></td>
          <td><span>{{ list[11].mdys }}</span><input v-model="list[11].mdys" @change="countMoney()"></td>
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
          <td><span>{{ list[0].zbys }}</span><input v-model="list[0].zbys" @change="countMoney()"></td>
          <td><span>{{ list[1].zbys }}</span><input v-model="list[1].zbys" @change="countMoney()"></td>
          <td><span>{{ list[2].zbys }}</span><input v-model="list[2].zbys" @change="countMoney()"></td>
          <td><span>{{ list[3].zbys }}</span><input v-model="list[3].zbys" @change="countMoney()"></td>
          <td><span>{{ list[4].zbys }}</span><input v-model="list[4].zbys" @change="countMoney()"></td>
          <td><span>{{ list[5].zbys }}</span><input v-model="list[5].zbys" @change="countMoney()"></td>
          <td><span>{{ list[6].zbys }}</span><input v-model="list[6].zbys" @change="countMoney()"></td>
          <td><span>{{ list[7].zbys }}</span><input v-model="list[7].zbys" @change="countMoney()"></td>
          <td><span>{{ list[8].zbys }}</span><input v-model="list[8].zbys" @change="countMoney()"></td>
          <td><span>{{ list[9].zbys }}</span><input v-model="list[9].zbys" @change="countMoney()"></td>
          <td><span>{{ list[10].zbys }}</span><input v-model="list[10].zbys" @change="countMoney()"></td>
          <td><span>{{ list[11].zbys }}</span><input v-model="list[11].zbys" @change="countMoney()"></td>
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
      <button @click="toTrueClose2()">提 交</button>
      <button @click="daochu()">导 出</button>
    </table>

  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
    data(){
            return{     
                // listLoading: true,
                list:[],
                totalmdys:0,
                totalmdlr:0,
                totalzbys:0,
                totalzblr:0,
                totalzys:0,
                totalzlr:0,
                totalcost:0,
                totalzbcost:0,
                zbcb:[],
                mdcb:[],
                qbxs: [{
                  value: 'C',
                  label: '销售率'
                  }, {
                  value: '0.75',
                  label: '75%'
                  }, {
                  value: '0.546',
                  label: '54.6%'
                  }, {
                  value: '0.3179',
                  label: '31.79%'
                  }],
                  xsvalue:'C'
            }
        },
     mounted(){
       //获取列表
       this.getzbCost();
        this.getmdCost();
        this.getAllTest();
        },
     methods:{
            countMoney() {
                 this.totalmdys=0
                 this.totalmdlr=0
                 this.totalzbys=0
                 this.totalzblr=0
                 this.totalzys=0
                 this.totalzlr=0
                 this.totalcost=0
                 this.totalzbcost=0
                 for(var i=0;i<this.list.length;i++){
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
           daochu() {
              /* generate workbook object from table */
              const wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
              /* get binary string as output */
              const wbout = XLSX.write(wb, {
                bookType: "xlsx",
                bookSST: true,
                type: "array"
              });
              try {
                var name = this.name + ".xlsx";
                FileSaver.saveAs(
                  new Blob([wbout], { type: "application/octet-stream" }),
                  name
                );
              } catch (e) {
                if (typeof console !== "undefined") console.log(e, wbout);
              }
              return wbout;
            },
           getAllTest(){
              this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BIUVHG20AT', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.list=res.data.rows
              for(var i=0;i<this.list.length;i++){
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
              this.listLoading=false
            });
           },
           //获取总部成本
           getzbCost(){
               var status={}
               status.fenbu=1;
               this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLO28O6', this.$qs.stringify(status), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.zbcb=res.data.rows
                });
           },
           //获取门店成本
           getmdCost(){
               var status={}
               status.fenbu=2;
               this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLO28O6', this.$qs.stringify(status), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                this.mdcb=res.data.rows
                });
           },
           toTrueClose2(){
             var data={}
             data.str=JSON.stringify(this.list)
             this.$axios.post('https://www.facebodyfitness.com/web/TjTest/updateAllTest', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.getAllTest()
              this.listLoading=false
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
        table
        {
            border-collapse: collapse;
            text-align: center;
            table-layout: fixed;
            width: 1400px;
            margin: 0 auto;
            font-size: 14px;
        }
        table td, table th
        {
            border: 1px solid #cad9ea;
            color: #666;
            height: 35px;
        }
        table thead th
        {
            background-color: #CCE8EB;
            width: 100px;
        }
        table tr:nth-child(odd)
        {
            background: #fff;
        }
        table tr:nth-child(even)
        {
            background: #F5FAFA;
        }
        table tr:nth-child(even) input
        {
            background: #F5FAFA;
        }
        table input
        {
            border: none;
            width:90px;
            text-align: center;
            outline: none;
        }
        table span{
          display: none;
        }

</style>
