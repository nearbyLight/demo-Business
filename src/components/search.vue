<template>
  <div class="product-list">
    <a-form-model
      layout="inline"
      :model="formInline"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="搜索关键字">
        <a-input v-model="formInline.searchWord" placeholder="请输入关键字">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="选择类目">
        <a-select
          show-search
          placeholder="请选择类目"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option
            v-for="item in categoryList"
            :key="item.id"
            :vlaue="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜 索 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>

export default {
  props: ['categoryList'],
  data() {
    return {
      formInline: {
        searchWord: '',
        category: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('handleSubmit', this.formInline);
    },
    handleChange(value) {
      this.formInline.category = value;
    },
  },
};
</script>
