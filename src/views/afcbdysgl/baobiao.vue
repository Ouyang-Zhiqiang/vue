<template>
  <div>
   
    <table border="1" cellpadding="0" cellspacing="0">
      <tr>
        <th colspan="14"><h3>成本</h3></th>      
      </tr>
      <tr>
        <th colspan="2"> 
          <el-select v-model="value" placeholder="总部" style="width:198px;" @change="yfxz()">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" style="text-align:center" />
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
      </tr>

      <tr>
        <td>人员成本</td>
        <td>工资</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>社保公积金</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>福利</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td>日常成本</td>
        <td>租金物业</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>水电</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>办公费</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>修理费</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>日用品</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>公关</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>推广费</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>外部服务费</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>市场活动费</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>采购器械</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>其他</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td>收入扣除项</td>
        <td>产品成本</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
      <tr>
        <td />
        <td>管理费</td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
          options: [{
          value: '1',
          label: '合计'
        }, {
          value: '2',
          label: '总部'
        }, {
          value: '3',
          label: '门店'
        }],
        value: ''
      }
    },
    created(){
      
    },
    methods:{
       yfxz(){
           alert(this.value)
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

</style>
