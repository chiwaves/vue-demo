<template>
  <div class="order-list">
    <div class="wrap">
      <div class="container">
        <div class="breadcrumbs">
          <a href="/#/index">首页</a>
          <span class="gang"> / </span>
          <span>交易订单</span>
        </div>
        <div class="list-wrapper">
          <div class="user-address-menu">
            <dl class="menu-box" v-for="(item, index) in menuList" :key="index">
              <dt class="menu-subtitle">{{item.title}}</dt>
              <dd class="menu-item" v-for="(subitem, jadam) in item.sublist" :key="jadam"><a href="javascript:;">{{subitem}}</a></dd>
            </dl>
          </div>
          <div class="my-list">
            <h1>我的订单<span>请谨防钓鱼链接或诈骗电话，了解更多></span></h1>
            <div class="list-filter">
              <ul class="list-type">
                <li class="type-section" @click="whichList = 0; getOrderList()">
                  <a href="javascript:;" :class="{'active': whichList === 0}">全部有效订单</a>
                </li>
                <li class="type-section" @click="whichList = 1; getOrderList()">
                  <a href="javascript:;" :class="{'active': whichList === 1}">待支付</a>
                </li>
                <li class="type-section" @click="whichList = 2; getOrderList()">
                  <a href="javascript:;" :class="{'active': whichList === 2}">待收货</a>
                </li>
                <li class="type-section" @click="whichList = 3; getOrderList()">
                  <a href="javascript:;" :class="{'active': whichList === 3}">订单回收站</a>
                </li>
              </ul>
              <div class="list-search">
                <input type="text" placeholder="输入商品名称、订单号" class="search-text">
                <input type="button" class="search-btn">
              </div>
            </div>
            <loading v-if="loading"></loading>
            <ul class="order-list">
              <li class="order-item" v-for="(item, index) in showList" :key="index">
                <div class="order-summary">
                  <p class="order-status">{{orderStatus(item.status)}}</p>
                  <div class="detail-list">
                    <p class="detail">
                      {{item.createTime}}
                      <span>|</span>
                      {{item.receiverName}}
                      <span>|</span>
                      订单号：<a :href="`/#/order/pay/?orderNo=${item.orderNo}`" target="_blank">{{item.orderNo}}</a>
                      <span>|</span>
                      {{item.paymentTypeDesc}}
                    </p>
                    <p class="price">应付金额： <span>{{item.payment}}</span>元</p>
                  </div>
                </div>
                <div class="order-more">
                  <ul class="itemVoList">
                    <li class="order-product" v-for="(subitem, jadam) in item.orderItemVoList" :key="jadam">
                      <a class="pro-img" :href="`/#/detail/${subitem.productId}`" target="_blank"><img v-lazy="subitem.productImage" alt="pro-img"></a>
                      <div class="pro-info">
                        <p class="pro-name"><a :href="`/#/detail/${subitem.productId}`" target="_blank">{{subitem.productName}}</a></p>
                        <p class="pro-price">{{subitem.currentUnitPrice + '元 × ' + subitem.quantity}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="order-action">
                    <ul class="btn-box">
                      <li class="btn btn-small" v-if="item.status === 10" @click="openPay(item.orderNo)">立即付款</li>
                      <li class="btn btn-small btn-grey">订单详情</li>
                      <li class="btn btn-small btn-grey">联系客服</li>
                    </ul>
                  </div>
                </div>
              </li>
              <el-pagination
                class="pagination"
                v-show="showList.length"
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="handleChange">
              </el-pagination>
              <div class="no-data" v-if="!loading && showList.length === 0">
                <p>当前没有交易订单。</p>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <footer-service></footer-service>
  </div>
</template>

<script>
import FooterService from './../components/FooterService'
import Loading from './../components/Loading'
import { Pagination } from 'element-ui'
export default {
  name:'order-list',
  components:{
    FooterService,
    Loading,
    [Pagination.name]: Pagination,   //动态加载对象
  },
  data(){
    return{
      orderList: [],  //全部的订单列表
      cancelList: [], //所有已取消的订单
      unpaidList: [], //所有等待付款的订单
      unreceivedList: [], //所有待收货的订单
      showList: [],   //现在页面上展示出来的订单
      whichList: 0,   //选择展示哪类订单
      menuList: [
        {
          title: '订单中心',
          sublist: ['我的订单', '评价晒单', '话费充值订单', '以旧换新订单']
        },
        {
          title: '个人中心',
          sublist: ['我的个人中心', '消息通知', '购买资格', '现金账户', '小米礼品卡', '现金券', '喜欢的商品', '优惠券', '收货地址', '红包']
        },
        {
          title: '售后服务',
          sublist: ['服务记录', '申请服务', '领取快递报销']
        },
        {
          title: '账户管理',
          sublist: ['个人信息', '修改密码']
        }
      ],              //左侧用户菜单栏的静态列表
      loading: true,  //控制载入中图标的加载与否
      pageNum: 1,     //当前页号
      total: 0,       //总的订单条目数
    }
  },
  mounted(){
    this.getOrderList();
  },
  methods: {
    getOrderList(){
      this.axios.get('/orders', {
        params:{
          pageNum: this.pageNum
        }
      }).then(res => {
        this.loading = false;
        this.orderList = res.list;
        this.total = res.total;
        this.chooseList(this.whichList);
      }).catch(()=>{
        this.loading = false;
      })
    },
    chooseList(num){
      this.cancelList = this.orderList.filter(item => item.status === 0)
      this.unpaidList = this.orderList.filter(item => item.status === 10)
      this.unreceivedList = this.orderList.filter(item => item.status === 20)
      switch(num){
        case 0:
          this.showList = this.orderList;
          break;
        case 1:
          this.showList = this.unpaidList;
          break;
        case 2:
          this.showList = this.unreceivedList;
          break;
        case 3:
          this.showList = this.cancelList;
          break;
      }
    },
    //订单状态翻译
    orderStatus(scode){
      switch(scode){
        case 0:
          return '已取消';
        case 10:
          return '等待付款';
        case 20:
          return '已付款';
        case 40:
          return '已发货';
        case 50:
          return '交易成功';
        case 60:
          return '交易关闭';
      }
    },
    openPay(orderNo){
      window.open(`/#/order/pay?orderNo=${orderNo}`);
    },
    handleChange(pageNum){
      this.pageNum = pageNum;
      this.getOrderList();
    }
  }
}
</script>

<style lang="scss">
@import './../assets/scss/config';
@import './../assets/scss/mixin';
@import './../assets/scss/button';
.order-list{
  .wrap{
    background-color: $colorJ;
    padding-bottom: 40px;
    .container{
      .breadcrumbs{
        height: 40px;
        line-height: 40px;
        color: $colorC;
        font-size: 12px;
        a{
          color: $colorC;
          &:hover{
            color: $colorA;
          }
        }
        .gang{
          font-family: sans-serif;
          color: $colorD;
          margin: 0 .5em;
        }
      }
      .list-wrapper{
        display: flex;
        justify-content: space-between;
        .user-address-menu{
          background-color: $colorG;
          width: 234px;
          padding: 36px 0;
          .menu-box{
            margin: 0 48px 12px;
            .menu-subtitle{
              font-size: 16px;
              font-weight: 400;
              line-height: 52px;
              color: $colorB;
            }
            .menu-item{
              padding: 6px 0;
              margin-left: 0;
              a{
                font-size: 14px;
                line-height: 1.5;
                color: $colorC;
                &:hover{
                  color: $colorB;
                }
              }
            }
          }
        }
        .my-list{
          background-color: $colorG;
          padding: 36px 48px;
          width: 882px;
          h1{
            font-size: 30px;
            font-weight: 400;
            color: $colorC;
            line-height: 68px;
            span{
              font-size: 12px;
              line-height: 1.5;
              margin-left: 10px;
            }
          }
          .list-filter{
            @include flex();
            .list-type{
              display: flex;
              padding: 18px 0;
              .type-section{
                padding: 0 20px;
                border-left: solid 1px $colorH;
                a{
                  font-size: 16px;
                  line-height: 1.25;
                  color: $colorC;
                  &.active{
                    color: $colorA;
                  }
                }
                &:first-child{
                  padding-left: 0;
                  border: 0;
                }
              }
            }
            .list-search{
              height: 40px;
              line-height: 40px;
              border: solid 1px $colorH;
              display: flex;
              .search-text{
                width: 189px;
                padding: 0 15px;
                font-size: 12px;
                color: $colorC;
                border: 0;
                border-right: solid 1px $colorH;
              }
              .search-btn{
                width: 40px;
                border: 0;
                @include bgImg(40px, 40px, 'icon-search.png', 16px);
                cursor: pointer;
              }
            }
          }
          .order-list{
            padding: 10px 0;
            .order-item{
              margin-bottom: 20px;
              border: solid 1px $colorA;
              .order-summary{
                padding: 25px 30px 24px;
                background-color: #fffaf7;
                border-bottom: solid 1px #feccac;
                .order-status{
                  font-size: 18px;
                  line-height: 1.5;
                  color: $colorA;
                }
                .detail-list{
                  display: flex;
                  justify-content: space-between;
                  align-items: baseline;
                  font-size: 14px;
                  line-height: 1.5;
                  color: $colorC;
                  padding-top: 1px;
                  .detail{
                    span{
                      font-family: sans-serif;
                      color: $colorH;
                      margin: 0 .25em;
                    }
                    a{
                      color: $colorC;
                      &:hover{
                        color: $colorA;
                      }
                    }
                  }
                  .price{
                    span{
                      color: $colorB;
                      font-size: 28px;
                      font-weight: 200;
                      line-height: 1;
                      margin-right: 5px;
                    }
                  }
                }
              }
              .order-more{
                padding: 0 30px;
                display: flex;
                justify-content: space-between;
                .itemVoList{
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  margin: 10px 0;
                  .order-product{
                    margin: 10px 0;
                    display: flex;
                    align-items: center;
                    .pro-img{
                      display: block;
                      width: 80px;
                      height: 80px;
                      img{
                        width: 100%;
                        height: 100%;
                      }
                    }
                    .pro-info{
                      margin-left: 20px;
                      .pro-name{
                        a{
                          font-size: 14px;
                          line-height: 22px;
                          color: $colorB;
                          &:hover{
                            color: $colorA;
                          }
                        }
                      }
                      .pro-price{
                        font-size: 14px;
                        line-height: 22px;
                        color: $colorB;
                      }
                    }
                  }
                }
                .order-action{
                  margin-top: 20px;
                  .btn-box{
                    .btn{
                      display: block;
                      margin-bottom: 10px;
                    }
                    .btn-grey{
                      color: $colorC;
                      background-color: $colorG;
                      &:hover{
                        color: $colorG;
                        background-color: $colorD;
                      }
                    }
                  }
                }
              }
            }
            .pagination{
              text-align: center;
            }
            .no-data{
              p{
                margin: 40px 0;
                text-align: center;
                font-size: 18px;
                color: $colorD;
              }
            }
          }
        }
      }
    }
  }
}
</style>