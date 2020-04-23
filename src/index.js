/**
 * @name web-storage-apis
 * @description Make localstorage and sessionStorage easy to use.
 * @author SunSeekerX
 * @time 2019年6月27日16点21分
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-23 20:06:28
 */

import { error } from './core/log'

import {
  localSetItem,
  localGetItem,
  localRemoveitem,
  localClear,
  sessionSetItem,
  sessionGetItem,
  sessionRemoveitem,
  sessionClear,
  cookieSetItem,
  cookieGetItem,
  cookieRemoveitem,
} from './core/storage'

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
    errMsg: 'getStorageInfoSync:ok',
  }
}

/**
 * @name 校验浏览器是否支持写入localStorage
 * @returns { Boolean }
 */
function _checklocalStorage() {
  try {
    return (
      window.Storage &&
      window.localStorage &&
      window.localStorage instanceof Storage
    )
  } catch (error) {
    // console.error(error)
    return false
  }
}

/**
 * @name 校验浏览器是否支持写入Cookie
 * @returns { Boolean }
 */
function _checkCookie() {
  return window.navigator.cookieEnabled
}
/**
 * @name 无可能存储方法报错
 */
function _noStorageMethodError() {
  error('No available storage method found.')
  // throw new Error('No available storage method found.')
}

class StorageUtil {
  constructor() {
    // 设置对象
    this._config = {
      // 是否开启调试模式
      debug: false,
      // 写入的数据是否可读
      isReadable: true,
      // 在localstorage无法使用的情况下是否使用cookie作为回退
      isUsingCookie: true,
      // 运行环境是否支持写入localStorage
      isSupportStorage: _checklocalStorage(),
      // isSupportStorage: false,
      // 运行环境是否支持写入Cookie
      isSupportCookie: _checkCookie(),
      // isSupportCookie: false,

      // 版本
      version: '1.1.0',
    }

    // 传入生效的配置对象
    this._workSetting = {}
  }

  /**
   * @name 初始化设置方法
   * @param { Object } options
   */
  setConfig(options = {}) {
    // 公开可重写的设置key
    const _publicSettings = ['isUsingCookie', 'debug', 'isReadable']
    // 合并传入的设置对象，如果传入了非公开设置的key会被丢弃
    const _workSetting = {}
    for (const item of Object.keys(options)) {
      if (_publicSettings.includes(item)) {
        _workSetting[item] = options[item]
      }
    }
    // 合并设置对象
    Object.assign(this._config, _workSetting)
    // 给出生效设置对象
    Object.assign(this._workSetting, _workSetting)
  }

  /**
   * @name 将 data数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
   * @param {String} key 本地缓存中的指定的 key
   * @param {Any} data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
   * @param {Boolean} local 是否存储在localStorage true/false, 默认：false
   * @returns {Object} 结果对象
   * @description 使用时可能会抛出错误，建议请使用trycatch处理
   */
  setStorageSync(key, data, local = false) {
    // 判断是否支持localStorage
    if (this._config.isSupportStorage) {
      // 支持localStorage 写入localStorage
      if (local) {
        localSetItem(key, data, {
          // 是否开启调试模式
          debug: this._config.debug,
          // 写入的数据是否可读
          isReadable: this._config.isReadable,
        })
      } else {
        sessionSetItem(key, data, {
          // 是否开启调试模式
          debug: this._config.debug,
          // 写入的数据是否可读
          isReadable: this._config.isReadable,
        })
      }
    } else if (this._config.isUsingCookie) {
      // 不支持localStorage但使用Cookie
      if (this._config.isSupportCookie) {
        // 不支持localStorage但使用Cookie，且支持写入Cookie 写入到Cookie
        cookieSetItem(key, data, {
          // 是否开启调试模式
          debug: this._config.debug,
          // 写入的数据是否可读
          isReadable: this._config.isReadable,
        })
      } else {
        // 不支持写入Cookie
        _noStorageMethodError()
      }
    } else {
      // 不支持localStorage不使用Cookie
      _noStorageMethodError()
    }
  }

  /**
   * @name 从本地缓存中同步获取指定key对应的内容。
   * @param {String} key 本地缓存中的指定的key
   * @param {Boolean} local 是否存储在localStorage true/false 默认：false
   * @returns {Any} 返回通过key值查询到的data信息，未找到返回null
   * @description 使用时可能会抛出错误，建议请使用trycatch处理
   */
  getStorageSync(key, local = false) {
    // 判断是否支持localStorage
    if (this._config.isSupportStorage) {
      // 支持localStorage 从localStorage读取
      if (local) {
        return localGetItem(key, {
          // 是否开启调试模式
          debug: this._config.debug,
          // 写入的数据是否可读
          isReadable: this._config.isReadable,
        })
      } else {
        return sessionGetItem(key, {
          // 是否开启调试模式
          debug: this._config.debug,
          // 写入的数据是否可读
          isReadable: this._config.isReadable,
        })
      }
    } else if (this._config.isUsingCookie) {
      // 不支持localStorage但使用Cookie
      if (this._config.isSupportCookie) {
        // 不支持localStorage但使用Cookie，且支持写入Cookie
        return cookieGetItem(key, {
          // 是否开启调试模式
          debug: this._config.debug,
          // 写入的数据是否可读
          isReadable: this._config.isReadable,
        })
      } else {
        // 不支持写入Cookie
        _noStorageMethodError()
      }
    } else {
      // 不支持localStorage不使用Cookie
      _noStorageMethodError()
    }
  }

  /**
   * @name 从本地缓存中同步移除指定key
   * @param {String} key 本地缓存中的指定的key
   * @param {Boolean} local 是否存储在localStorage true/false 默认：false
   * @returns {Object} 结果对象
   * @description 使用时可能会抛出错误，建议请使用trycatch处理
   */
  removeStorageSync(key, local) {
    // 判断是否支持localStorage
    if (this._config.isSupportStorage) {
      // 支持localStorage 从localStorage读取
      if (local) {
        return localRemoveitem(key, {
          // 是否开启调试模式
          debug: this._config.debug,
          // 写入的数据是否可读
          isReadable: this._config.isReadable,
        })
      } else {
        return sessionRemoveitem(key, {
          // 是否开启调试模式
          debug: this._config.debug,
          // 写入的数据是否可读
          isReadable: this._config.isReadable,
        })
      }
    } else if (this._config.isUsingCookie) {
      // 不支持localStorage但使用Cookie
      if (this._config.isSupportCookie) {
        // 不支持localStorage但使用Cookie，且支持写入Cookie
        return cookieRemoveitem(key, {
          // 是否开启调试模式
          debug: this._config.debug,
          // 写入的数据是否可读
          isReadable: this._config.isReadable,
        })
      } else {
        // 不支持写入Cookie
        _noStorageMethodError()
      }
    } else {
      // 不支持localStorage不使用Cookie
      _noStorageMethodError()
    }
  }

  /**
   * @name 同步清理本地数据缓存
   * @param {Boolean} local 是否存储在localStorage true/false 默认：false
   * @returns {Object} 结果对象
   * @description 使用时可能会抛出错误，建议请使用trycatch处理
   */
  clearStorageSync(local) {
    // 判断是否支持localStorage
    if (this._config.isSupportStorage) {
      // 支持localStorage 从localStorage读取
      if (local) {
        return localClear({
          // 是否开启调试模式
          debug: this._config.debug,
          // 写入的数据是否可读
          isReadable: this._config.isReadable,
        })
      } else {
        return sessionClear({
          // 是否开启调试模式
          debug: this._config.debug,
          // 写入的数据是否可读
          isReadable: this._config.isReadable,
        })
      }
    } else if (this._config.isUsingCookie) {
      // 不支持localStorage但使用Cookie
      if (this._config.isSupportCookie) {
        // 不支持localStorage但使用Cookie，且支持写入Cookie cookie无法全部清除
        return error('Cookie can not clear')
      } else {
        // 不支持写入Cookie
        _noStorageMethodError()
      }
    } else {
      // 不支持localStorage不使用Cookie
      _noStorageMethodError()
    }
  }
}

export default new StorageUtil()
