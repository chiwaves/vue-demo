import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import './assets/scss/element-variables.scss'
import App from './App.vue'
// import env from './env'
// mock 开关
const mock = false;
if(mock){
  require('./mock/api');
}

// 根据前端的跨域方式做调整
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
//axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use((response)=>{
  let res = response.data;
  let path = location.hash;
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    if(path !== '#/index'){
      window.location.href = '#/login';
      return Promise.reject(res);
    }
  }else{
    Message.warning(res.msg);
    return Promise.reject(res);
  }
}, error => {
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
  loading: require('@/assets/imgs/loading-svg/loading-bubbles.svg')
});
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
