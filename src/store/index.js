import Vue from 'vue';
import Vuex from 'vuex';
import { setCookies, getCookies, removeCookies } from '@/utils/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    user: getCookies(),
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
  },
  modules: {
  },
});
