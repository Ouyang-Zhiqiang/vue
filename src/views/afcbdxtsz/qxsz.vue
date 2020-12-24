<template>
  <div id="container" style="padding:15px">

    <el-dialog title="权限编辑" :visible.sync="dialogFormVisible" style="width:1200px;margin:0 auto">
      
      <el-tree 
        :data="data" 
        :props="defaultProps" 
        show-checkbox
        :default-expanded-keys="defaultExpand"
        :default-checked-keys="defaultSelected"
        node-key="id"
        @check="handleNodeClick"
      />

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toClose()">关 闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增角色" :visible.sync="dialogFormVisible8" style="width:1200px;margin:0 auto">
      
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="角色名称" style="">
          <el-input v-model="form.rolename" style="width:250px" />
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="dialogFormVisible8 = false">关 闭</el-button>
        <el-button type="primary" @click="toTrueClose()">确 定</el-button>
      </div>

    </el-dialog>

    <el-tabs type="border-card" style="margin-top:20px">
      <el-tab-pane label="权限设置">
        <el-button type="success" style="margin-top:5px" @click="addRole">新增角色</el-button>
        <el-table v-loading="listLoading" :data="roles" border fit highlight-current-row style="margin-top:20px">
          <el-table-column align="center" label="角色名称" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.rolename }}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="员工">
            <template slot-scope="scope">
              <span>{{ scope.row.usernames }}</span>
            </template>
          </el-table-column>
          <el-table-column width="200" align="center" label="操作">
            <template slot-scope="scope">
              <span style="cursor:pointer" @click="opendig(scope.row.roleid)">权限操作</span>
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
            roles:[],
            staffs:[],
            listLoading:false,
            dialogFormVisible:false,
            dialogFormVisible8:false,
            data: [],
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            roleid:'',
            defaultExpand:[],
            defaultSelected:[],
            alldata:[],
            form:{rolename:''}
           
        }
    },
    created(){
     
    },
    mounted() {
       this.getRoles()
       this.getAllMenu()
       this.getAllLevelMenu()
    },
    methods:{
      handleCheckChange(data, checked, indeterminate) {
        // if(!data.children){
          console.log(data, checked, indeterminate);
        // }
      },
      handleNodeClick(data) {
        // console.log(data)
        // console.log(this.roleid)
        if(data.children){
          this.dialogFormVisible=false
          this.$message.error('不可直接操作权限一级菜单');
        }else{
          var obj={}
          console.log(data)
          obj.roleid=this.roleid
          obj.functionid=data.id
          this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNC11L', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            if(res.data.rows.length>0){
              // console.log(obj)
              this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNC0Z5', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              this.$message({
                  message: '恭喜你，操作成功',
                  type: 'success'
                })
              }).catch(error=>{
                this.$message.error('错了哦，这是一条错误消息');
              });
            }else{
              obj.mapid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
              // console.log(obj)
              this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNI1CG', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                if(res.data.rows.length>0){
                  this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNC0WD', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    this.$message({
                        message: '恭喜你，操作成功',
                        type: 'success'
                      })
                    }).catch(error=>{
                      this.$message.error('错了哦，这是一条错误消息');
                    });
                }else{
                  this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNI1LT', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                    var pobj=res.data.rows[0]
                    pobj.roleid=this.roleid
                    pobj.mapid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
                    this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNC0WD', this.$qs.stringify(pobj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                      this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNC0WD', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                      this.$message({
                          message: '恭喜你，操作成功',
                          type: 'success'
                        })
                      }).catch(error=>{
                        this.$message.error('错了哦，这是一条错误消息');
                      });
                    })
                  })
                }
              })
            }
          });
        }
      },
      getAllLevelMenu(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBYF1', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.alldata=res.data.rows
        })
      },
      getAllMenu(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBTDO', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          var allmenu=[]
          allmenu=res.data.rows
          allmenu.forEach(item=>{
            if(item.children){
              item.children=JSON.parse(item.children)
            }
          })
          this.data=allmenu
        })
      },
      getRoles(){
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBOM5', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            const roles=res.data.rows
            // console.log(this.roles)
            this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBPMH', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((rs)=>{
                this.staffs=rs.data.rows
                this.staffs.forEach(item=>{
                  if(item.roleid){
                    item.roleid=item.roleid.split(',')
                  }
                })

                roles.forEach(item1=>{
                  item1.staffs=[]
                  this.staffs.forEach(item2=>{
                    if(item2.roleid.includes(item1.roleid)){
                      item1.staffs.push(item2.name)
                    }
                  })
                })

                roles.forEach(item=>{
                  item.usernames=''
                  item.staffs.forEach(item1=>{
                    item.usernames+=item1+'，'
                  })
                })
                this.roles=roles;  
            }) 
        })
      },
      getAllRole(){

      },
      opendig(e){
        this.defaultExpand=[]
        this.defaultSelected=[]
        this.dialogFormVisible=true
        this.roleid=e
        var obj={}
        obj.roleid=this.roleid
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNBTQI', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          var personmenu=res.data.rows
          var expands=[]
          var selecteds=[]
          personmenu.forEach(item=>{
            if(item.pid==0){
              expands.push(item.id)
              this.data.forEach(item2=>{
                if(item2.id==item.id){
                  if(!item2.children){
                    // console.log(item2.id)
                    selecteds.push(item.id)
                  }
                }
              })
            }else{
              this.alldata.forEach(item1=>{
                if(item.id==item1.id){
                  selecteds.push(item1.id)
                }
              })
            }
          })
          this.defaultExpand=expands
          this.defaultSelected=selecteds
          // console.log(selecteds)
        })
      },
      toClose(){
        this.dialogFormVisible=false
        location.reload()
      },
      toTrueClose(){
        var obj={}
        obj.roleid=(new Date()).valueOf()+''+Math.ceil(Math.random()*10000)
        obj.rolename=this.form.rolename
        this.$axios.post('https://www.facebodyfitness.com/hi/main?hi=24CQRLLNC5AJ', this.$qs.stringify(obj), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          this.dialogFormVisible2=false
          location.reload()
          this.$message({
            message: '恭喜你，操作成功',
            type: 'success'
          })
        }).catch(error=>{
          this.$message.error('错了哦，这是一条错误消息');
        });
      },
      addRole(){
        this.dialogFormVisible8=true
      },
      closeWindow(){
        this.dialogFormVisible8=false      
      }
    }
}
</script>

<style >
.el-icon-close{
  display: none!important;
}
</style>
