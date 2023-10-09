import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Loading, Notify } from 'quasar'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import quasarIconSet from 'quasar/icon-set/material-icons'
import router from './routers'
import 'quasar/src/css/index.sass' // Import Quasar css
import '@quasar/extras/material-icons/material-icons.css' // Import icon libraries
import 'virtual:uno.css' // Import Unocss
import './assets/css/style.css' // Import style

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

myApp.use(Quasar, {
  plugins: { Loading, Notify }, // import Quasar plugins and add here
  iconSet: quasarIconSet,
})
myApp.use(router)
myApp.use(pinia)

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
