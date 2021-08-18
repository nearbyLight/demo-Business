<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[
        $route.matched[0].name ? $route.matched[0].name : '',
      ]"
      :default-open-keys="[$route.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="route in $store.state.menuRoutes">
        <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
          <span slot="title"
            ><a-icon :type="route.meta.icon" /><span>{{
              route.meta.title
            }}</span></span
          >
          <a-menu-item v-for="child in route.children" :key="child.name">
            <router-link :to="{ name: child.name }"
              ><a-icon :type="child.meta.icon" /><span></span
              >{{ child.meta.title }}</router-link
            >
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style>
</style>
