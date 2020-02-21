<!--
 * @name: 
 * @author: SunSeekerX
 * @time: 2020-02-21 22:30:22
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-02-21 23:25:08
 -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div>
      <button @click="storageData('data', 999)">存入数字数据</button>
    </div>
    <div>
      <button @click="storageData('data', false)">存入布尔数据</button>
    </div>
    <div>
      <button @click="storageData('data', '我是字符串')">存入字符串数据</button>
    </div>
    <div>
      <button @click="storageData('data', [1, 2, 3, '123'])">
        存入数组数据
      </button>
    </div>
    <div>
      <button @click="storageData('data', { name: 'libai', age: 18 })">
        存入对象数据
      </button>
    </div>
    <div>
      <button @click="getData('data')">获取数据</button>
    </div>
    <div>
      <button @click="removeData('data')">移除单个数据</button>
    </div>
    <div>
      <button @click="clearData()">移除全部数据</button>
    </div>
    <div>
      <button @click="getStorageInfoSync()">同步获取当前 storage 的相关信息。</button>
    </div>
  </div>
</template>

<script>
import storage from '@/utils/storage.js'

export default {
  name: 'App',
  methods: {
    storageData(name, data) {
      console.log(`存取数据名：${name}，数据为：`, data)
      storage.setStorageSync(name, data, true)
    },
    getData(name) {
      try {
        console.log(
          `获取数据名为：${name},数据为：`,
          storage.getStorageSync(name, true)
        )
      } catch (error) {
        console.log(error.message)
      }
    },
    removeData(name) {
      console.log(`移除数据名为：${name}`)
      storage.removeStorageSync(name, true)
    },
    clearData() {
      console.log(`清除所有数据`)
      storage.clearStorageSync(true)
    },
    getStorageInfoSync(){
      console.log(storage.getStorageInfoSync());
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1200px;
  margin: 0 auto;
}
#app div {
  width: 90%;
  margin: 0 auto;
}
#app div button {
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 16px;
  border: #eee solid 1px;
  background-color: coral;
}
</style>
