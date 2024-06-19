import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import firebaseApp from '@/plugins/firebase'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(createPinia())
app.use(firebaseApp)

app.mount('#app')
