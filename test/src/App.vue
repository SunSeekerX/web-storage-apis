<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2020-04-22 21:52:48
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-04-22 22:54:07
 -->
<template>
  <div id="app">
    <h1>web-storage-apis test</h1>
  </div>
</template>

<script>
import storage from './utils/bundle.cjs'
storage.setConfig({
  isUsingCookie: false,
  debug: true,
})
console.log(storage)
export default {
  name: 'App',
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
}
</style>
