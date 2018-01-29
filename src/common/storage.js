/****************
* 封装sessionStorage
* 封装localStorage
****************/

const ss = window.sessionStorage
const ls = window.localStorage

export default {
  /*------------- sessionStorage 操作 start -------------*/
    // 获取
    s_getItem(key) {
      try {
        return JSON.parse(ss.getItem(key))
      } catch (err) {
        return null
      }
    },

    // 设置
    s_setItem(key, val) {
      ss.setItem(key, JSON.stringify(val))
    },

    // 清空所有
    s_clear() {
      ss.clear()
    },

    s_keys() {
      return ss.keys()
    },
    
    // 删除
    s_removeItem(key) {
      ss.removeItem(key)
    },
  /*------------- sessionStorage 操作 start -------------*/

  /*------------- localStorage 操作 start -------------*/
    // 获取
    l_getItem(key) {
      try {
        return JSON.parse(ls.getItem(key))
      } catch (err) {
        return null
      }
    },

    // 设置
    l_setItem(key, val) {
      ls.setItem(key, JSON.stringify(val))
    },

    // 清空所有
    l_clear() {
      ls.clear()
    },

    l_keys() {
      return ls.keys()
    },
    
    // 删除
    l_removeItem(key) {
      ls.removeItem(key)
    }
    /*------------- localStorage 操作 end -------------*/
}