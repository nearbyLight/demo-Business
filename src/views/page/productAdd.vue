<template>
  <div class="product-add">
    <a-steps class="product-step" :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <!-- 内容区 -->
      <base-info v-if="current === 0" @next="next" :form="form" />
      <sale-info v-else-if="current === 1" :form="form" @next="next" @prev="prev" />
    </div>
  </div>
</template>
<script>
import BaseInfo from '@/components/baseInfo.vue';
import SaleInfo from '@/components/saleInfo.vue';
import api from '@/api/products';

export default {
  components: {
    BaseInfo,
    SaleInfo,
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品详细信息',
        },
      ],
      form: {
        price: '',
        price_off: '',
        inventory: '',
        units: '',
        images: [],
        title: '',
        desc: '',
        category: '',
        c_item: [],
        tags: [],
      },
    };
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        if (this.$route.params.id) {
          api.edit(this.form).then((res) => {
            console.log(res);
            this.$message.success('编辑成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        } else {
          api.add(this.form).then((res) => {
            console.log(res);
            this.$message.success('新增成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      api.detail(id).then((res) => {
        this.form = res;
      });
    }
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
.product-add {
  margin-left: 180px;
}
.product-step {
  width: 50%;
  margin: 0 auto;
  padding: 20px;
}
</style>
