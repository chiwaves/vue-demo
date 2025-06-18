<template>
  <div class="order-confirm">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z" class="path1"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z" class="path1"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z" class="path1"></path>
          <path d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path2"></path>
          <path d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path3"></path>
          <path d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path4"></path>
        </symbol>
      </defs>
    </svg>
    <div class="confirm-wraper container">
      <div class="address">
        <h2>收货地址</h2>
        <ul class="address-list">
          <li class="address-item" v-for="(item, index) in AddressList" :key = index @click="checkedItem = {...item}" :class="{'active': checkedItem.id === item.id}">
            <div class="address-info">
              <p class="name">{{item.receiverName}}</p>
              <div class="address-con">
                <p class="phone">{{item.receiverMobile}}</p>
                <p><span>{{item.receiverProvince}}</span><span>{{item.receiverCity}}</span><span>{{item.receiverDistrict}}</span></p>
                <p><span>中关村街道</span></p>
                <p><span>{{item.receiverAddress}}</span></p>
              </div>
              <div class="edit-action">
                <a href="javascript:;" @click="showEditModal = true; type = 2; checkedItem = {...item}">
                  <svg class="icon icon-edit">
                    <use xlink:href="#icon-edit"></use>
                  </svg>
                </a>
                <a href="javascript:;" @click="showDelModal = true; type = 0; checkedItem = {...item}">
                  <svg class="icon icon-del">
                    <use xlink:href="#icon-del"></use>
                  </svg>
                </a>
              </div>
            </div>
          </li>
          <li class="address-item address-add" @click="showEditModal = true; type = 1; checkedItem = {}">
            <div class="add-content">
              <p class="add-icon"></p>
              <p>添加新地址</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="product">
        <h2>商品及优惠券</h2>
        <ul>
          <li class="product-item" v-for="(item, index) in goodList" :key="index">
            <div class="img-title">
              <a :href="`/#/product/${item.productId}`">
                <div class="pro-img">
                  <img v-lazy="item.productMainImage" alt="product">
                </div>
                <h3>{{item.productName}}</h3>
              </a>
            </div>
            <p class="good-price">{{item.productPrice}}元 x <span class="good-quantity">{{item.quantity}}</span></p>
            <p class="good-status"></p>
            <p class="good-total">{{item.productTotalPrice}}元</p>
          </li>
        </ul>
      </div>
      <div class="shipment-invoice">
        <p><span class="title">配送方式</span><span class="sub">包邮</span></p>
        <p>
          <span class="title">发票</span>
          <span class="sub">电子普通发票</span><span class="sub">个人</span><span class="sub">商品明细</span><a href="javascript:;">修改 ></a>
        </p>
      </div>
      <div class="count">
        <div class="coupon"></div>
        <div class="count-detail">
          <ul class="key">
            <li><span>商品件数：</span></li>
            <li><span>商品总价：</span></li>
            <li><span>活动优惠：</span></li>
            <li><span>优惠券抵扣：</span></li>
            <li><span>运费：</span></li>
            <li><span>应付总额：</span></li>
          </ul>
          <ul class="value">
            <li><span>{{totalQuantity}}件</span></li>
            <li><span>{{totalPrice}}元</span></li>
            <li><span>-0元</span></li>
            <li><span>-0元</span></li>
            <li><span>0元</span></li>
            <li><span><strong>{{totalPrice}}</strong>元</span></li>
          </ul>
        </div>
      </div>
      <div class="count-footer">
        <div class="address-confirm">
          <p class="confirm-line">
            <span>{{checkedItem.receiverName}}</span>
            <span>{{checkedItem.receiverMobile}}</span>
          </p>
          <p class="confirm-line">
            <span>{{checkedItem.receiverProvince}}</span>
            <span>{{checkedItem.receiverCity}}</span>
            <span>{{checkedItem.receiverDistrict}}</span>
            <span>{{checkedItem.receiverAddress}}</span>
            <a href="javascript:;" v-if="checkedItem.id" @click="showEditModal = true; type = 2">修改</a>
          </p>
        </div>
        <div class="button">
          <button class="btn go-back" @click="gotoCart">返回购物车</button>
          <button class="btn" @click="orderSubmit">立即下单</button>
        </div>
      </div>
    </div>
    <modal
    btnType="3"
    modalType="middle" 
    :showModal="showDelModal"
    @submit="modifyAddress(checkedItem)"
    @cancel="closeModal(type, false)">
      <template v-slot:body>
        <p>确定删除该地址吗？</p>
      </template>
    </modal>

    <modal
    title="编辑收货地址"
    btnType="3"
    modalType="middle" 
    :showModal="showEditModal"
    @submit="modifyAddress(checkedItem)"
    @cancel="closeModal(type, false)">
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item name-phone">
            <input type="text" placeholder="姓名" v-model="checkedItem.receiverName">
            <input type="text" placeholder="手机号" v-model="checkedItem.receiverMobile">
          </div>
          <div class="item">
            <select name="province" v-model="checkedItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="上海">上海</option>
            </select>
            <select name="city" v-model="checkedItem.receiverCity">
              <option v-if="!checkedItem.receiverProvince">请选择</option>
              <option value="北京市" v-if="checkedItem.receiverProvince === '北京'">北京市</option>
              <option value="上海市" v-if="checkedItem.receiverProvince === '上海'">上海市</option>
            </select>
            <select v-if="checkedItem.receiverCity === '北京市'" name="district" v-model="checkedItem.receiverDistrict">
              <option v-for="(item, index) in districtListB" :key="index" :value="item">{{item}}</option>
            </select>            
            <select v-if="checkedItem.receiverCity === '上海市'" name="district" v-model="checkedItem.receiverDistrict">
              <option v-for="(item, index) in districtListS" :key="index" :value="item">{{item}}</option>
            </select>
          </div>
          <div class="item">
            <textarea type="text" placeholder="详细地址" v-model="checkedItem.receiverAddress"></textarea>
          </div>
          <div class="item">
            <input type="text" placeholder="地址标签" v-model="checkedItem.receiverZip">
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './../components/Modal'
export default {
  name:'order-confirm',
  components:{
    Modal
  },
  data(){
    return{
      AddressList: [],  //收货地址列表
      goodList: [],     //准备结算的商品列表
      totalPrice: 0,    //进行结算的商品总价格
      totalQuantity: 0, //进行结算的商品总数量
      showDelModal: false,
      showEditModal: false,
      checkedItem: {},  //选中的地址对象
      type: {}, //type==0表示删除操作，type==1表示添加操作，type==2表示修改操作
      districtListB: ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区'],
      districtListS: ['黄埔区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '浦东新区', '松江区', '闵行区', '宝山区'],
    }
  },
  mounted(){
    this.getAddressList();
    this.getgoodList();
  },
  methods:{
    getAddressList(){
      this.axios.get('/shippings').then((res)=>{
        this.AddressList = res.list;
      })
    },
    modifyAddress(item){
      let methods, url = {};
      /* 对象的解构赋值 */
      let { receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip} = this.checkedItem;
      let errorMsg = '';
      if(!receiverName){
        errorMsg = '请输入收货人姓名！';
      /* 正则表达式 */
      }else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){
        errorMsg = '请输入正确的手机号！';
      }else if(!receiverProvince){
        errorMsg = '请选择省份！';
      }else if(!receiverCity){
        errorMsg = '请选择城市！';
      }else if(!receiverAddress){
        errorMsg = '请输入区县！';
      }else if(!receiverDistrict){
        errorMsg = '请输入收货地址！';
      }
      if(errorMsg){
        this.$message.error(errorMsg);
        return;
      }
      let params = {
        receiverName,
        receiverMobile,
        receiverProvince,
        receiverCity,
        receiverDistrict,
        receiverAddress,
        receiverZip
      };
      switch(this.type){
        case 0: 
          methods = 'delete';
          url = `/shippings/${item.id}`;
          break;
        case 1:
          methods = 'post';
          url = 'shippings';
          break;
        case 2:
          methods = 'put';
          url = `/shippings/${item.id}`;
      }
      this.axios[methods](url, params).then(()=>{     //动态加载对象
        this.$message.success('操作成功');
        let isSuccess = true;
        this.closeModal(this.type, isSuccess);
        this.getAddressList();
      })
    },
    closeModal(type, isSuccess){
      if((type === 0 && isSuccess) || !isSuccess){
        this.checkedItem = {};
      }
      this.showDelModal = false;
      this.showEditModal = false;
    },
    getgoodList(){
      this.axios.get('/carts').then((res)=>{
        let list = res.cartProductVoList;
        this.goodList = list.filter((item)=>item.productSelected);
        this.totalPrice = res.cartTotalPrice;
        this.goodList.map((item)=>{
          this.totalQuantity += item.quantity;
        })
      })
    },
    gotoCart(){
      this.$router.push('/cart');
    },
    orderSubmit(){
      if(!this.checkedItem.id){
        this.$message.error('请选择收获地址！');
      }else{
        let shippingId = this.checkedItem.id;
        this.axios.post('/orders', {
          shippingId,
        }).then((res)=>{
          this.$router.push({
            path: '/order/pay',
            query: {
              orderNo: res.orderNo
            }
          });
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import './../assets/scss/config';
@import './../assets/scss/mixin';
.order-confirm{
  background-color: $colorJ;
  padding: 40px 0 60px;
  .confirm-wraper{
    background-color: $colorG;
    .address{
      padding: 48px 0 0 24px;
      h2{
        font-size: 18px;
        font-weight: normal;
        line-height: 20px;
        color: $colorB;
        margin-bottom: 22px;
      }
      .address-list{
        display: flex;
        flex-wrap: wrap;
        .address-item{
          width: 268px;
          height: 178px;
          border: 1px solid $colorH;
          margin-right: 17px;
          margin-bottom: 20px;
          transition: all .2s;
          cursor: pointer;
          .address-info{
            padding: 15px 24px 0;
            .name{
              font-size: 18px;
              line-height: 30px;
              margin-bottom: 10px;
            }
            .address-con{
              font-size: 14px;
              color: $colorC;
              line-height: 22px;
              span{
                margin-right: 3px;
              }
            }
            .edit-action{
              display: flex;
              justify-content: flex-end;
              margin-top: 3px;
              visibility:hidden;
              a{
                .icon{
                  width: 18px;
                  height: 18px;
                  fill: $colorC;
                  vertical-align: middle;
                  &:hover{
                    fill: $colorA;
                  }
                }
                margin-left: 20px;
              }
            }
          }
          &:last-child{
            margin-right: 0;
          }
          &:hover{
            border-color: $colorD;
            .edit-action{
              visibility: visible;
            }
          }
        }
        .active{
          border-color: $colorA;
          &:hover{
            border-color: $colorA;
          }
        }
        .address-add{
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          color: $colorD;
          .add-icon{
            width: 30px;
            height: 30px;
            margin: 0 auto 8px;
            background: url('/imgs/icon-add.png') $colorH no-repeat center;
            background-size: 14px;
            transition: all .4s;
            border-radius: 50%;
          }
          &:hover{
            .add-icon{
              background-color: $colorD;
            }
          }
        }
      }
    }
    .product{
      padding: 0 24px;
      h2{
        font-size: 18px;
        font-weight: normal;
        line-height: 40px;
        color: $colorB;
      }
      ul{
        padding: 13px 0;
        .product-item{
          padding: 10px 0;
          display: flex;
          align-items: center;
          font-size: 14px;
          line-height: 46px;
          .img-title{
            width: 690px;
            display: flex;
            a{
              display: flex;
              align-items: center;
              .pro-img{
                width: 30px;
                height: 30px;
                margin-right: 10px;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              h3{
                font-size: 14px;
                font-weight: 400;
              }
            }
          }
          .good-price{
            width: 150px;
            text-align: center;
          }
          .good-status{
            width: 100px;
            text-align: center;
          }
          .good-total{
            width: 190px;
            text-align: center;
            color: $colorA;
          }
        }
      }
    }
    .shipment-invoice{
      padding: 0 24px;
      p{
        border-top: solid 1px $colorH;
        padding: 25px 0;
        line-height: 38px;
        font-weight: normal;
        .title{
          display: inline-block;
          width: 150px;
          font-size: 18px;
          color: $colorB;
        }
        .sub{
          font-size: 14px;
          color: $colorA;
          margin-right: 14px;
        }
        a{
          font-size: 14px;
          color: $colorA;
        }
      }
    }
    .count{
      padding: 20px 48px;
      display: flex;
      justify-content: space-between;
      .count-detail{
        margin-top: 14px;
        display: flex;
        font-size: 14px;
        line-height: 2;
        text-align: right;
        .key{
          color: $colorC;
          :last-child{
            margin-top: 14px;
          }
        }
        .value{
          color: $colorA;
          :last-child{
            margin-top: 10px;
            strong{
              font-size: 30px;
              font-weight: 400;
              line-height: 1;
            }
          }
        }
      }
    }
    .count-footer{
      padding: 20px 48px;
      border-top: solid 1px $colorH;
      display: flex;
      justify-content: space-between;
      .address-confirm{
        .confirm-line{
          color: $colorL;
          font-size: 14px;
          line-height: 20px;
          span{
            margin-right: 4px;
          }
          a{
            color: $colorA;
          }
        }
      }
      .go-back{
        margin-right: 30px;
        border: solid 1px $colorD;
        background-color: $colorG;
        color: $colorD;
        &:hover{
          color: $colorG;
          background-color: $colorD;
        }
      }
    }
  }
  .edit-wrap{
    font-size:14px;
    .item{
      margin-bottom:15px;
      input{
        display:inline-block;
        width:262px;
        height:40px;
        line-height:40px;
        padding-left:15px;
        border:1px solid $colorH;
      }
      select{
        width: 148px;
        height: 40px;
        line-height:40px;
        border:1px solid $colorH;
        margin-right:15px;
      }
      textarea{
        height:62px;
        width:100%;
        padding:13px 15px;
        box-sizing:border-box;
        border:1px solid $colorH;
      }
    }
    .name-phone{
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>