<template>
  <div>
    <order-header :title="title">
      <template v-slot:tips>
        <span>{{tip}}</span>
      </template>
    </order-header>
    <router-view></router-view>
    <footer-service></footer-service>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import FooterService from './../components/FooterService'
import NavFooter from './../components/NavFooter'
export default {
  name:'order',
  data(){
    return{
      title:'',
      tip:''
    }
  },
  components:{
    OrderHeader,
    FooterService,
    NavFooter
  },
  mounted(){
    let path = this.$route.path;
    if(path === '/order/confirm'){
      this.title = '确认订单';
      this.tip = '';
    }else if(path === '/order/pay' || path === '/order/alipay'){
      this.title = '支付订单';
      this.tip = '请谨防钓鱼链接或诈骗电话';
    }else if(path === '/order/list'){
      this.title = '订单列表';
      this.tip = '请谨防钓鱼链接或诈骗电话';
    }
  }
}
</script>