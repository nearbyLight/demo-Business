<template>
    <div class="main-header">
        <a-button
          type="primary"
          style="margin-bottom: 16px"
          @click="toggleCollapsed"
        >
          <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
        <!-- 面包屑导航 -->
        <div class="breakcmurb">
          <a-breadcrumb>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <!-- 用户信息 -->
        <ul class="user-info">
          <li>欢迎xiaoqiang<a-icon type="down" /></li>
          <li>退出</li>
        </ul>
      </div>
</template>

<script>
export default {
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
  },
};
</script>

<style>
</style>
