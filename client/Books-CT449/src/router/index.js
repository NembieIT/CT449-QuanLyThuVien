import { createRouter, createWebHistory } from 'vue-router'

// Import các trang
import Home from '../views/user/Home.vue'
import About from '../views/user/About.vue'
import Pending from '../views/admin/pending.vue'

// Khai báo routes
const routes = [
    { path:'/admin/pending', name:"PendingAdmin", component: Pending},
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },

]

// Tạo router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router