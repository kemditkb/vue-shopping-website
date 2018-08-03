// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import  axios  from  'axios'
import  VueAxios  from  'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.min.css'
import 'bootstrap'
import './bus'
import currencyFilters from './filters/currency'
import dateFilters from './filters/date'
import VeeValidate from 'vee-validate';
// 引入中文語系檔
import zhTWValidate from "vee-validate/dist/locale/zh_TW";
import './fbSDK/application';

// 引入圖表
import VCharts from 'v-charts'
import histogram from 'v-charts/lib/histogram.common'

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//通過全域方法 Vue.use() 使用插件
Vue.use(VueAxios, axios)
Vue.use(VeeValidate);
Vue.use(VCharts)
// 使用中文語系檔
VeeValidate.Validator.localize('zh_TW', zhTWValidate)

//通過全域元件使用元件 Vue.component（）
Vue.component('Loading', Loading);

Vue.component('histogram', histogram)


//註冊在 Vue 實體的之前的全域過濾器
// 在模板上會先回傳參數到過濾器中，過濾器會將資料過濾後再回傳到模板上做輸出
Vue.filter('currencyFilters', currencyFilters);
Vue.filter('dateFilters', dateFilters);

/* 
to: 要轉跳到的目標路徑
from: 目前的路徑
next: 轉跳到目標路徑的執行函式
當有轉向到新路徑的動作時，就會啟動beforeEach這個函式
*/
router.beforeEach((to, from, next) => {
  // 目標路由上，如果有設定meta requiresAuth 路由訊息的話執行if函式，目的在判斷目標路由是否有要被授權才能進入
  if (to.meta.requiresAuth) {
    // 連結API 判斷是否有登入狀態
    const api = `${process.env.APIPATH}/api/user/check`;
    // 這段ajax連線直接使用"axios"，因為這段router.beforeEach()是註冊在vue實體之外，所以不用this指向到vue實體
    axios.post(api).then((response) => {
      console.log('需要驗證' + response.data.success);
      // 如果是登入狀態就放行進入到下一個頁面
      if (response.data.success) {
        console.log(response.data);
        next();
      } else {
        // 如果不是登入狀態就轉向到 path:'/login'
        next({
          path: '/login'
        });
        console.log(response.data.message);
      }
    })
  } else {
    next();
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})


