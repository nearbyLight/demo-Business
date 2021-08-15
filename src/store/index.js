import Vue from 'vue';
import Vuex from 'vuex';
import { setCookies, getCookies, removeCookies } from '@/utils/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    user: getCookies(),
    // 把路由定义到数据仓库中，页面中随时随地都可以拿到
    menuRoutes: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUser(state, userInfo) {
      state.user = userInfo;
    },
    removeUser(state) {
      state.user = {
        username: '',
        role: '',
        appkey: '',
        email: '',
      };
    },
    // 改变角色的路由权限
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUser', userInfo);
      setCookies(userInfo);
    },
    removeUser({ commit }) {
      commit('removeUser');
      removeCookies();
    },
    // 改变角色的路由权限
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
  modules: {
  },
});
