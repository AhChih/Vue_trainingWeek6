import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/index",
        name: "首頁",
        component: () => import("../views/Index.vue"),
      },
      {
        path: "/products",
        name: "產品列表",
        component: () => import("../views/Products.vue"),
      },
      {
        path: "/cart",
        name: "購物車",
        component: () => import("../views/Cart.vue"),
      },
      {
        path: "/login",
        name: "登入畫面",
        component: () => import("../views/Login.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "後台管理",
    component: () => import("../views/dashboard/Admin.vue"),
    children: [
      {
        path: "productList",
        name: "後台產品列表",
        component: () => import("../views/dashboard/ProductList.vue"),
      },
      {
        path: "orders",
        name: "訂單管理",
        component: () => import("../views/dashboard/Orders.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
