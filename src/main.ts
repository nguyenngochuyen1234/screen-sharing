import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import constants from './plugins/constants'
import router from './routes'

import { createPinia } from 'pinia'
const app = createApp(App)

app.use(createPinia())
app.use(constants)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
