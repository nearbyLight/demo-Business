<template>
  <a-table
    :columns="columns"
    :data-source="getValue"
    :pagination="page"
    @change="changePage"
  >
    <div slot="operation" slot-scope="text, record">
      <a-button @click="productEdit(record)">编辑</a-button>
      <a-button @click="productRemove(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'name',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: 150,
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    // scopedSlots  列中是否存在插槽，  customerRender 应对的是插槽的名称
    scopedSlots: { customRender: 'operation' },
    width: 200,
  },
];

export default {
  props: ['data', 'page'],
  data() {
    return {
      columns,
    };
  },
  methods: {
    changePage(page) {
      this.$emit('change', page);
    },
    productEdit(record) {
      this.$emit('edit', record);
    },
    productRemove(record) {
      this.$emit('remove', record);
    },
  },
  computed: {
    getValue() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
};
</script>
