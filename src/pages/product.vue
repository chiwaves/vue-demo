<template>
  <div class="product">
    <product-param :title="product.name">
			<template v-slot:buy>
				<button class="btn btn-pro" @click="buy">立即购买</button>
			</template>
		</product-param>
    <div class="content">
			<div class="first">
				<div class="intro">
					<img src="/imgs/product/title-1.png" alt="bg-img">
					<h4>{{product.subtitle}}</h4>
					<div class="price">
						<span class="num">{{product.price}}</span>
						<span class="qi">元起</span>
					</div>
				</div>
			</div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper :options="swiperOptions">
          <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <h3>{{product.name}} AI变焦三摄拍摄</h3>
      </div>
      <div class="item-video">
        <h3>60帧超慢动作摄影<br>慢慢回味每一瞬间的精彩</h3>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <div class="video-bg" @click="showSlide = 'slideDown'"></div>
        <div class="video-box" v-if="showSlide">
          <div class="overlay" @click="closeVideo"></div>
          <div class="video" :class="showSlide">
            <span class="icon-close" @click="closeVideo">×</span>
            <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
          </div>
        </div>
      </div>
      <div class="qr-code">
        <div class="container">
          <div class="qrcode-item">
            <img src="imgs/product/qrcode-mimall.png" alt="qr-code">
            <div class="text">
              <p class="title">扫码关注【<span>小米商城</span>】公众号</p>
              <p class="subtitle">回复“热爱”，抽送Redmi 10X！</p>
            </div>
          </div>
          <div class="qrcode-item">
            <img src="imgs/product/qrcode-mifans.jpg" alt="qr-code">
            <div class="text">
              <p class="title">扫码关注【<span>小米米粉之家</span>】公众号</p>
              <p class="subtitle">回复“真心想要”，抽送一部Redmi 10X！</p>
            </div>
          </div>
        </div>
      </div>
		</div>
    <footer-service></footer-service>
  </div>
</template>
<script>
  import ProductParam from './../components/ProductParam'
  import FooterService from './../components/FooterService'
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  export default {
    name:'product',
    components:{
      ProductParam,
      Swiper,
      SwiperSlide,
      FooterService
    },
    data(){
      return{
        showSlide: '',
        product: '',
        swiperOptions: {
          loop: true,
          slidesPerView: 3,
          spaceBetween: 30,
          freeMode: true,
          autoplay: {
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    mounted(){
      this.getProductInfo();
    },
    methods:{
      getProductInfo(){
        let id = this.$route.params.id;
        this.axios.get(`/products/${id}`).then((res)=>{
          this.product = res;
        })
      },
      closeVideo(){
        this.showSlide = 'slideUp';
        setTimeout(()=>{
          this.showSlide = '';
        }, 500)
      },
      buy(){
        let id = this.$route.params.id;
        this.$router.push(`/detail/${id}`);
      }
    }
  }
</script>

<style lang="scss">
  @import './../assets/scss/config';
  @import './../assets/scss/mixin';
	.product{
    .btn-pro{
      width: 120px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
    }
		.content{
			.first{
				height: 917px;
				background: url("/imgs/product/product-intro-1.jpg") 50% 0 no-repeat;
				background-size: auto 100%;
        position: relative;
        transition-delay: .5s;
				.intro{
          text-align: center;
          padding-top: 88px;
					img{
						height: 66px;
            margin-bottom: 14px;
					}
					h4{
						font-size: 22px;
            font-weight: normal;
						margin-bottom: 10px;
					}
					.price{
            color: $colorA;
						.num{
							font-size: 28px;
						}
						.qi{
              font-size: 14px;
						}
					}
				}
      }
      .item-bg-2{
        height: 480px;
        background: url('/imgs/product/product-bg-2.png') no-repeat center;
        background-size: 80%;
      }
      .item-bg-3{
        height: 638px;
        background: url('/imgs/product/product-bg-3.png') no-repeat center;
        background-size: cover;
      }
      .item-swiper{
        margin: 36px auto 52px;
        .swiper-container{
          cursor: grab;
          .swiper-pagination-bullet-active{
            background-color: $colorA;
          }
          img{
            width: 100%;
          }
        }
        h3{
          font-size: 18px;
          font-weight: normal;
          text-align: center;
          padding-top: 8px;
        }
      }
      .item-video{
        text-align: center;
        background-color: #171717;
        color: $colorG;
        padding-bottom: 82px;
        h3{
          font-size: 60px;
          padding: 82px 0 47px;
        }
        p{
          font-size: 24px;
          padding-bottom: 58px;
        }
        .video-bg{
          width: 1226px;
          height: 540px;
          margin: 0 auto;
          background: url('/imgs/product/gallery-1.png') no-repeat;
          background-size: cover;
          cursor: pointer;
        }
        .video-box{
          .overlay{
            @include position(fixed);
            background-color: $colorI;
            opacity: .5;
          }
          @keyframes slideDown {
            from{
              top: -50%;
              opacity: 0;
            }
            to{
              top: 50%;
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from{
              top: 50%;
              opacity: 1;
            }
            to{
              top: -50%;
              opacity: 0;
            }            
          }
          .video{
            @include position(fixed, -50%, 50%, 1000px, 560px);
            transform: translate(-50%, -50%);
            &.slideDown{
              animation: slideDown .5s linear;
              top: 50%;
              opacity: 1;
            }
            &.slideUp{
              animation: slideUp .5s linear;
            }
            video{
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .icon-close{
              display: inline-block;
              @include position(absolute, 3%, 94%, 40px, 40px);
              z-index: 10;
              color: $colorG;
              font-size: 30px;
              line-height: 40px;
              &:hover{
                cursor: pointer;
                background-color: #e53935;
                border-radius: 50%;
              }
            }
          }
        }
      }
      .qr-code{
        background-color: #f5f5f5;
        .container{
          display: flex;
          justify-content: space-between;
          .qrcode-item{
            display: flex;
            align-items: center;
            padding: 45px 0;
            img{
              display: inline-block;
              width: 100px;
              height: 100px;
              margin: 0 35px 0 35px;
            }
            .text{
              display: inline-block;
              .title{
                font-size: 28px;
                line-height: 44px;
                span{
                  color: $colorA;
                }
              }
              .subtitle{
                font-size: 14px;
              }
            }
          }
        }
      }
		}
	}
</style>