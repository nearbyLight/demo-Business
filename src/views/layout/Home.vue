<template>
  <div class="home">
    <!-- 菜单列表 -->
    <menu-list :key="key" />
    <!-- 主要区域 -->
    <div :class="{ 'main-app': true, 'menu-unflod': $store.state.collapsed }">
      <main-list />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuList from '@/views/components/menu-list.vue';
import MainList from '@/views/components/main-list.vue';

export default {
  components: {
    MenuList,
    MainList,
  },
  data() {
    return {
      collapsed: false,
      key: new Date().getTime(),
    };
  },
  created() {
    console.log(this.$route);
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
};
</script>
<style lang="less">
@import url("~@/assets/CSS/home.less");
@import url("~@/assets/CSS/reset.less");
</style>
