import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import ProductList from "../views/ProductList.vue"
import Product from '../components/Product.vue'
import Details from '../views/Details.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
   path: '/register',
    name: 'register',
    component: Register
  },
    {
       path: '/productlist',
       name: 'productlist',
       component: ProductList
    },
    {
        path: '/product',
        name: 'product',
        component: Product
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
