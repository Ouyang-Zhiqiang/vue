<template>
  <div id="container" style="padding:15px;padding-top:25px">
    <router-link :to="'/afcbhypm/cjtd/'">
      <el-button type="">
        创建团队
      </el-button>
    </router-link>
    &nbsp;&nbsp;
    <router-link :to="'/afcbhypm/fzbg/'">
      <el-button type="">
        分值变更
      </el-button>
    </router-link>
    <el-tabs type="border-card" style="margin-top:25px">
      <el-tab-pane label="个人排名">
        <el-table v-loading="listLoading" :data="jfarr" border fit highlight-current-row style="margin-top:20px">
          <el-table-column width="400" align="center" label="排名">
            <template slot-scope="scope">
              <span v-html="scope.$index+1" />
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="分值" width="420">
            <template slot-scope="scope">
              <span>{{ scope.row.points }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="姓名" width="420">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="门店" width="420">
            <template slot-scope="scope">
              <span>{{ scope.row.storename }}</span>
            </template>
          </el-table-column>
          
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="团队排名">
        <el-table v-loading="listLoading1" :data="tdarr" border fit highlight-current-row style="margin-top:20px">
          <el-table-column width="280" align="center" label="排名">
            <template slot-scope="scope">
              <span v-html="scope.$index+1" />
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="分值" width="280">
            <template slot-scope="scope">
              <span>{{ scope.row.allpoints }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="队名" width="280">
            <template slot-scope="scope">
              <span>{{ scope.row.clname }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="门店" width="280">
            <template slot-scope="scope">
              <span>{{ scope.row.storename }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="教练" width="280">
            <template slot-scope="scope">
              <span>{{ scope.row.coachname }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="290">
            <template slot-scope="scope">
              <el-button type="text" @click="toOpen(scope.row)">人员变动</el-button>
              <el-dialog title="人员变动" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
                <el-form>
                  <el-form-item label="加队员" :label-width="formLabelWidth">
                    <el-autocomplete
                      v-model="state"
                      :fetch-suggestions="querySearchAsync"
                      placeholder="请输入内容"
                      style="width:300px;float:left"
                      @select="handleSelect"
                    />
                  </el-form-item>
                  <el-form-item label="减队员" :label-width="formLabelWidth">
                    <el-select v-model="preuserId" style="width:300px;float:left">
                      <el-option v-for="item in clanUsers" :key="item.userid" :label="item.name" :value="item.userid" />
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="toAddPre()">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
          
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
    data(){
        return{ 
            restaurants: [],
            state: '',
            timeout:  null,
            results:[],
            showNow:false,
            user:{},
            clanUsers:[],
            preuserId:'',
            adduserId:'',
            myform:{
              
            },

            jfarr:[],
            tdarr:[],
            listLoading:true,
            listLoading1:true,
            formLabelWidth:'150px',
            dialogFormVisible:false,
            form:[]
        }
    },
    mounted() {
      
    },
    created(){
      this.getPersonJ();
      this.getAlltd();
    },
    methods:{
      getClanUsers(e){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWBKP', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.clanUsers=res.data.rows
        });
      },
      getPersonJ(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW6PP', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.jfarr=res.data.rows
          this.listLoading=false
        });
      },
      getAlltd(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW750', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.tdarr=res.data.rows
          this.listLoading1=false
        });
      },
      toOpen(e){
          this.dialogFormVisible=true
          this.myform.clanid=e.clanid
          this.getClanUsers(e)
      },
      toAdd(e){
        console.log(e)
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW6OY', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
          this.dialogFormVisible=false
          this.adduserId=''
          this.preuserId=''
        }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
        });
      },
      toPre(e){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEW6P7', this.$qs.stringify(e), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
          this.dialogFormVisible=false
          this.adduserId=''
          this.preuserId=''
        }).catch(error=>{
            this.$message.error('错了哦，这是一条错误消息');
        });
      },
      toAddPre(){
        if(this.adduserId==''&&this.preuserId==''){
          this.$message.error('不可同时添加删除队员');
        }else if(this.adduserId==''&&this.preuserId!=''){
          this.myform.userid=this.preuserId
          this.toPre(this.myform)
        }else if(this.adduserId!=''&&this.preuserId==''){
          this.myform.userid=this.adduserId
          this.toAdd(this.myform)
        }
      },
      querySearchAsync(queryString, cb) {
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        // clearTimeout(this.timeout);
        // this.timeout = setTimeout(() => {
        //   cb(results);
        // }, 3000 * Math.random());
        var data={}
        data.name=queryString
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24BACFMEWAD8', this.$qs.stringify(data), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          var results=res.data.rows
          cb(results)
        });
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.adduserId=item.address
      }
    }
}
</script>

<style scoped>
    
</style>
