<template>
  <div id="container" style="padding:15px">
    秒杀记录
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
        
      }
    },
    mounted() {
    },
    created(){

    },
    methods:{
      
    }
}
</script>

<style scoped>
    
</style>
