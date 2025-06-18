<template>
  <transition name="slide">
    <div class="scan-pay-code" v-show="showQrcode">
      <div class="mask" @click="$emit('cancel')"></div>
      <div class="wx-dialog">
        <h3><span>微信支付</span><a href="javascript:;" @click="$emit('cancel')">×</a></h3>
        <div class="content">
          <div class="pic">
            <img :src="payImg" alt="qrcode">
            <div class="tips-detail"></div>
          </div>
          <div class="tips">
            <p>请使用 <span>微信</span> 扫一扫</p>
            <p>二维码完成支付</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "scan-pay-code",
  props:['payImg', 'showQrcode'],
}
</script>

<style lang="scss">
@import './../assets/scss/config';
@import './../assets/scss/mixin';
.scan-pay-code{
  @include position(fixed);
  z-index: 50;
  .mask{
    @include position(fixed);
    background-color: $colorI;
    opacity: .5;
  }
  .wx-dialog{
    @include position(absolute, 50%, 50%, 370px, auto);
    background-color: $colorG;
    transform: translate(-50%, -50%);
    h3{
      @include flex();
      height: 60px;
      padding: 0 20px;
      background-color: $colorJ;
      span{
        font-size: 18px;
        font-weight: 400;
      }
      a{
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        font-size: 24px;
        font-weight: 200;
        font-style: normal;
        transition: all .2s;
        &:hover{
          color: $colorG;
          background-color: #e53935;
        }
      }
    }
    .content{
      padding: 20px;
      .pic{
        width: 290px;
        height: 290px;
        margin: 0 auto 10px;
        img{
          width: 100%;
          height: 100%;
        }
        .tips-detail{
          @include posImg(absolute, -30px, 366px, 0px, 488px, 'pay/icon-scan.png');
          opacity: 0;
          transition: opacity .5s;
        }
        &:hover{
          .tips-detail{
            width: 307px;
            opacity: 1;
          }
        }
      }
      .tips{
        font-size: 14px;
        line-height: 1.5;
        text-align: center;
      }
    }
  }
  &.slide-enter-active, &.slide-leave-active{
    transition: all .5s;
  }
  &.slide-enter, &.slide-leave-to{
    top: -2%;
    opacity: 0;
  }
}
</style>