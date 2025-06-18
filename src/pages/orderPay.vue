<template>
  <div class="order-pay">
      <div class=" wrapper container">
        <div class="info-wrapper">
          <div class="info-header">
            <div class="icon">
              <div class="icon-hook"></div>
            </div>
            <div class="pay-tips">
              <h2>订单提交成功！去付款咯～</h2>
              <p class="countdown">请在<span>1 小时 59 分</span>内完成支付, 超时后将取消订单</p>
              <p v-if="!showDetail">收货信息：{{addressInfo}}</p>
            </div>
            <div class="payable">
              <p>应付总额：<span>{{orderInfo.payment}}</span><span>元</span></p>
              <a href="javascript:;" @click="showDetail = !showDetail">订单详情<i :class="{'up': showDetail}"></i></a>
            </div>
          </div>
          <div class="order-detail" v-if="showDetail">
            <ul>
              <li><span class="key">订单号：</span><span class="value order-num">{{orderInfo.orderNo}}</span></li>
              <li><span class="key">收货信息：</span><span class="value">{{addressInfo}}</span></li>
              <li><span class="key">商品名称：</span><p v-for="(item, index) in goodList" :key="index"><span class="value">{{item.productName}}</span></p></li>
              <li><span class="key">发票信息：</span><span class="value">电子发票 个人</span></li>
            </ul>
          </div>
        </div>
        <div class="pay-wrapper">
          <div class="pay-title">
            <p>选择以下支付方式付款</p>
          </div>
          <div class="pay-way">
            <h3>支付平台</h3>
            <ul class="pay-list">
              <li class="pay-item" v-for="(item, index) in payList" :key="index" @click="paySubmit(item.payType)"><img v-lazy="item.link" alt="pay-logo"></li>
            </ul>
          </div>
          <div class="pay-way">
            <h3>银行借记卡及信用卡</h3>
            <ul class="pay-list">
              <li class="pay-item" v-for="(item, index) in showList" :key="index"><img v-lazy="item" alt="card-logo"></li>
              <li class="pay-item check-more" @click="changeList"><span>{{showTitle}}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <scan-pay-code
      :payImg="qrcodeImg"
      :showQrcode="showQrcode"
      @cancel="closeQrcode"></scan-pay-code>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import ScanPayCode from './../components/ScanPayCode'
export default {
  name:'order-pay',
  components:{
    ScanPayCode,
  },
  data(){
    return{
      orderInfo: {},
      showDetail: false,
      addressInfo: '',
      goodList:[],
      payList: [
        {
          payType: 0,
          link: "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/9a4f743d0bdb5c048ad9803914a4ea83.jpg"
        },{
          payType: 2,
          link: "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg"
        },{
          payType: 0,
          link: "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ead8cd015b07ca9f363ef9b6dd5e8e2.jpg"
        },{
          payType: 1,
          link: "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/9fcf10ba01a57b7d08d38b6f4ff3dfa8.jpg"
        }
      ],
      cardList: [
        "//s01.mifile.cn/i/banklogo/payOnline_zsyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_gsyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_jsyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_jtyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_nyyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_zgyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_youzheng.png",
        "//s01.mifile.cn/i/banklogo/payOnline_gfyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_pufa.png",
        "//s01.mifile.cn/i/banklogo/payOnline_gdyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_xyyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_msyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_shyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_bjnsyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_nbyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_hzyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_shnsyh.png",
        "//s01.mifile.cn/i/banklogo/payOnline_fcyh.png"
      ],
      showTitle: '查看更多',
      showNum: 11,  //控制银行卡列表的收放
      showQrcode: false, //是否显示微信二维码
      qrcodeImg: '',
      Temp: {}, //定时器id
    }
  },
  computed:{
    showList(){
      return this.cardList.slice(0, this.showNum);
    }
  },
  mounted(){
    this.getOrderInfo();
  },
  methods:{
    changeList(){
      if(this.showNum <= 11){
        this.showNum = 30;
        this.showTitle = '收起更多';
      }else{
        this.showNum = 11;
        this.showTitle = '查看更多';
      }
    },
    getOrderInfo(){
      let orderNo = this.$route.query.orderNo;
      this.axios.get(`/orders/${orderNo}`).then((res)=>{
        this.orderInfo = res;
        this.addressInfo = `${res.shippingVo.receiverName} ${res.shippingVo.receiverMobile} ${res.shippingVo.receiverProvince} ${res.shippingVo.receiverCity} ${res.shippingVo.receiverDistrict} ${res.shippingVo.receiverAddress}`;
        this.goodList = res.orderItemVoList;
      })
    },
    paySubmit(payType){
      let orderId = this.orderInfo.orderNo;
      switch(payType){
        case 1:
          window.open(`/#/order/alipay?orderId=${orderId}`, '_blank');
          break;
        case 2:
          this.axios.post('/pay', {
            orderId,
            orderName: '微信支付',
            amount: 0.01,
            payType: 2
          }).then(res => {
            QRCode.toDataURL(res.content).then(url => {
              this.showQrcode = true;
              this.qrcodeImg = url;
              this.loopOrderStatus();
            }).catch(err => {
              this.$message.error(err);
            })
          })
          break;
      }
    },
    closeQrcode(){
      clearInterval(this.Temp);
      this.showQrcode = false;
    },
    loopOrderStatus(){
      let orderNo = this.$route.query.orderNo;
      this.Temp = setInterval(()=>{
        this.axios.get(`/orders/${orderNo}`).then((res)=>{
          switch(res.status){
            case 20:
              this.closeQrcode();
              this.gotoOrderList();
              break;
          }
        })
      }, 1000)
    },
    gotoOrderList(){
      this.$router.push('/orderList');
    }
  }
}
</script>

<style lang="scss">
@import './../assets/scss/config';
@import './../assets/scss/mixin';
.order-pay{
  background-color: $colorJ;
  padding: 38px 0 61px;
  .wrapper{
    .info-wrapper{
      background-color: $colorG;
      padding: 30px 48px 30px 50px;
      margin-bottom: 30px;
      .info-header{
        display: flex;
        .icon{
          width: 133px;
          .icon-hook{
            @include bgImg(84px, 84px, 'icon-gou.png', 50px);
            background-color: #80c58a;
            border-radius: 50%;
            margin-top: 10px;
          }
        }
        .pay-tips{
          padding: 20px 0;
          flex-grow: 1;
          h2{
            font-size: 24px;
            font-weight: 400;
            line-height: 36px;
            margin-bottom: 10px;
          }
          p{
            font-size: 14px;
            line-height: 1.5;
            color: $colorC;
            margin-bottom: 5px;
            &.countdown{
              line-height: 2;
              span{
                margin: 0 5px;
                color: $colorA;
              }
            }
          }
        }
        .payable{
          padding: 20px 0;
          color: $colorC;
          line-height: 1.5;
          text-align: right;
          p{
            font-size: 14px;
            margin-bottom: 16px;
            span{
              color: $colorA;
              &:first-child{
                font-size: 24px;
              }
            }
          }
          a{
            font-size: 14px;
            color: $colorC;
            &:hover{
              color: $colorA;
            }
            i{
              display: inline-block;
              @include bgImg(14px, 10px, 'icon-down.png');
              background-size: 10px;
              margin: 0 6px;
              transition: all .5s;
              &.up{
                transform: rotate(180deg);
              }
            }
          }
        }
      }
      .order-detail{
        padding-left: 133px;
        font-size: 14px;
        line-height: 24px;
        ul{
          transition: height .3s;
          margin-top: 10px;
          border-top: solid 1px $colorH;
          padding-top: 20px;
          li{
            margin-bottom: 8px;
            position: relative;
            .key{
              position: absolute;
            }
            .value{
              padding-left: 85px;
            }
            .order-num{
              color: $colorA;
            }
          }
        }
      }
    }
    .pay-wrapper{
      background-color: $colorG;
      padding: 30px 48px;
      .pay-title{
        height: 50px;
        border-bottom: solid 1px $colorH;
        margin-bottom: 30px;
        p{
          font-size: 18px;
          font-weight: 400;
          line-height: 1.5;
        }
      }
      .pay-way{
        margin-bottom: 30px;
        h3{
          font-size: 16px;
          line-height: 1.5;
          color: #616161;
          margin-bottom: 15px;
        }
        .pay-list{
          display: flex;
          flex-wrap: wrap;
          margin-left: -14px;
          .pay-item{
            width: 174px;
            height: 60px;
            line-height: 60px;
            border: solid 1px $colorH;
            margin: 0 0 14px 14px;
            cursor: pointer;
            transition: all .2s;
            overflow: hidden;
            &:hover{
              border-color: $colorA;
            }
            &.check-more{
              font-size: 14px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>