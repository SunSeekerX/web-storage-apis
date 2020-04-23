<template>
  <div id="app">
    <h1>web-storage-apis test</h1>

    <div>
      <span class="primary">isReadable?：</span>
      <span
        class="value"
        :class="{
          success: storage && storage._config && storage._config.isReadable,
        }"
      >
        {{ storage && storage._config ? storage._config.isReadable : '-' }}
      </span>
    </div>

    <div>
      <span class="primary">debug?：</span>
      <span
        class="value"
        :class="{
          success: storage && storage._config && storage._config.debug,
        }"
      >
        {{ storage && storage._config ? storage._config.debug : '-' }}
      </span>
    </div>

    <div>
      <span class="primary">local storage?：</span>
      <span class="value" :class="{ success: local }">
        {{ local }}
      </span>
    </div>

    <div>
      <span class="primary">isUsingCookie?：</span>
      <span
        class="value"
        :class="{
          success: storage && storage._config && storage._config.isUsingCookie,
        }"
      >
        {{ storage && storage._config ? storage._config.isUsingCookie : '-' }}
      </span>
    </div>

    <div>
      <span class="primary">Support Storage?：</span>
      <span
        class="value"
        :class="{
          success:
            storage && storage._config && storage._config.isSupportStorage,
        }"
      >
        {{
          storage && storage._config ? storage._config.isSupportStorage : '-'
        }}
      </span>
    </div>

    <div>
      <span class="primary">Support Cookie?：</span>
      <span
        class="value"
        :class="{
          success:
            storage && storage._config && storage._config.isSupportCookie,
        }"
      >
        {{ storage && storage._config ? storage._config.isSupportCookie : '-' }}
      </span>
    </div>

    <hr />

    <button
      class="bg-success"
      @click="
        ;(storageSetting.isReadable = !storageSetting.isReadable),
          onChangeStorageConfig()
      "
    >
      切换可读配置
    </button>

    <button
      class="bg-success"
      @click="
        ;(storageSetting.debug = !storageSetting.debug), onChangeStorageConfig()
      "
    >
      切换debug
    </button>

    <button
      class="bg-success"
      @click=";(local = !local), onChangeStorageConfig()"
    >
      切换local
    </button>

    <button @click="onStorageData('DATA', 'Hello World!')">
      Store String（Hello World!）
    </button>

    <button @click="onStorageData('DATA', true)">
      Store Boolean（true）
    </button>

    <button @click="onStorageData('DATA', 1234567890)">
      Store Number（1234567890）
    </button>

    <button @click="onStorageData('DATA', ['one', 'two', 'three'])">
      Store Array（['one', 'two', 'three']）
    </button>

    <button
      @click="onStorageData('DATA', { age: 11, name: '李白', emoji: '❤' })"
    >
      Store Object（{age: 11, name: '李白', emoji: '❤'}）
    </button>

    <button class="bg-success" @click="onGetStorageData('DATA')">
      获取数据
    </button>

    <button class="bg-warn" @click="onRemoveData('DATA')">移除数据</button>

    <button class="bg-warn" @click="onClearData()">清空数据</button>
  </div>
</template>

<script>
import storage from './utils/bundle.esm'

export default {
  name: 'App',
  data() {
    return {
      // 工具对象
      storage: null,
      // 是否存入localStorage
      local: false,
      storageSetting: {
        // 在localstorage无法使用的情况下是否使用cookie作为回退
        isUsingCookie: true,
        // 是否开启调试模式
        debug: false,
        // 写入的数据是否可读
        isReadable: true,
      },
    }
  },
  mounted() {
    // 初始化存储设置
    this.onChangeStorageConfig()
    console.log(storage);
    this.storage = storage
  },
  methods: {
    // 改变storage设置
    onChangeStorageConfig() {
      storage.setConfig(this.storageSetting)
    },
    // 存入数据
    onStorageData(key, data) {
      storage.setStorageSync(key, data, this.local)
    },
    // 获取数据
    onGetStorageData(key) {
      console.log(storage.getStorageSync(key, this.local))
    },
    // 移除数据
    onRemoveData(key) {
      storage.removeStorageSync(key, this.local)
    },
    // 清空数据
    onClearData() {
      storage.clearStorageSync(this.local)
    },
  },
}
</script>

<style>
html,
body {
  background-color: #f5f5f5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  max-width: 750px;
}
button {
  width: 100%;
  margin-bottom: 10px;
  color: #fff;
  background-color: #409eff;
  padding: 10px 0;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}
button:after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.3s, opacity 0.5s;
}

button:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

.bg-primary {
  background-color: #409eff;
}
.bg-success {
  background-color: #67c23a;
}
.bg-warn {
  background-color: #e6a23c;
}

.primary {
  font-weight: 700;
  font-size: 16px;
  color: #409eff;
}
.success {
  color: #67c23a;
}
.warn {
  color: #e6a23c;
}
.value {
  font-weight: 700;
  font-size: 16px;
}
</style>
