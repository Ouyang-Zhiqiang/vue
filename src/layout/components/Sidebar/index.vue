<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!--        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />-->
        <sidebar-item v-for="route in menuList" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'



export default {
  components: { SidebarItem, Logo },

  data(){
    return{
      menuStartList:[],
      mymiddleList:[],
      menuList:[]
    }
  },

  created() {
    this.getRoute();
  },
  methods:{
    getRoute(){
        if(localStorage.getItem('myphone')=='admin'){
          this.$axios.post('https://www.facebodyfitness.com/web/new/getFunction', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            var mylist=res.data
            var parentArr=[]
            mylist.forEach(item=>{
              if(item.pid==0){
                item.path=item.shortname.split('/')[0]
                item.hidden=0
                item.redirect=null
                item.meta={}
                item.meta.title=item.title
                item.meta.icon='excel'
                item.children=[]
                item.name=item.title
                parentArr.push(item)
              }
            })

            mylist.forEach(item=>{
              parentArr.forEach(item1=>{
                if(item.pid==item1.id){
                  item.path=item.shortname.split('/')[1]
                  item.hidden=0
                  item.redirect=null
                  item.meta={}
                  item.meta.title=item.title
                  item.meta.icon=''
                  item1.children.push(item)
                }
              })
            })

            parentArr.forEach(item=>{
              if(item.children.length==0){
                var obj={}
                if(obj.path=item.shortname.split('/')[1]=='index'){
                  obj.id=item.id
                  obj.redirect=null
                  obj.path=''
                  obj.hidden=0
                  obj.meta={}
                  obj.meta.title=item.title
                  item.children.push(obj)
                }else{
                  obj.id=item.id
                  obj.redirect=null
                  obj.path=item.shortname.split('/')[1]
                  obj.hidden=0
                  obj.meta={}
                  obj.meta.title=item.title
                  item.children.push(obj)
                }
              }
            })
            this.menuList=parentArr
          });
        }else{
          var phone={tel:localStorage.getItem('myphone')}
          this.$axios.post('https://www.facebodyfitness.com/web/new/getRoleid', this.$qs.stringify(phone), {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
              var myroles=res.data.roleid.split(',')
              this.$axios.post('https://www.facebodyfitness.com/web/new/getFunction', {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
                  var menus=res.data
                  var mylist=[]
                  menus.forEach((item)=>{
                    item.roles=item.roles.substr(1)
                    item.roles=item.roles.substr(0, item.roles.length-1)
                    item.roles=item.roles.split(',')
                    if(item.roles==null){
                    }else{
                      item.roles.forEach(item1=>{
                        myroles.forEach(item3=>{
                          if(item3==item1){
                            mylist.push(item)
                          }
                        })
                      })
                    }
                  })
                mylist=this.unique(mylist)
                var parentArr=[]
                mylist.forEach(item=>{
                  if(item.pid==0){
                    item.path=item.shortname.split('/')[0]
                    item.hidden=0
                    item.redirect=null
                    item.meta={}
                    item.meta.title=item.title
                    item.meta.icon='excel'
                    item.children=[]
                    item.name=item.title
                    parentArr.push(item)
                  }
                })
 
                mylist.forEach(item=>{
                  parentArr.forEach(item1=>{
                    if(item.pid==item1.id){
                      item.path=item.shortname.split('/')[1]
                      item.hidden=0
                      item.redirect=null
                      item.meta={}
                      item.meta.title=item.title
                      item.meta.icon=''
                      item1.children.push(item)
                    }
                  })
                })

                parentArr.forEach(item=>{
                  if(item.children.length==0){
                    var obj={}
                    if(obj.path=item.shortname.split('/')[1]=='index'){
                      obj.id=item.id
                      obj.redirect=null
                      obj.path=''
                      obj.hidden=0
                      obj.meta={}
                      obj.meta.title=item.title
                      item.children.push(obj)
                    }else{
                      obj.id=item.id
                      obj.redirect=null
                      obj.path=item.shortname.split('/')[1]
                      obj.hidden=0
                      obj.meta={}
                      obj.meta.title=item.title
                      item.children.push(obj)
                    }
                  }
                })
                this.menuList=parentArr
              });
          });
        }
      },
      unique(arr){            
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i].id==arr[j].id){         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j, 1);
                    j--;
                }
            }
          }
        return arr;
      }
  },

  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    
    
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>