/**
 * @name:storage.js
 * @author: SunSeekerX
 * @Date: 2020-04-23 10:48:27
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-23 22:50:29
 */

import { encrypt, unEncrypt } from './encrypt'
import { info, success, warn, error } from './log'
import docCookies from './cookie'

function _keyTypeError(keyType) {
  throw new Error(`The key data type should be string instead of ${keyType}`)
}

function _getDataError(key) {
  error(`Get '${key}' fail.`)
  // throw new Error(`Get '${key}' fail.`)
}

/**
 * @name 处理存入的数据
 * @param {String} key 存入数据的key
 * @param { Any } data 只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 * @param { Object } options 处理数据选项
 * @returns { Object } { key,value } 处理成功的key和value
 */
function _handleStoreData(key, data, options) {
  // Storage data
  const dataType = typeof data
  let value = ''

  // 是否debug
  if (options.debug) {
    info('Storage', { key, value: data })
  }

  if (!options.isReadable) {
    // 加密
    value = encrypt(
      JSON.stringify({
        dataType,
        data: data,
      })
    )
  } else {
    value = JSON.stringify({
      dataType,
      data: data,
    })
  }

  return {
    dataKey: key,
    dataValue: value,
  }
}

/**
 * @name 处理取出的数据
 * @param { String } data 需要处理的字符串数据
 * @param { Object } options 处理数据选项
 */
function _handleGetData(key, data, options) {
  try {
    if (!options.isReadable) {
      // 需要解密
      data = JSON.parse(unEncrypt(data))
    } else {
      data = JSON.parse(data)
    }

    if (data && data.dataType) {
      // 是否debug
      if (options.debug) {
        success('Get', { key, value: data.data })
      }

      return data.data
    } else {
      return null
    }
    // return data && data.dataType ? data.data : null
  } catch (error) {
    _getDataError(key)
  }
}

/**
 * @name debug存入的数据
 * @param {String} key 存入数据的key
 * @param { Any } data 只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 * @param { Object } options 处理数据选项
 */
function _logData(key, data, options) {
  if (options.debug) {
    info('Storage', { key, data })
  }
}

/**
 * @name localStorage存入
 * @param {String} key 本地缓存中的指定的 key
 * @param {Any} data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 * @param { Object } options 处理数据选项
 */
export function localSetItem(key, data, options) {
  const keyType = typeof key
  if (keyType === 'string') {
    // 获取处理好的数据
    const { dataKey, dataValue } = _handleStoreData(key, data, options)
    // 存入数据
    localStorage.setItem(dataKey, dataValue)
  } else {
    _keyTypeError(keyType)
  }
}

/**
 * @name localStorage取出
 * @param {String} key 本地缓存中的指定的 key
 * @param { Object } options 处理数据选项
 */
export function localGetItem(key, options) {
  const keyType = typeof key
  if (keyType === 'string') {
    // let data = JSON.parse(localStorage.getItem(key))
    let data = localStorage.getItem(key)
    if (data) {
      data = _handleGetData(key, data, options)
    }
    return data
  } else {
    _keyTypeError(keyType)
  }
}

/**
 * @name localStorage移除指定key的数据
 * @param {String} key 本地缓存中的指定的 key
 * @param { Object } options 处理数据选项
 */
export function localRemoveitem(key, options) {
  const keyType = typeof key
  if (keyType === 'string') {
    // 是否debug
    if (options.debug) {
      warn('remove', { key })
    }

    // 移除数据
    return localStorage.removeItem(key)
  } else {
    _keyTypeError(keyType)
  }
}

/**
 * @name 同步清除本地缓存
 * @param { Object } options 处理数据选项
 */
export function localClear(options) {
  // 是否debug
  if (options.debug) {
    warn('Clear', 'localStorage clear')
  }

  localStorage.clear()
}

/**
 * @name sessionStorage存入
 * @param {String} key 本地缓存中的指定的 key
 * @param {Any} data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 * @param { Object } options 处理数据选项
 */
export function sessionSetItem(key, data, options) {
  const keyType = typeof key
  if (keyType === 'string') {
    // 获取处理好的数据
    const { dataKey, dataValue } = _handleStoreData(key, data, options)
    // 存入数据
    sessionStorage.setItem(dataKey, dataValue)
  } else {
    _keyTypeError(keyType)
  }
}

/**
 * @name sessionStorage取出
 * @param {String} key 本地缓存中的指定的 key
 * @param { Object } options 处理数据选项
 */
export function sessionGetItem(key, options) {
  const keyType = typeof key
  if (keyType === 'string') {
    let data = sessionStorage.getItem(key)
    if (data) {
      data = _handleGetData(key, data, options)
    }
    return data
  } else {
    _keyTypeError(keyType)
  }
}

/**
 * @name sessionStorage移除指定key的数据
 * @param {String} key 本地缓存中的指定的 key
 * @param { Object } options 处理数据选项
 */
export function sessionRemoveitem(key, options) {
  const keyType = typeof key
  if (keyType === 'string') {
    // 是否debug
    if (options.debug) {
      warn('remove', { key })
    }

    // 移除数据
    return sessionStorage.removeItem(key)
  } else {
    _keyTypeError(keyType)
  }
}

/**
 * @name 同步清除本地缓存
 * @param { Object } options 处理数据选项
 */
export function sessionClear(options) {
  // 是否debug
  if (options.debug) {
    warn('Clear', 'sessionStorage clear')
  }

  sessionStorage.clear()
}

/**
 * @name Cookie存入指定key的value
 * @param {String} key 本地缓存中的指定的 key
 * @param {Any} data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
 * @param { Object } options 处理数据选项
 * @param { Boolean } local 是否在会话结束后删除 效果同存入sessionStorage
 */
export function cookieSetItem(key, data, options, local) {
  const keyType = typeof key
  if (keyType === 'string') {
    // 获取处理好的数据
    const { dataKey, dataValue } = _handleStoreData(key, data, options)
    // 存入数据
    docCookies.setItem(dataKey, dataValue, local ? Infinity : null)
  } else {
    _keyTypeError(keyType)
  }
}

/**
 * @name Cookie取出
 * @param {String} key 本地缓存中的指定的 key
 * @param { Object } options 处理数据选项
 */
export function cookieGetItem(key, options) {
  const keyType = typeof key
  if (keyType === 'string') {
    let data = docCookies.getItem(key)
    if (data) {
      data = _handleGetData(key, data, options)
    }
    return data
  } else {
    _keyTypeError(keyType)
  }
}

/**
 * @name Cookie移除指定key的数据
 * @param {String} key 本地缓存中的指定的 key
 * @param { Object } options 处理数据选项
 */
export function cookieRemoveitem(key, options) {
  const keyType = typeof key
  if (keyType === 'string') {
    // 是否debug
    if (options.debug) {
      warn('remove', { key })
    }
    // 移除数据
    return docCookies.removeItem(key)
  } else {
    _keyTypeError(keyType)
  }
}
