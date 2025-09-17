import { createRouter, createWebHistory } from 'vue-router'

// Import các trang
import Home from '../views/Home.vue'
import About from '../views/About.vue'

// Khai báo routes
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About }
]

// Tạo router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router