import { createRouter, createWebHistory } from 'vue-router'

// Import các trang
import Home from '../views/user/Home.vue'
import About from '../views/user/About.vue'
import Borrow from '../views/admin/borrow.vue'
import DSNV from '../views/admin/dsnhanvien.vue'
import Add from '../views/admin/add.vue'

// Khai báo routes
const routes = [
    { path: '/admin/pending', name: "PendingAdmin", component: Borrow },
    { path: '/admin/homepage', name: "HomepageAdmin", component: Borrow },
    { path: '/admin/nhanvien', name: "DSNhanvien", component: DSNV },
    { path: '/admin/add', name: "Add", component: Add },
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
]

// Tạo router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router