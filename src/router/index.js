/* eslint-disable consistent-return */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import store from '../store';
import getMenuRoute from '../utils/permission';

Vue.use(VueRouter);

// vue3 中， router.addRouter()  方法只能放入“一个对象”/“一个字符，一个对象”，但是依旧会报错，是因为 addRouter() 方法中有错误未进行捕捉，因此报错，
// 加入下面的代码， 可以解决那个错误
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};

const ayncMenuRoute = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    hidden: false,
    icon: 'project',
  },
  component: Home,
  children: [{
    path: 'productList',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      hidden: false,
      icon: 'unordered-list',
    },
    component: () => import('@/views/page/productList.vue'),
  },
  {
    path: 'productAdd',
    name: 'ProductAdd',
    meta: {
      title: '新增商品',
      hidden: false,
      icon: 'diff',
    },
    component: () => import('@/views/page/productAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      hidden: false,
      icon: 'edit',
    },
    component: () => import('@/views/page/category.vue'),
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [{
      path: '/index',
      name: 'Index',
      component: () => import('../views/page/index.vue'),
      meta: {
        title: '统计',
        hidden: false,
        icon: 'fund',
      },
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
    },
  },
];

const router = new VueRouter({
  routes,
});
// 路由是否重复加入（导致栈溢出）
let isAddRoute = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.email) {
      // 如果该路由之前没有加入， 则进行加入， 如果已经加入，则不再加入
      if (!isAddRoute) {
        // 这里得到角色对应的路由权限， 是一个数组（list<Map<string,object>> 形式）
        const menuRoute = getMenuRoute(store.state.user.role, ayncMenuRoute);
        // 因为 router.addRouter()  方法只能放入“一个对象”/“一个字符，一个对象”， 所以这里进行转化成一个对象
        const value = menuRoute[0];
        // 这里执行数据仓库中的函数，改变数据仓库中数据（menuRoutes）的状态
        // 为什么用 .then  因为直接跳转到某些页面的时候， 因为还没有拿到路由而跳转不过去，这里使用then 之后，说明： 先等拿到路由权限，然后进行跳转
        store.dispatch('changeMenuRoutes', routes.concat(menuRoute)).then(() => {
          // router.addRouter()  方法只能放入“一个对象”/“一个字符，一个对象”
          router.addRoute(value);
          next();
        });
        isAddRoute = true;
      }
      return next();
    }
    return next('/login');
  }
  next();
});

export default router;
