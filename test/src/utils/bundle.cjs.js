/**
 * @name web-storage-apis
 * @description Make localstorage and sessionStorage easy to use.
 * @author SunSeekerX
 * @time 2019年6月27日16点21分
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-22 23:03:43
 */

/**
 * @name 校验浏览器是否支持写入localStorage
 * @returns { Boolean }
 */
function checklocalStorage() {
  try {
    return (
      window.Storage &&
      window.localStorage &&
      window.localStorage instanceof Storage
    )
  } catch (error) {
    console.error(error);
    return false
  }
}

/**
 * @name 校验浏览器是否支持写入Cookie
 * @returns { Boolean }
 */
function checkCookie() {
  return window.navigator.cookieEnabled
}

class StorageUtil {
  constructor() {
    this._config = {
      // 在localstorage无法使用的情况下是否使用cookie作为回退
      isUsingCookie: true,
      // 是否开启调试模式
      debug: false,
      // 运行环境是否支持写入localStorage
      isSupportStorage: checklocalStorage(),
      // 运行环境是否支持写入Cookie
      isSupportCookie: checkCookie(),
      // 版本
      version: '0.0.2',
    };

    this._workSetting = {};
  }

  /**
   * @name 初始化设置方法
   * @param { Object } options
   */
  setConfig(options = {}) {
    // 公开可重写的设置key
    const _publicSettings = ['isUsingCookie', 'debug'];
    // 合并传入的设置对象，如果传入了非公开设置的key会被丢弃
    const _workSetting = {};
    for (const item of Object.keys(options)) {
      if (_publicSettings.includes(item)) {
        Object.assign(this._config, {
          [item]: options[item],
        });
        _workSetting[item] = options[item];
      }
    }
    // 给出生效设置对象
    Object.assign(this._workSetting, _workSetting);
  }

  /**
   * @name 将 data数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
   * @param {String} key 本地缓存中的指定的 key
   * @param {Any} data 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
   * @param {Boolean} local 是否存储在localStorage true/false, 默认：false
   * @returns {Object} 结果对象
   * @description 使用时可能会抛出错误，建议请使用trycatch处理
   */
  setStorageSync(key, data, local) {
    // 判断是否支持localStorage
    if (this._config.isSupportStorage) ; else if (this._config.isUsingCookie) {
      // 不支持localStorage但使用Cookie
      if (this._config.isSupportCookie) ; else {
        // 不支持写入Cookie
        throw new Error('No available storage method found.')
      }
    }
    
    const keyType = typeof key;
    if (keyType === 'string') {
      // Storage data
      const dataType = typeof data;
      const value = JSON.stringify({
        dataType,
        data: data,
      });
      try {
        local
          ? localStorage.setItem(key, value)
          : sessionStorage.setItem(key, value);
      } catch (error) {
        return {
          errMsg: `setStorage:fail ${error}`,
        }
      }
      return {
        errMsg: 'setStorage:ok',
      }
    } else {
      throw new Error(
        `The key data type should be string instead of ${keyType}`
      )
    }
  }
}

var index = new StorageUtil();
// export default {
//   setStorageSync,
//   getStorageSync,
//   removeStorageSync,
//   clearStorageSync,
//   getStorageInfoSync,
// }

export default index;
