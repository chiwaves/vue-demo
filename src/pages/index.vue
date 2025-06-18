<template>
    <div class="index">
        <div class="container">
            <div class="swiper-box">
                <div class="site-category">
                    <ul class="categoryList">
                        <li class="category-item">
                            <a href="javascript:;" class="item-name">手机 电话卡</a>
                            <div class="children">
                                <ul v-for="(item, i) in menuList" :key="i">
                                    <li v-for="(sub, j) in item" :key="j">
                                        <a :href="sub ? '/#/product/' + sub.id : ''" target="_blank">
                                            <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="menu-image">
                                            <span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="category-item">
                            <a href="javascript:;" class="item-name">电视 盒子</a>
                            <div class="children">
                                <ul v-for="(item, i) in menuList" :key="i">
                                    <li v-for="(sub, j) in item" :key="j">
                                        <a :href="sub ? '/#/product/' + sub.id : ''" target="_blank">
                                            <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="menu-image">
                                            <span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="category-item">
                            <a href="javascript:;" class="item-name">笔记本 显示器 平板</a>
                            <div class="children">
                                <ul v-for="(item, i) in menuList" :key="i">
                                    <li v-for="(sub, j) in item" :key="j">
                                        <a :href="sub ? '/#/product/' + sub.id : ''" target="_blank">
                                            <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="menu-image">
                                            <span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="category-item">
                            <a href="javascript:;" class="item-name">家电 插线板</a>
                            <div class="children">
                                <ul v-for="(item, i) in menuList" :key="i">
                                    <li v-for="(sub, j) in item" :key="j">
                                        <a :href="sub ? '/#/product/' + sub.id : ''" target="_blank">
                                            <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="menu-image">
                                            <span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="category-item">
                            <a href="javascript:;" class="item-name">出行 穿戴</a>
                            <div class="children">
                                <ul v-for="(item, i) in menuList" :key="i">
                                    <li v-for="(sub, j) in item" :key="j">
                                        <a :href="sub ? '/#/product/' + sub.id : ''" target="_blank">
                                            <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="menu-image">
                                            <span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="category-item">
                            <a href="javascript:;" class="item-name">智能 路由器</a>
                            <div class="children">
                                <ul v-for="(item, i) in menuList" :key="i">
                                    <li v-for="(sub, j) in item" :key="j">
                                        <a :href="sub ? '/#/product/' + sub.id : ''" target="_blank">
                                            <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="menu-image">
                                            <span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="category-item">
                            <a href="javascript:;" class="item-name">电源 配件</a>
                            <div class="children">
                                <ul v-for="(item, i) in menuList" :key="i">
                                    <li v-for="(sub, j) in item" :key="j">
                                        <a :href="sub ? '/#/product/' + sub.id : ''" target="_blank">
                                            <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="menu-image">
                                            <span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="category-item">
                            <a href="javascript:;" class="item-name">健康 儿童</a>
                            <div class="children">
                                <ul v-for="(item, i) in menuList" :key="i">
                                    <li v-for="(sub, j) in item" :key="j">
                                        <a :href="sub ? '/#/product/' + sub.id : ''" target="_blank">
                                            <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="menu-image">
                                            <span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="category-item">
                            <a href="javascript:;" class="item-name">耳机 音箱</a>
                            <div class="children">
                                <ul v-for="(item, i) in menuList" :key="i">
                                    <li v-for="(sub, j) in item" :key="j">
                                        <a :href="sub ? '/#/product/' + sub.id : ''" target="_blank">
                                            <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="menu-image">
                                            <span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="category-item">
                            <a href="javascript:;" class="item-name">生活 箱包</a>
                            <div class="children">
                                <ul v-for="(item, i) in menuList" :key="i">
                                    <li v-for="(sub, j) in item" :key="j">
                                        <a :href="sub ? '/#/product/' + sub.id : ''" target="_blank">
                                            <img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="menu-image">
                                            <span>{{sub ? sub.name : '小米9'}}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <swiper :options="swiperOptions">
                    <swiper-slide v-for="(item, index) in slideList" :key="index">
                        <a :href="'/#/product/' + item.id"><img :src=item.img alt="slider"></a>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="ads-box">
              <a :href="'/#/product/' + item.id" v-for="(item, index) in adsList" :key="index" target="_blank">
                <img :src="item.img" alt="ads-image">
              </a>
            </div>
            <div class="banner">
              <a href="/#/product/30" target="_blank">
                <img src="/imgs/banner-1.png" alt="banner-image">
              </a>
            </div>
        </div>
        <div class="product-box">
            <div class="container">
                <h2>手机</h2>
                <div class="wrapper">
                    <div class="banner-left">
                        <a href="/#/product/35">
                            <img src="/imgs/mix-alpha.jpg" alt="banner-image">
                        </a>
                    </div>
                    <ul class="list-box">
                        <li class="list-item" v-for="(item, index) in proList" :key="index">
                            <span :class="{'newest': item.id==38}" @click="showModal = true">新品</span>
                            <a :href="'/#/product/' + item.id" target="_blank">
                                <div class="item-img">
                                    <img v-lazy="item.mainImage" alt="products">
                                </div>
                                <h3>{{item.name}}</h3>
                                <p>{{item.subtitle}}</p>
                                <p class="price">
                                    {{item.price}}元起
                                </p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <footer-service></footer-service>
        <modal
        sureText="查看购物车"
        btnType="1"
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
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import FooterService from './../components/FooterService'
    import Modal from './../components/Modal'
    export default {
        name:'index',
        components:{
            Swiper,
            SwiperSlide,
            FooterService,
            Modal
        },
        data(){
            return{
                swiperOptions:{
                    effect: 'fade',
                    loop: true,
                    autoplay: {
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl:'.swiper-button-prev'
                    }
                },
                slideList:[
                    {
                        id:'42',
                        img:'/imgs/slider/slide-1.jpg'
                    },
                    {
                        id:'45',
                        img:'/imgs/slider/slide-2.jpg'
                    },
                    {
                        id:'46',
                        img:'/imgs/slider/slide-3.jpg'
                    },
                    {
                        id:'',
                        img:'/imgs/slider/slide-4.jpg'
                    },
                    {
                        id:'',
                        img:'/imgs/slider/slide-5.jpg'
                    }
                ],
                menuList:[
                    [
                        {
                            id:30,
                            img:'/imgs/item-box-1.png',
                            name:'小米CC9',
                        },{
                            id:31,
                            img:'/imgs/item-box-2.png',
                            name:'小米8青春版',
                        },{
                            id:32,
                            img:'/imgs/item-box-3.jpg',
                            name:'Redmi K20 Pro',
                        },{
                            id:33,
                            img:'/imgs/item-box-4.jpg',
                            name:'移动4G专区',
                        }
                    ],
                    [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]
                ],
                adsList:[
                  {
                    id:33,
                    img:'/imgs/ads/ads-1.png'
                  },{
                    id:48,
                    img:'/imgs/ads/ads-2.jpg'
                  },{
                    id:45,
                    img:'/imgs/ads/ads-3.png'
                  },{
                    id:47,
                    img:'/imgs/ads/ads-4.jpg'
                  }
                ],
                proList:[],
                showModal:false
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                this.axios.get('/products', {
                    params:{
                        categoryId:100012,
                        pageSize:20
                    }
                }).then((res)=>{
                    this.proList = res.list.slice(6, 14)
                })
            },
            gotoCart(){
                this.$router.push('/cart');
            }
        }
    }
</script>

<style lang="scss">
    @import './../assets/scss/bass';
    @import './../assets/scss/mixin';
    @import './../assets/scss/config';
    .index{
        .swiper-box{
            .site-category{
                width: 234px;
                height: 420px;
                position: absolute;
                z-index: 7;
                padding: 20px 0;
                background-color: rgba(105,101,101,.6);
                .category-item{
                    height: 42px;
                    line-height: 42px;
                    .item-name{
                        position: relative;
                        display: block;
                        font-size: 14px;
                        color: $colorG;
                        padding-left: 30px;
                        &::after{
                            content:' ';
                            @include bgImg(10px, 14px, 'icon-arrow.png');
                            position: absolute;
                            right: 20px;
                            top: 14px;
                        }
                    }
                    .children{
                        display: none;
                        width: 992px;
                        height: 460px;
                        position: absolute;
                        top: 0;
                        left: 234px;
                        background-color: $colorG;
                        border-right: 1px solid $colorH;
                        border-top: 1px solid $colorH;
                        border-bottom: 1px solid $colorH;
                        box-sizing: border-box;
                        box-shadow: 0 8px 16px rgba(0,0,0,.18);
                        ul{
                            display: flex;
                            li{
                                flex: 1;
                                a{
                                  display: flex;
                                  padding: 18px 20px;
                                  height: 40px;
                                  line-height: 40px;
                                    img{
                                        width: 48px;
                                        height: 40px;
                                        margin-right: 14px;
                                    }
                                    span{
                                        font-size: 14px;
                                        color: $colorB;
                                    }
                                    &:hover{
                                        span{
                                            color: $colorA;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    &:hover{
                      background-color: $colorA;
                      .children{
                        display: block;
                      }
                    }
                }
            }
            .swiper-container {
                height:460px;
                img{
                    width: 100%;
                    height: 100%;
                }
                .swiper-button-prev{
                    left:234px;
                }
                .swiper-button-next{
                    right:0;
                }
                .swiper-button-prev, .swiper-button-next{
                    padding: 1% .7%;
                    color: #66666652;
                    &:hover{
                        color:$colorG;
                        background-color: #66666652;
                        border-radius: 4px;
                    }
                }
            }
        }
        .ads-box{
            @include flex();
            margin-top: 14px;
            a{
                img{
                width: 296px;
                height: 167px;
                }
            }
        }
        .banner{
            margin: 22px 0;
            a{
                display: block;
                width: 1226px;
                height: 130px;
                img{
                width: 100%;
                }
            }
        }
        .product-box{
            background-color: $colorJ;
            padding-bottom: 50px;
            h2{
                font-size: 22px;
                font-weight: 200;
                line-height: 58px;
            }
            .wrapper{
                display: flex;
                .banner-left{
                    margin-right: 14px;;
                    a{
                        display: block;
                        width: 234px;
                        height: 614px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .list-box{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-content: space-between;
                    .list-item{
                        width: 234px;
                        height: 300px;
                        text-align: center;
                        background-color: $colorG;
                        transition: all .2s linear;
                        position: relative;
                        &:hover{
                            margin-top: -2px;
                            box-shadow: 0 20px 20px rgba(0,0,0,.08);
                        }
                        span{
                            position: absolute;
                            left: 85px;
                            top: 0;
                            display: inline-block;
                            width: 64px;
                            height: 24px;
                            font-size: 14px;
                            line-height: 24px;
                            color: $colorG;
                            border-radius: 3px;
                            cursor: pointer; // attention!
                            &.newest{
                                background-color: #7ECF68;
                            }
                            &.spike{
                                background-color: #e82626;
                            }
                        }
                        a{
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                            .item-img{
                                margin: 20px auto 18px;
                                img{
                                    height: 160px;
                                }
                            }
                            h3{
                                margin: 0 auto 8px;
                                font-size: 14px;
                                font-weight: 400;
                                color: $colorB;
                                line-height: 14px;
                            }
                            p{
                                margin: 0 10px 10px;
                                height: 18px;
                                font-size: 12px;
                                color: #b0b0b0;
                            }
                            .price{
                                font-size: 14px;
                                color: #ff6700;
                                margin: 0 10px 14px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>