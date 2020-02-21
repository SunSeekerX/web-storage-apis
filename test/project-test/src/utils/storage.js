/**
 * @name web-storage-apis
 * @description Make localstorage and sessionStorage easy to use.
 * @author SunSeekerX
 * @time 2019年6月27日16点21分
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-21 23:25:21
 */

/**
 * @name checkEnv
 */
let flag
try {
  flag =
    window.Storage &&
    window.localStorage &&
    window.localStorage instanceof Storage
} catch (error) {
  console.error(error.message)
}
if (!flag) {
  throw new Error('The runtime environment does not support local storage')
}
// function checkEnv() {
//   if (!window.localStorage) {
//     throw new Error('The runtime environment does not support local storage')
//   }
// }

/**
 * @name 将 data数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
 * @param {String} key 本地缓存中的指定的 key
 * @param {Any} data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 * @param {Boolean} local 是否存储在localStorage true/false, 默认：false
 * @returns {Object} 结果对象
 * @description 使用时可能会抛出错误，建议请使用trycatch处理
 */
function setStorageSync(key, data, local) {
  const keyType = typeof key
  if (keyType === 'string') {
    // Storage data
    const dataType = typeof data
    const value = JSON.stringify({
      dataType,
      data: data
    })
    try {
      local
        ? localStorage.setItem(key, value)
        : sessionStorage.setItem(key, value)
    } catch (error) {
      return {
        errMsg: `setStorage:fail ${error}`
      }
    }
    return {
      errMsg: 'setStorage:ok'
    }
  } else {
    throw new Error(`The key data type should be string instead of ${keyType}`)
  }
}

/**
 * @name 从本地缓存中同步获取指定key对应的内容。
 * @param {String} key 本地缓存中的指定的key
 * @param {Boolean} local 是否存储在localStorage true/false 默认：false
 * @returns {Any} 返回通过key值查询到的data信息，未找到返回null
 * @description 使用时可能会抛出错误，建议请使用trycatch处理
 */
function getStorageSync(key, local) {
  const keyType = typeof key
  if (keyType === 'string') {
    // Find data
    let data = null
    local
      ? (data = JSON.parse(localStorage.getItem(key)))
      : (data = JSON.parse(sessionStorage.getItem(key)))
    return data && data.dataType ? data.data : null
  } else {
    throw new Error(`The key data type should be string instead of ${keyType}`)
  }
}

/**
 * @name 从本地缓存中同步移除指定key
 * @param {String} key 本地缓存中的指定的key
 * @param {Boolean} local 是否存储在localStorage true/false 默认：false
 * @returns {Object} 结果对象
 * @description 使用时可能会抛出错误，建议请使用trycatch处理
 */
function removeStorageSync(key, local) {
  const keyType = typeof key
  if (keyType === 'string') {
    // Remove data
    local ? localStorage.removeItem(key) : sessionStorage.removeItem(key)
    return {
      errMsg: 'removeStorage:ok'
    }
  } else {
    throw new Error(`The key data type should be string instead of ${keyType}`)
  }
}

/**
 * @name 同步清理本地数据缓存
 * @param {Boolean} local 是否存储在localStorage true/false 默认：false
 * @returns {Object} 结果对象
 * @description 使用时可能会抛出错误，建议请使用trycatch处理
 */
function clearStorageSync(local) {
  // Remove data
  local ? localStorage.clear() : sessionStorage.clear()
  return {
    errMsg: 'clearStorage:ok'
  }
}

/**
 * @name 同步获取当前storage的相关信息。
 * @param {Boolean} local 是否存储在localStorage true/false 默认：false
 */
function getStorageInfoSync(local) {
  const length = local
    ? (localStorage && (localStorage.length || localStorage.getLength())) || 0
    : (sessionStorage &&
        (sessionStorage.length || sessionStorage.getLength())) ||
      0
  const keys = []
  for (let index = 0; index < length; index++) {
    const key = local ? localStorage.key(index) : sessionStorage.key(index)
    keys.push(key)
  }
  return {
    keys,
    errMsg: 'getStorageInfoSync:ok'
  }
}

export default {
  setStorageSync,
  getStorageSync,
  removeStorageSync,
  clearStorageSync,
  getStorageInfoSync
}
