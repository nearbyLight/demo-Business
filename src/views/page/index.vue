<template>
  <div class="index">
    <div class="card">
      <Card />
    </div>
    <div class="broken-line">
      <BrokenLine />
    </div>
  </div>
</template>
<script>
import BrokenLine from '@/components/BrokenLine.vue';
import Card from '@/components/card.vue';

export default {
  components: {
    Card,
    BrokenLine,
  },
};
</script>
<style lang="less">
.index{
  position: relative;
  margin-left: 180px;
  z-index: -1;
  .card{
    position: absolute;
    width: 100%;
    box-sizing: border-box;
  }
  .broken-line{
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    top: 200px;
  }
}
</style>
