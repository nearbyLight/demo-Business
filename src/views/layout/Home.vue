<template>
  <div class="home">
    <!-- 菜单列表 -->
    <MenuList />
    <!-- 主要区域 -->
    <div :class="{ 'main-app': true, 'menu-unflod': $store.state.collapsed }">
      <MainList />
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
    };
  },
};
</script>
<style lang="less">
@import url("~@/assets/CSS/home.less");
@import url("~@/assets/CSS/reset.less");
</style>
