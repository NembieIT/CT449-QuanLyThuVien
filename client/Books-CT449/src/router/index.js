import { createRouter, createWebHistory } from "vue-router";

// Import các trang
import Home from "../views/user/Home.vue";
import About from "../views/user/About.vue";
import Borrow from "../views/admin/borrow.vue";
import formBorrow from "../views/admin/formBorrow.vue";
import FormUser from "../views/admin/formUser.vue";
import FormBorrow from "../views/admin/formBorrow.vue";
import FormNV from "../views/admin/formNV.vue";
import FormNXB from "../views/admin/formNXB.vue"

// Khai báo routes
const routes = [
  { path: "/admin/pending", name: "PendingAdmin", component: Borrow },
  { path: "/admin/all", name: "HomepageAdmin", component: Borrow },
  { path: "/admin/user", name: "DSUser", component: Borrow },
  { path: "/admin/books", name: "DSBooks", component: Borrow },
  { path: "/admin/nxb", name: "DSNXB", component: Borrow },
  { path: "/admin/nhanvien", name: "DSNV", component: Borrow },
  { path: "/admin/doanhthu", name: "DoanhthuAdmin", component: Borrow },
  { path: "/admin/addborrow", name: "AddBorrow", component: FormBorrow },
  { path: "/admin/adduser", name: "AddUser", component: FormUser },
  { path: "/admin/adduser/:id", name: "EditUser", component: FormUser },
  { path: "/admin/addnv", name: "AddNV", component: FormNV },
  { path: "/admin/addnv/:id", name: "EditNV", component: FormNV },
  { path: "/admin/addnxb", name: "AddNXB", component: FormNXB },
  { path: "/admin/addnxb/:id", name: "EditNXB", component: FormNXB },
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
];

// Tạo router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
