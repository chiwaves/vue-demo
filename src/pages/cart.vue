<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tips><span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span></template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="list-head">
            <li class="allCheck"><span class="check-box" :class="{'checked': isSelectedAll}" @click="toggleAll"></span>全选</li>
            <li class="name">商品名称</li>
            <li class="unit-price">单价</li>
            <li class="quantity">数量</li>
            <li class="subtotal">小计</li>
            <li class="operating">操作</li>
          </ul>
          <ul class="list-item" v-for="(item, index) in productList" :key="index">
            <li class="check-item"><span class="check-box" :class="{'checked': item.productSelected}" @click="updateCart(item, 'select')"></span></li>
            <li class="pro-info">
              <a :href="`/#/product/${item.productId}`" target="_blank">
                <span class="pro-img"><img v-lazy="item.productMainImage" alt="pro-img"></span>
                <span class="pro-name">{{item.productName}}</span>
              </a>
            </li>
            <li class="unit-price">{{item.productPrice}}元</li>
            <li class="item-quant">
              <div class="counter">
                <button @click="updateCart(item, '-')">-</button>
                <input type="text" v-model="quantityList[index]" @change="updateCart(item, 'num', index)">
                <button @click="updateCart(item, '+')">+</button>
              </div>
            </li>
            <li class="subtotal">{{item.productTotalPrice}}元</li>
            <li class="operating"><span class="delete" @click="deleteItem(item.productId)">×</span></li>
          </ul>
        </div>
        <div class="cart-bar">
          <div class="selection-left">
            <a href="">继续购物</a>
            <span class="line">|</span>
            <p class="all">共<span>{{cartTotalQuantity}}</span>件商品，已选择<span>{{checkedNum}}</span>件</p>
          </div>
          <div class="pay-right">
            <p class="total">合计：<span>{{cartTotalPrice}}</span>元</p>
            <button class="btn btn-large" :class="{'disabled': disabled}" @click="order">去结算</button>
          </div>
        </div>
      </div>
    </div>
    <footer-service></footer-service>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import FooterService from './../components/FooterService'
import NavFooter from './../components/NavFooter'
export default {
  name:'cart',
  components:{
    OrderHeader,
    FooterService,
    NavFooter
  },
  data(){
    return {
      productList:[],
      isSelectedAll: false,
      cartTotalPrice: 0,
      cartTotalQuantity: 0,
      quantityList:[] //用一个列表来维护购物车里每件商品的数量，用于和input框中v-model和updateCart交互数据
    }
  },
  computed:{
    disabled(){
      /* 写法2：
      let flag = true;
      for(let index in this.productList){
        if(this.productList[index].productSelected === true){
          flag = false;
        }
      }
      */
      let flag = this.productList.every(item => !item.productSelected);
      return flag;
    },
    checkedNum(){
      let count = 0;
      for (let item of this.productList){
        if (item.productSelected === true){
          count += item.quantity;
        }
      }
      return count;
    }
  },
  mounted(){
    this.getCartList();
  },
  methods:{
    renderData(res){
      this.productList = res.cartProductVoList || [];
      this.isSelectedAll = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      this.cartTotalQuantity = res.cartTotalQuantity;
      for(let index in this.productList){
        this.quantityList[index] = this.productList[index].quantity;
      }
    },
    getCartList(){
      this.axios.get('/carts').then((res)=>{
        this.renderData(res);
      })
    },
    toggleAll(){
      let url = this.isSelectedAll ? '/carts/unSelectAll' : '/carts/selectAll';
      this.axios.put(url).then((res)=>{
        this.renderData(res);
      })
    },
    deleteItem(id){
      this.axios.delete(`/carts/${id}`, {
        productId: id
      }).then((res)=>{
        this.renderData(res);
      })
      this.$message({
        showClose: true,
        message: '成功删除商品！',
        type: 'success'
      })
    },
    updateCart(item, type, index){
      let quantity = item.quantity;
      let selected = item.productSelected;
      if(type === '+'){
        if(quantity >= item.productStock){
          this.$message.warning({
            message: '修改数量不能超过库存',
            showClose: true
          });
          return;
        }
        quantity++;
      }else if(type === '-'){
        if(quantity <= 1){
          this.$message.warning({
            message: '修改数量不能小于0',
            showClose: true
          });
          return;
        }
        quantity--;
      }else if(type === 'select'){
        selected = !selected;
      }else if(type === 'num'){
        quantity = this.quantityList[index];
        if(quantity > item.productStock){
          this.$message.warning({
            message: '修改数量不能超过库存',
            showClose: true
          });
          return;
        }
        if(quantity < 1){
          this.$message.warning({
            message: '修改数量不能小于0',
            showClose: true
          });
          return;
        }
      }
      this.axios.put(`/carts/${item.productId}`, {
        quantity,
        selected
      }).then((res)=>{
        this.renderData(res);
      })
    },
    order(){
      if(this.disabled === true){
        this.$message.warning({
            message: '请勾选需要结算的商品',
            showClose: true
          });
      }else{
        this.$router.push('/order/confirm');
      }
    }
  }
}
</script>

<style lang="scss">
@import './../assets/scss/config';
@import './../assets/scss/mixin';
.cart{
  .wrapper{
    background-color: $colorJ;
    padding: 38px 0;
    .cart-box{
      background-color: $colorG;
      .check-box{
        display: inline-block;
        width: 18px;
        height: 18px;
        margin: 0 15px 0 24px;
        border: 1px solid $colorF;
        cursor: pointer;
        &.checked{
          @include bgImg(18px, 18px, 'icon-gou.png');
          border-color: $colorA;
          background-color: $colorA;
        }
      }
      .list-head{
        height: 70px;
        line-height: 70px;
        display: flex;
        font-size: 14px;
        color: $colorL;
        .allCheck{
          width: 110px;
          margin-right: 120px;
          display: flex;
          align-items: center;
        }
        .name{
          width: 436px;
        }
        .unit-price{
          width: 163px;
        }
        .quantity{
          width: 181px;
        }
        .subtotal{
          width: 135px;
        }
        .operating{
          width: 40px;
        }
      }
      .list-item{
        height: 115px;
        border-top: 1px solid $colorF;
        display: flex;
        align-items: center;
        font-size: 16px;
        .check-item{
          width: 110px;
          display: flex;
          align-items: center;
        }
        .pro-info{
          height: 100%;
          a{
            display: flex;
            align-items: center;
            height: 100%;
            .pro-img{
              display: inline-block;
              width: 80px;
              height: 80px;
              margin-right: 40px;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .pro-name{
              display: inline-block;
              width: 380px;
              font-size: 18px;
            }
          }
        }
        .unit-price{
          width: 140px;
          margin-right: 18px;
          text-align: center;
        }
        .item-quant{
          .counter{
            display: flex;
            width: 148px;
            line-height: 38px;
            border: 1px solid $colorF;
            button{
              width: 38px;
              height: 38px;
              border: none;
              background-color: $colorG;
              font-size: 20px;
              color: $colorC;
              cursor: pointer;
              transition: all .3s;
              &:hover{
                background-color: $colorH;
              }
            }
            input{
              border: none;
              width: 72px;
              height: 38px;
              font-size: 16px;
              text-align: center;
            }
          }
        }
        .subtotal{
          color: $colorA;
          flex-grow: 1;
          text-align: right;
          margin-right: 82px;
        }
        .operating{
          width: 80px;
          text-align: center;
          margin-right: 26px;
          .delete{
            font-size: 20px;
            color: $colorC;
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            border-radius: 50%;
            text-align: center;
            cursor: pointer;
            transition: all .3s;
            &:hover{
              color: $colorG;
              background-color: #e53935;
            }
          }
        }
      }
    }
    .cart-bar{
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      background-color: $colorG;
      .selection-left{
        display: flex;
        color: $colorC;
        a{
          margin-left: 32px;
          font-size: 14px;
          color: $colorC;
        }
        .line{
          color: #eeeeee;
          font-size: 14px;
          margin: 0 16px;
        }
        .all{
          font-size: 14px;
          span{
            color: $colorA;
            margin: 0 4px;
          }
        }
      }
      .pay-right{
        display: flex;
        .total{
          color: $colorA;
          font-size: 14px;
          line-height: 1.5;
          span{
            font-size: 30px;
          }
        }
        button{
          margin-left: 50px;
          &.disabled{
            color: $colorD;
            background-color: #e0e0e0;
            border-color: #e0e0e0;
            cursor: auto;
          }
        }
      }
    }
  }
}
</style>