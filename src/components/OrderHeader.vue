<template>
  <div class="order-header">
    <div class="container">
      <div class="logo-title">
        <div class="header-logo">
          <a href="/#/index"><i class="img-1"></i><i class="img-2"></i></a>
        </div>
        <div class="title">
          <h2>{{title}}</h2>
          <slot name="tips"></slot>
        </div>
      </div>
      <div class="user-info">
        <a class="user-name" href="javascript:;">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>评价晒单</el-dropdown-item>
              <el-dropdown-item @click.native="gotoCart">我的车车</el-dropdown-item>
              <el-dropdown-item>小米账户</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </a>
        <span>|</span>
        <a class="order-list" href="javascript:;" @click="gotoOrderList">我的订单</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'order-header',
  props:{
    title: String
  },
  computed:{
    username(){
      return this.$store.state.username;
    }
  },
  methods:{
    logout(){
      this.axios.post('/user/logout').then(()=>{
        this.$message.success({
          message: '退出成功',
          showClose: true
        })
        this.$cookie.set('userId', '', {expires: '-1'});
        this.$store.dispatch('saveUserName', '');
        this.$store.dispatch('saveCartCount', '0');
        this.$router.push('/#/index');
      })
    },
    gotoCart(){
      this.$router.push('/cart');
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
.order-header{
  height: 100px;
  border-bottom: 2px solid $colorA;
  .container{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo-title{
      display: flex;
      align-items: center;
      .header-logo{
        width: 48px;
        height: 48px;
        background-color: $colorA;
        margin-right: 45px;
        a{
          display: inline-block;
          width: 200%;
          height: 100%;
          .img-1{
            display: inline-block;
            @include bgImg(48px, 48px, 'mi-logo.png');
            transition: margin .2s;
          }
          .img-2{
            display: inline-block;
            @include bgImg(48px, 48px, 'mi-home.png');
          }
        }
        overflow: hidden;
        &:hover{
          a{
            .img-1{
              margin-left: -48px;
              transition: margin .2s;
            }
          }
        }
      }
      .title{
        display: flex;
        align-items: baseline;
        h2{
          font-size: 28px;
          font-weight: 400;
          line-height: 48px;
        }
        span{
          color: $colorD;
          font-size: 14px;
          font-weight: 200;
          margin-left: 15px;
        }
      }
    }
    .user-info{
      .el-dropdown{
        width: 100px;
        .el-dropdown-link {
          display: inline-block;
          width: 100%;
          height: 100%;
          cursor: pointer;
          color: $colorC;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
      a{
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: $colorC;
        &:hover{
          color: $colorA;
          .el-dropdown-link{
            color: $colorA;
          }
        }
      }
      span{
        color: $colorD;
        font-size: 14px;
      }
      .order-list{
        width: 80px;
      }
    }
  }
}
</style>