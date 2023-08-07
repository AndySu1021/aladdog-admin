import './assets/main.css'
import 'default-passive-events'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { router } from './router'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhTw
})
app.mount('#app')
