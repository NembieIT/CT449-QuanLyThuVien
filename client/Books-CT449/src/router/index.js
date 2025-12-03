import { createRouter, createWebHistory } from "vue-router";

// Import các trang
import UserPage from "../views/user/UserPage.vue";
import InformPage from "../views/user/InformPage.vue";
import Borrow from "../views/admin/borrow.vue";
import FormUser from "../views/admin/formUser.vue";
import FormBorrow from "../views/admin/formBorrow.vue";
import FormNV from "../views/admin/formNV.vue";
import FormNXB from "../views/admin/formNXB.vue";
import FormBook from "../views/admin/formBook.vue";
import FormAuthor from "../views/admin/formAuthor.vue";

import Auth from "../views/Auth.vue"

// Khai báo routes
const routes = [
  //Route Admin
  { path: "/admin/pending", name: "PendingAdmin", component: Borrow },
  { path: "/admin/all", name: "HomepageAdmin", component: Borrow },
  { path: "/admin/user", name: "DSUser", component: Borrow },
  { path: "/admin/books", name: "DSBooks", component: Borrow },
  { path: "/admin/nxb", name: "DSNXB", component: Borrow },
  { path: "/admin/nhanvien", name: "DSNV", component: Borrow },
  { path: "/admin/author", name: "AuthorAdmin", component: Borrow },
  { path: "/admin/addauthor", name: "AddAuthor", component: FormAuthor },
  { path: "/admin/addauthor/:id", name: "EditAuthor", component: FormAuthor },
  { path: "/admin/addborrow", name: "AddBorrow", component: FormBorrow },
  { path: "/admin/addborrow/:id", name: "AddPend", component: FormBorrow },
  { path: "/admin/adduser", name: "AddUser", component: FormUser },
  { path: "/admin/adduser/:id", name: "EditUser", component: FormUser },
  { path: "/admin/addnv", name: "AddNV", component: FormNV },
  { path: "/admin/addnv/:id", name: "EditNV", component: FormNV },
  { path: "/admin/addnxb", name: "AddNXB", component: FormNXB },
  { path: "/admin/addnxb/:id", name: "EditNXB", component: FormNXB },
  { path: "/admin/addbook", name: "AddBook", component: FormBook },
  { path: "/admin/addbook/:id", name: "EditBook", component: FormBook },

  //Route Client
  { path: "/trangchu", name: "UserHomePage", component: UserPage },
  { path: "/category", name: "UserCategoryPage", component: UserPage },
  { path: "/borrow", name: "UserBorrowPage", component: UserPage },
  { path: "/favorite", name: "UserFavPage", component: UserPage },
  { path: "/inform", name: "InformPage", component: InformPage },

  //Route Auth
  { path: "/auth", name: "Auth", component: Auth },
  { path: "/auth/logout", name: "Logout", component: Auth },
];

// Tạo router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
