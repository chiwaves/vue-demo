<template>
  <div class="detail">
    <product-params :title="product.name"></product-params>
    <div class="wrapper container">
      <div class="swiper-box">
        <template>
          <swiper :options="swiperOptions">
            <swiper-slide><img src="/imgs/detail/phone-1.jpg" alt="slide-img"></swiper-slide>
            <swiper-slide><img src="/imgs/detail/phone-2.jpg" alt="slide-img"></swiper-slide>
            <swiper-slide><img src="/imgs/detail/phone-3.jpg" alt="slide-img"></swiper-slide>
            <swiper-slide><img src="/imgs/detail/phone-4.jpg" alt="slide-img"></swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </template>
      </div>
      <div class="content">
        <h2>{{product.name}}</h2>
        <p class="subtitle">
          前置3200万自拍 / 索尼4800万超广角三摄 / 多色炫彩轻薄机身 / 6.39英寸三星 AMOLED水滴屏<br>
          /4030mAh大电量 / 骁龙710处理器 / 屏幕指纹 / NFC功能 / 红外遥控功能 / Game Turbo2.0游戏加速
        </p>
        <p class="shop-name" title="企业名称：小米通讯技术有限公司
企业执照注册号：91110108558521630L
企业地址：北京市海淀区西二旗中路33号院6 号楼9层019号
企业电话：400-100-5678
营业期限：2010年08月25日 至 2040年08月24日
经营范围：开发手机技术、计算机软件及信息技术；etc">小米自营</p>
        <p class="price">{{product.price}} 元<span class="discount">{{product.price + 1000}} 元</span></p>
        <div class="line"></div>
        <div class="loca">
          <span class="loca-icon"><img src="/imgs/detail/icon-loc.png" alt="icon"></span>
          <div class="loca-box">
            <span>上海</span><span>上海市</span><span>徐汇区</span><span>凌云路街道</span><span class="modify" @click="showModal = true">修改</span>
          </div>
          <p class="status">有现货</p>
        </div>
        <h3>选择版本</h3>
        <ul class="selection">
          <li :class="{active: version === 0}" @click="version = 0">{{verChoice[0]}}</li>
          <li :class="{active: version === 1}" @click="version = 1">{{verChoice[1]}}</li>
        </ul>
        <h3>选择颜色</h3>
        <ul class="selection">
          <li :class="{active: color === 0}" @click="color = 0">{{colChoice[0]}}</li>
          <li :class="{active: color === 1}" @click="color = 1">{{colChoice[1]}}</li>
          <li :class="{active: color === 2}" @click="color = 2">{{colChoice[2]}}</li>
        </ul>
        <div class="summary">
          <div class="box">
            <p class="final-choice">{{product.name}} {{verChoice[version]}} {{colChoice[color]}}</p>
            <p class="unit-price">{{product.price}}元</p>
          </div>
          <p class="final-price">总计：{{product.price}}元</p>
        </div>
        <div class="btn-box btn-group">
          <button class="buy btn btn-huge" @click="addCart">加入购物车</button>
          <button class=" like btn btn-huge btn-grey">喜欢</button>
        </div>
        <div class="after-sale-info">
          <span><i>√</i><em>小米自营</em></span>
          <span><i>√</i><em>小米发货</em></span>
          <span><i>√</i><em>7天无理由退货</em></span>
          <span><i>√</i><em>运费说明</em></span>
          <span><i>√</i><em>企业信息</em></span>
          <span><i>√</i><em>售后服务政策</em></span>
          <span><i>√</i><em>7天价格保护</em></span>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h3>价格说明</h3>
        <div class="price-des">
          <img src="/imgs/detail/item-price.jpeg" alt="price-info">
        </div>
      </div>
    </div>
    <footer-service></footer-service>
    <modal
    sureText="去购物车结算"
    cancelText="返回"
    btnType="3"
    modalType="middle" 
    :showModal="showModal"
    @submit="gotoCart"
    @cancel="showModal=false">
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>
<script>
  import ProductParams from './../components/ProductParam'
  import FooterService from './../components/FooterService'
  import Modal from './../components/Modal'
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  export default {
    name:'detail',
    components:{
      ProductParams,
      FooterService,
      Modal,
      Swiper,
      SwiperSlide
    },
    data(){
      return {
        swiperOptions: {
          effect: 'fade',
          loop: true,
          autoplay: {
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl:'.swiper-button-prev'
          }
        },
        product: {},
        version: 0,
        color: 0,
        verChoice: ['6GB+64GB', '8GB+128GB'],
        colChoice: ['钛银黑', '冰海蓝', '珍珠白'],
        showModal: false,
        error:''
      }
    },
    mounted(){
      this.getProductInfo();
    },
    methods:{
      getProductInfo(){
        let id = this.$route.params.id;
        this.axios.get('/products/' + id).then((res)=>{
          this.product = res;
        })
      },
      addCart(){
        this.axios.post('/carts', {
          productId: this.product.id,
          selected: true
        }).then((res)=>{
          this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
          this.showModal = true;
        }).catch((res)=>{
          this.error = res;
        })
      },
      gotoCart(){
        this.$router.push('/cart');
      }
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/config';
  @import './../assets/scss/mixin';
  .detail{
    .wrapper{
      display: flex;
      justify-content: space-between;
      padding: 32px 0 10px;
      .swiper-box{
        width: 600px;
        .swiper-container{
          width: 560px;
          text-align: center;
          img{
            width: 100%;
          }
          .swiper-button-prev{
            left: 0;
          }
          .swiper-button-next{
            right: 0;
          }
          .swiper-button-prev, .swiper-button-next{
            width: 40px;
            height: 70px;
            top: 47%;
            color: #66666652;
            &:hover{
              color:$colorG;
              background-color: #66666652;
              border-radius: 4px;
            }
          }
        }
      }
      .content{
        width: 600px;
        h2{
          font-size: 24px;
          font-weight: 400;
        }
        .subtitle{
          font-size: 14px;
          color: $colorD;
          padding-top: 8px;
          line-height: 1.5;
        }
        .shop-name{
          color: $colorA;
          font-size: 14px;
          margin-top: 1em;
        }
        .price{
          color: $colorA;
          font-size: 18px;
          padding: 12px 0 10px;
          .discount{
            color: $colorD;
            font-size: 14px;
            text-decoration: line-through;
            margin-left: 6px;
          }
        }
        .line{
          height: 12px;
          border-bottom: 1px solid $colorH;
        }
        .loca{
          margin: 20px 0;
          background-color: #fafafa;
          border: 1px solid #e0e0e0;
          padding: 30px 50px;
          font-size: 14px;
          line-height: 1.5;
          position: relative;
          .loca-icon{
            display: block;
            position: absolute;
            top: 32px;
            left: 24px;
            width: 16px;
            height: 16px;
            img{
              width: 74%;
              height: 100%;
            }
          }
          .loca-box{
            span{
              margin-right: 14px;
            }
            .modify{
              color: $colorA;
              cursor: pointer;
            }
          }
          .status{
            color: $colorA;
          }
        }
        h3{
          font-size: 18px;
          font-weight: 400;
        }
        .selection{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 30px;
          li{
            width: 292px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            font-size: 16px;
            color: $colorC;
            border: 1px solid #e0e0e0;
            margin-top: 10px;
            cursor: pointer;
            &:hover{
              color: $colorA;
              border-color: $colorA;
            }
          }
          .active{
            color: $colorA;
            border-color: $colorA;
          }
        }
        .summary{
          background-color: #f9f9f9;
          margin-bottom: 30px;
          padding: 30px;
          color: $colorC;
          .box{
            display: flex;
            justify-content: space-between;
            p{
              font-size: 14px;
              line-height: 1.5;
            }
          }
          .final-price{
            margin-top: 20px;
            font-size: 24px;
            color: $colorA;
          }
          }
        .btn-box{
          margin: 10px 0 20px;
          .like{
            width: 140px;
          }
        }
        .after-sale-info{
          display: flex;
          flex-wrap: wrap;
          span{
            font-size: 14px;
            color: $colorD;
            margin-right: 15px;
            margin-bottom: 20px;
            display: flex;
            i{
              width: 16px;
              height: 16px;
              text-indent: 2px;
              line-height: 22px;
              border: 1.5px solid $colorD;
              border-radius: 50%;
            }
            em{
              font-style: normal;
              margin-left: 3px;
              line-height: 19px;
            }
          }
        }
      }
    }
    .price-info{
      height: 316px;
      background-color: #f5f5f5;
      h3{
        font-size: 22px;
        font-weight: 400;
        padding: 1em 0;
      }
    }
  }
</style>