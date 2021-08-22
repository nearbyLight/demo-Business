<template>
  <div class="base-info">
    <a-form-model
      ref="ruleForm"
      :rule="rule"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="标题" prop="title" required>
        <a-input v-model="form.title" placeholder="请输入商品" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" placeholder="请输入商品的描述" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category" required>
        <a-select
          v-model="form.category"
          placeholder="请选择商品类目"
          @change="handleChange"
        >
          <a-select-option
            v-for="item in categoryList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="请选择子类目">
          <a-select-option
            v-for="item in categoryItem"
            :key="item"
            :value="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags">
        <a-select
          mode="tags"
          placeholder="请输入商品标签"
          :default-value="['包邮，最快次日达']"
          v-model="form.tags"
        >
          <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
            {{ (i + 9).toString(36) + i }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{span: 24}">
        <a-button type="primary" @click="next">下 一 步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '@/api/category';

export default {
  props: ['form'],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
      rule: [],
      categoryList: [],
      categoryItem: [],
    };
  },
  created() {
    api.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    handleChange(value) {
      for (let index = 0; index < this.categoryList.length; index += 1) {
        if (this.categoryList[index].id === value) {
          this.categoryItem = this.categoryList[index].c_items;
        }
      }
    },
    next() {
      // eslint-disable-next-line consistent-return
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="less">
.base-info {
  margin: 0 auto;
  width: 80%;
}
</style>
