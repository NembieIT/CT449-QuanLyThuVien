import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import VueToastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import * as Icons from '@ant-design/icons-vue'

const app = createApp(App);

Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})
app.use(router);
app.use(Antd);
app.use(VueToastify);
app.mount('#app');
