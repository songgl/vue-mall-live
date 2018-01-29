import Vue from 'vue'
import Router from 'vue-router'

import notFind from '@/pages/notfind/notfind'
import Author from '@/pages/author/author'

import Home from '@/pages/home/home'
import Live from '@/pages/live/live'
import ShoppingCar from '@/pages/shoppingCar/shoppingCar'
import Me from '@/pages/me/me'

import LiveRoom from '@/pages/liveRoom/liveRoom'

import GoodsList from '@/pages/goods/goodsList/goodsList'
import GoodsDetails from '@/pages/goods/goodsDetails/goodsDetails'
import ShopDetails from '@/pages/shop/shopDetails/shopDetails'

import ConfirmOrder from '@/pages/order/confirmOrder/confirmOrder'
import OrderList from '@/pages/order/orderList/orderList'
import OrderDetails from '@/pages/order/orderDetails/orderDetails'

import UserDetails from '@/pages/userDetails/userDetails'
import MyAddress from '@/pages/myAddress/myAddress'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      meta: {
        title: '404',
      },
      component: notFind
    },{
      path: '/author', // 微信授权登录页
      name: 'author',
      component: Author
    },{
      path: '/',
      redirect: "/home", // 重定向
      name: '/',
      component: Home
    },{
      path: '/home',
      name: 'home',
      component: Home
    },{
      path: '/live', // 直播首页
      name: 'live',
      component: Live
    },{
    	path: '/shoppingCar', // 购物车
    	name: 'shoppingCar',
    	component: ShoppingCar
    },{
    	path: '/me', // 个人中心
    	name: 'me',
    	component: Me
    },{
      path: '/liveRoom', // 直播间
      name: 'liveRoom',
      component: LiveRoom
    },{
      path: '/goodsList', // 商品列表
      name: 'goodsList',
      component: GoodsList
    },{
      path: '/goodsDetails', // 商品详情
      name: 'goodsDetails',
      component: GoodsDetails
    },{
      path: '/shopDetails', // 店铺详情
      name: 'shopDetails',
      component: ShopDetails
    },{
      path: '/confirmOrder', // 确认订单
      name: 'confirmOrder',
      component: ConfirmOrder
    },{
      path: '/orderList', // 订单列表
      name: 'orderList',
      component: OrderList
    },{
      path: '/orderDetails', // 订单详情
      name: 'orderDetails',
      component: OrderDetails
    },{
      path: '/userDetails', // 个人信息
      name: 'userDetails',
      component: UserDetails
    },{
      path: '/myAddress', // 我的地址列表
      name: 'myAddress',
      component: MyAddress
    }
  ]
})
