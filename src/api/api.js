import { post, get } from './config'
import storage from '../common/storage'

export default {
  // 获取用户信息
  getUserInfo (params) {
    return post('api/user/user_info', {
      uid: storage.s_getItem('uid'),
      token: storage.s_getItem('token')
    })
  },

  /*
  * 上传图片
  * 单张
  */
  upImg (e) {
    var self = this
    let file = e.target.files[0]
    let param = new FormData() // 创建form对象
    param.append('file', file, file.name) // 通过append向form对象添加数据
    param.append('chunk', '0') // 添加form表单中其他数据
    // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
    return axios.post(
      'api/login/upload',
      param, 
      {headers: {'Content-Type': 'multipart/form-data'}}
    ).then((res) => {
      return Promise.resolve(res.data)
    })
  },
  
  // 获取banner图
  getBannerFun (type) {
    return post(
      'api/index/banner_list',
      {
        type
      }
    )
  },
  /*--------------- home start --------------*/
    // 获取商品分类
    getGoodsClassFun () {
      return get('api/Home/home_class')
    },

    // 获取首页推荐信息
    getRecommendFun () {
      return get('api/Home/dress')
    },
  /*--------------- home end --------------*/


  /*--------------- goods start --------------*/
    // 获取商品列表
    getGoodsListFun (data) {
      return post(
        'api/Mall/searchGoods',
        data
      )
    },

    // 获取商品详情
    getGoodsDetailsFun (goods_id) {
      return post(
        'api/Mall/goods_info',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          goods_id
        }
      )
    },

    // 收藏or取消收藏
    collectionFun (goods_id) {
      return post(
        'api/Mall/goods_collect',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          goods_id
        }
      )
    },

    // 计算规格价格
    calculatedPrice (goods_id,specification_ids){
      return post(
        'api/Mall/get_specification',
        {
          goods_id,
          specification_ids: specification_ids.join(",") // 商品member_id
        }
      )
    },

    // 加入购物车
    addShoppingCarFun (data){
      return post(
        'api/Mall/insertShopCar',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          ...data
        }
      )
    },
  /*--------------- goods end --------------*/

  /*--------------- shop start --------------*/
    // 获取店铺信息
    getShopDetailsFun (merchants_id) {
      return post(
        'api/Mall/merchants_info',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          merchants_id  //商品member_id
        }
      )
    },
  /*--------------- shop end --------------*/

  /*--------------- order start --------------*/
    // 获取下单商品信息
    getGoodsInfo (obj,type){ // type=0(单件), type=1(购物车)
      let confirmApi = null,
          paramObj = {
            uid: storage.s_getItem("uid"),
            token: storage.s_getItem("token"),
          }
      if(type == 0){
        confirmApi = 'api/Order/confirmGoodsInfo'
        paramObj.goods_id = obj.goods_id,
        paramObj.goods_num = obj.num,
        paramObj.specification_id = obj.specification_id
      }else {
        confirmApi = 'api/Order/confirmOrderInfo'
        paramObj.car_ids = obj
      }
      return post(
        confirmApi,
        paramObj
      )
    },
    // 下单
    preOrderFun (json,car_ids){
      return post(
        'api/Order/insertMallOrder',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          json: JSON.stringify(json),
          car_ids: car_ids || ''
        }
      )
    },

    // 支付订单
    payOrderFun (order_no,type){ // type = 1 (下单支付) type = 2 (未支付订单支付)
      let api = ''
      type == 1 ? api = 'api/Pingxx/ping1' : api = 'api/Pingxx/ping2'
      return post(
        api,
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          order_no, //订单号
          type: 'wx_pub',    //微信公众号支付
          openid: storage.l_getItem("openid") // 微信openid
        }
      )
    },

    // 获取订单列表
    getOrderListFun (order_state,p){
      return post(
        'api/Order/queryOrderByState',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          p,
          order_state
        }
      )
    },
    // 获取订单详情
    getOrderDetailsFun (order_merchants_id){
      return post(
        'api/Order/queryOrderView',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          order_merchants_id
        }
      )
    },
    // 取消订单／退款/催单／确认收货／删除订单
    orderOperate (order_merchants_id,type){
      let api = null
      switch (type){
        case 1: // 取消订单
          api = 'api/Order/cancelOrder'
          break;
        case 2: // 退款
          api = 'api/Order/return_order'
          break;
        case 3: // 催单
          api = 'api/Order/hurry_order'
          break;
        case 4: // 确认收货
          api = 'api/Order/receiveOrder'
          break;
        case 5: // 删除订单
          api = 'api/Order/delOrder'
      }
      return post(
        api,
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          order_merchants_id
        }
      )
    },
  /*--------------- order end --------------*/

  /*--------------- shoppingCar satrt --------------*/
    // 获取购物车商品列表
    getCarGoodsListFun () {
      return post(
        'api/Mall/getShopCars',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token")
        }
      )
    },
    // 获取推荐商品列表
    getMaybeEnjoyFun () {
      return post(
        'api/Mall/maybeEnjoy',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          pagesize: 6
        }
      )
    },
    // 清除无效商品
    delInvalidShopCar () {
      return post(
        'api/Mall/delInvalidShopCar',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token")
        }
      )
    },
    // 购物车加减
    carNumToggle (type,car_id) {
      let api = ''
      type == 1 ? (api = 'api/Mall/plusShopCar') : (api = 'api/Mall/minusShopCar')
      return post(
        api,
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          car_id
        }
      )
    },
    // 删除商品
    delCarGoodsFun (car_ids){
      return post(
        'api/Mall/delShopCar',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          car_ids: car_ids.join(",")
        }
      )
    },
  /*--------------- shoppingCar end --------------*/
  /*--------------- me start --------------*/
    // 是否有未读消息
    hasMsgFun (){
      return post(
        'api/User/has_message',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token")
        }
      )
    },
    // 修改个人信息
    editUserInfo (data) {
      return post(
        'api/user/edit_user',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          ...data 
        }
      )
    },
  /*--------------- me end --------------*/

  /*--------------- address start --------------*/
    // 获取默认地址
    getDefaultAddressFun (){
      return post(
        'api/Address/queryDefaultAddress',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token")
        }
      )
    },

    // 新增/编辑地址
    add_edit_addressFun (data){
      let api = ''
      data.address_id ? api = 'api/Address/saveAddress' : api = 'api/Address/insertAddress'
      return post(
        api,
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          ...data
        }
      )
    },

    // 获取我的地址列表
    getMyAddress (){
      return post(
        'api/Address/queryAddressList',
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token")
        }
      )
    },
    // 设置默认／删除地址
    setAddress (address_id,type){
      let api = ''
      type == 1 ? api = 'api/Address/saveDefaultAddress' : api = 'api/Address/delAddress'
      return post(
        api,
        {
          uid: storage.s_getItem("uid"),
          token: storage.s_getItem("token"),
          address_id
        }
      )
    },
  /*--------------- address end --------------*/
}



