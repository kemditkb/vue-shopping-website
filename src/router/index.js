import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/page/Login'
import Errorpage from '@/components/page/error'
import Dashboard from '@/components/dashboard/dashboard'
import Order from '@/components/dashboard/Order'
import Products from '@/components/dashboard/products'
import CustomerOrder from '@/components/customer/customer_order'
import CustomerCheckOrder from '@/components/customer/customer_checkOrder'
import Coupons from '@/components/dashboard/Coupons'
import SortTest from '@/components/page/sortTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 使用者輸入不存在的路由名稱，轉向到 path:'error'頁面上
      path:'*',
      redirect:'error'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/error',
      name: 'Error',
      component: Errorpage
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      // 製作巢狀路由
      children:[
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'order',
          name: 'Order',
          component: Order,
          meta: { requiresAuth: true }
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true }
        },
        
      ]
    },
    {
      // 使用同一個component 元件，但是路徑不同
      path: '/',
      // 要注意name 可以改名稱，不然會有同名的狀況，會有錯誤警告
      name: 'Dashboard_custom_order',
      component: Dashboard,
      // 製作巢狀路由
      children: [
        {
          path: 'custom_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'custom_checkorder/:orderId',
          name: 'CustomerCheckOrder',
          component: CustomerCheckOrder,
        },
        {
          path: 'sortTest',
          name: 'SortTest',
          component: SortTest,
        },
      ]
    }
  ]
})


