<template>
    <div class='header'>
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;" class="link">小米商城</a>
                    <a href="javascript:;" class="link">MIUI</a>
                    <a href="javascript:;" class="link">云服务</a>
                    <a href="javascript:;" class="link">协议规则</a>
                </div>
                <div class="topbar-user">
                    <div class="user-name">
                        <span class="name" v-if="username">{{username}}<i></i></span>
                        <div class="user-menu">
                            <ul>
                                <li><a href="javascript:;">个人中心</a></li>
                                <li><a href="javascript:;">评价晒单</a></li>
                                <li><a href="javascript:;">我的喜欢</a></li>
                                <li><a href="javascript:;">小米账户</a></li>
                                <li><a href="javascript:;" @click="logout">退出登录</a></li>
                            </ul>
                        </div>
                    </div>
                    <a href="javascript:;" class="link" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" class="link" v-if="username">消息通知</a>
                    <a href="/#/orderList" class="link" v-if="username" target="_blank">我的订单</a>
                    <a href="/#/cart" class="my-cart" target="_blank"><span class="icon-cart"></span>购物车 ({{cartCount}})</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <p v-show="showCategory"><span>全部商品分类</span></p>
                    </div>
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item, index) in xiaomiList" :key="index">
                                    <a :href="'/#/product/' + item.id" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>Redmi 红米</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item, index) in redmiList" :key="index">
                                    <a :href="'/#/product/' + item.id" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item, index) in tvList" :key="index">
                                    <a href="javascript:;" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="item.mainImage" alt="product">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="header-search">
                    <div class="wrapper">
                        <input type="text" placeholder="小米10">
                        <a href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'nav-header',
    data(){
        return{
            xiaomiList: [],
            redmiList: [],
            tvList:[
                {
                    name: '小米壁画电视 65英寸',
                    price: 6999,
                    mainImage: '/imgs/nav-img/nav-3-1.jpg'
                },{
                    name: '小米全面屏电视 E55A',
                    price: 1999,
                    mainImage: '/imgs/nav-img/nav-3-2.jpg'
                },{
                    name: "Redmi 智能电视 MAX 98''",
                    price: 19999,
                    mainImage: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/0112cb7e2ea8489fbd36ce3a781d5232.jpg?thumb=1&w=160&h=110&f=webp&q=90'
                },{
                    name: '小米电视4A 55英寸',
                    price: 1799,
                    mainImage: '/imgs/nav-img/nav-3-4.jpg'
                },{
                    name: '米电视4A 65英寸',
                    price: 2699,
                    mainImage: '/imgs/nav-img/nav-3-5.jpg'
                },{
                    name: '米电视4A 32英寸',
                    price: 699,
                    mainImage: '/imgs/nav-img/nav-3-3.png'
                }
            ],
            showCategory: false,
        }
    },
    computed:{
        username(){
            return this.$store.state.username;
        },
        cartCount(){
            return this.$store.state.cartCount;
        }
    },
    filters:{
        currency(val){
            if(!val)
                return '0';
            return val.toFixed(0) + '元起';
        }
    },
    mounted(){
        this.getProductList();
        let params = this.$route.params;
        if (params && params.from === 'login'){
          this.getCartCount();
        }
    }, 
    methods: {
        login(){
            this.$router.push('/login');
        },
        logout(){
            this.axios.post('/user/logout').then(()=>{
                this.$message.success({
                    message: '退出成功',
                    showClose: true
                })
                this.$cookie.set('userId', '', {expires: '-1'});
                this.$store.dispatch('saveUserName', '');
                this.$store.dispatch('saveCartCount', '0');
            })
        },
        getCartCount(){
            this.axios.get('/carts/products/sum').then((res=0)=>{
            this.$store.dispatch('saveCartCount', res);
            })
        },
        getProductList(){
            this.axios.get('/products', {
                params:{
                    categoryId:'100012',
                    pageSize:20
                }
            }).then((res)=>{
                if(res.list.length >= 6) {
                    this.xiaomiList = res.list.slice(0, 6); 
                    this.redmiList = res.list.slice(6, 12);
                }
            })
        }
    }
}
</script>

<style lang='scss'>
    @import './../assets/scss/bass.scss';
    @import './../assets/scss/mixin.scss';
    @import './../assets/scss/config.scss';
    .header{
        .nav-topbar{
            height: 40px;
            line-height: 40px;
            background-color: $colorB;
            color: #b0b0b0;
            .container{
                height: 100%;
                @include flex();
            }
            .link{
                display: inline-block;
                height: 100%;
                color: #b0b0b0;
                padding: 0 10px;
                &:first-child{
                    padding-left: 0;
                }
                &:hover{
                    color: $colorG;
                }
            }
            .topbar-user{
                @include flex();
                .user-name{
                    width: 108px;
                    position: relative;
                    text-align: center;
                    margin-right: 10px;
                    span{
                        cursor:pointer;
                        line-height: 40px;
                        i{
                            display: inline-block;
                            @include bgImg(10px, 10px, 'icon-down.png');
                            margin-left: 10px;
                            vertical-align: -1px;
                        }
                    }
                    &:hover{
                        color: $colorA;
                        background-color: $colorG;
                        .user-menu{
                            height: 164px;
                            opacity: 1;
                        }
                    }
                    .user-menu{
                        position: absolute;
                        top: 40px;
                        left: 0;
                        height: 0;
                        opacity: 0;
                        box-shadow: 0 2px 10px rgba(0,0,0,.15);
                        z-index: 10;
                        transition: height .2s, opacity .7s;
                        background-color: $colorG;
                        ul{
                            padding: 7px 0;
                            li{
                                transition: all .2s;
                                line-height: 30px;
                                a{
                                    display: inline-block;
                                    width: 108px;
                                    height: 30px;
                                    text-align: center;
                                    color: $colorL;
                                    transition: all .2s;
                                    &:hover{
                                        color: $colorA;
                                    }
                                }
                                &:hover{
                                    background-color: $colorJ;
                                }
                            }
                        }
                    }
                }
            }
            .my-cart{
                width: 120px;
                background-color: #424242;
                text-align: center;
                margin-left: 10px;
                padding: 0;
                color: #b0b0b0;
                &:hover{
                    color: $colorG;
                }
                .icon-cart{
                    display: inline-block;
                    margin-right: 5px;
                    vertical-align: -1.5px;
                    @include bgImg(16px, 12px, 'icon-cart-checked.png');
                }
            }
        }
        .nav-header{
            .container{
                height: 100px;
                position: relative;
                @include flex();
                .header-logo{
                    display: inline-block;
                    width: 55px;
                    height: 55px;
                    background-color: $colorA;
                    overflow: hidden;
                    a{
                        display: inline-block;
                        width: 110px;
                        height: 55px;
                        &:before{
                            content:'';
                            display: inline-block;
                            @include bgImg(55px, 55px, 'mi-logo.png');
                            background-size: 48px;
                            transition: margin .2s;                     
                        }
                        &:after{
                            content:' ';
                            display: inline-block;
                            @include bgImg(55px, 55px, 'mi-home.png');                       
                        }
                        &:hover:before{
                            margin-left: -55px;
                            transition: margin .2s;
                        }
                    }
                }
                .header-menu{
                    display: inline-block;
                    width: 739px;
                    .item-menu{
                        display: inline-block;
                        color: $colorB;
                        font-weight: blod;
                        font-size: 16px;
                        margin-right: 20px;
                        &:first-child{
                            width: 96px;
                            margin-right: 25px;
                        }
                        span{
                            cursor: pointer;
                            line-height: 100px;
                        }
                        &:hover{
                            color:$colorA;
                            .children{
                                height: 220px;
                                opacity: 1;
                            }
                        }
                        .children{
                            position: absolute;
                            top: 100px;
                            left: 0;
                            width: 1226px;      
                            height: 0;
                            opacity: 0;
                            overflow: hidden;
                            border-top: 1px solid $colorH;
                            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                            z-index: 10;
                            transition: all .5s;
                            background-color: $colorG;
                            ul{
                                display: flex;
                                .product{
                                    box-sizing: border-box;
                                    padding: 35px 12px 0;
                                    flex: 0 0 16.66%;
                                    text-align: center;
                                    position: relative;
                                    a{
                                        display: inline-block;
                                        .pro-img{
                                            margin: 0 auto 16px;
                                            img{
                                                height: 110px;
                                            }
                                        }
                                        .pro-name{
                                            font-size: 12px;
                                            line-height: 20px;
                                            color: $colorB;
                                        }
                                        .pro-price{
                                            font-size: 12px;
                                            line-height: 20px;
                                            color: $colorA;
                                        }
                                    }
                                    &::before{
                                        content: ' ';
                                        position: absolute;
                                        top: 32px;
                                        right: 0;
                                        border-left: 1px solid $colorF;
                                        height: 100px;
                                        width: 1px;
                                    }
                                    &:last-child:before{
                                        display: none;
                                    }
                                }
                            }
                        }
                    }
                }
                .header-search{
                    width: 296px;
                    .wrapper{
                        height: 48px;
                        border: 1px solid #E0E0E0;
                        display: flex;
                        align-items: center;
                        input{
                            border: none;
                            border-right: 1px solid #E0E0E0;
                            height: 48px;
                            width: 250px;
                            padding: 0 10px;
                            font-size: 14px;
                        }
                        a{
                            display: inline-block;
                            @include bgImg(54px, 46px, 'icon-search.png', 16px);
                        }
                    }
                }
            }
        }
    }
</style>