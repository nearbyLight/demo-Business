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
        <a-breadcrumb-item>{{$route.matched[0].meta.title}}</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">{{$route.matched[1].meta.title}}</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- 用户信息 -->
    <ul class="user-info">
      <li>{{ $store.state.user.username }}<a-icon type="down" /></li>
      <li @click="loginOut">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    loginOut() {
      this.$store.dispatch('removeUser');
      this.$router.push({
        name: 'Login',
      });
    },
  },
  mounted() {
    console.log(this.$route);
  },
  watch: {
    $router() {
      console.log(this.$route);
    },
  },
};
</script>

<style>
</style>
