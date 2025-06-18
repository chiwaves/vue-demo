<template>
  <div class="alipay">
    <img src="/imgs/loading-svg/loading-bars.svg" alt="loading">
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name:'alipay',
  data(){
    return{
      content: '',
    }
  },
  mounted(){
    this.gotoAlipay();
  },
  methods:{
    gotoAlipay(){
      let orderId = this.$route.query.orderId;
      let orderName = `玄烨科技${orderId}号订单`;
      this.axios.post('/pay', {
        orderId,
        orderName,
        amount: 0.01,
        payType: 1
      }).then((res)=>{
        this.content = res.content;
        setTimeout(()=>{
          document.forms[0].submit();
        }, 100)
      })
    }
  }
}
</script>

<style lang="scss">
.alipay{
  height: 80px;
  line-height: 80px;
  padding: 30px 0;
  text-align: center;
  img{
    height: 100%;
  }
}
</style>