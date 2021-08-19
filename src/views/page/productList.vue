<template>
  <div class="productList">
    <!-- 搜索条 -->
    <div class="search">
      <searchLine @handleSubmit="handleSubmit" :categoryList="categoryList" />
      <a-button class="product-add-list">
        <router-link :to="{ name: 'ProductAdd' }">增加</router-link>
      </a-button>
    </div>
    <!-- 列表 -->
    <div class="list">
      <products-table
        :data="data"
        :page="page"
        @change="changePage"
        @edit="handleEdit"
        @remove="handleRemove"
      />
    </div>
  </div>
</template>
<script>
import searchLine from '@/components/search.vue';
import productsTable from '@/components/productsTable.vue';
import products from '@/api/products';
import api from '@/api/category';

export default {
  components: {
    searchLine,
    productsTable,
  },
  data() {
    return {
      // 所有的列表数据
      data: [],
      // 搜索框的值
      searchForm: {},
      // 类目列表
      categoryList: [],
      // 分页栏 的具体数据
      page: {
        current: 1,
        pageSize: 10,
        // 是否展示每页多少条数据
        showSizeChanger: true,
        total: 1,
      },
      // 创建一映射， 方便获取值
      categoryObj: {},
    };
  },
  methods: {
    // 这里获取到搜索框的值，对 searchForm 进行赋值
    handleSubmit(formInline) {
      this.searchForm = formInline;
      this.getTableList();
    },
    // 获取列表的数据
    getTableList() {
      products
        .products({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          // res 中有全部的列表数据， 也有 列表数据的总个数
          this.page.total = res.total;
          // 对 列表数据进行遍历， 返回对象
          this.data = res.data.map((item) => ({
            ...item,
            // item.category 代表的是 类目 的id，
            // this.categoryObj[item.category].name 代表的是 类目 的名字
            // 在这里直接把 类目 的id 换成 名字， 省去了后面的许多麻烦
            categoryName: this.categoryObj[item.category].name,
          }));
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableList();
    },
    handleEdit(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    handleRemove(record) {
      this.$confirm({
        title: '请您再三确认!!',
        content: `您确定要删除"${record.c_item}"`,
        onOk: () => {
          products
            .productRemove({
              id: record.id,
            })
            .then(() => {
              this.getTableList();
            });
        },
        onCancel() {},
      });
    },
  },
  async created() {
    // 等待这里获取数据先完成，如果这里的数据没有获取到，后面无法正常使用 （categoryList）
    // 这里获取的是 类目 的列表数据
    await api.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        // 通过 中间媒介 ， 得到 类目数据 的全部内容
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableList();
  },
};
</script>
<style lang="less">
.productList {
  margin-left: 180px;
  position: relative;
  .search {
    padding: 5px 0px 5px 40px;
  }
  .product-add-list {
    position: absolute;
    right: 0;
    top: 7px;
    margin-right: 20px;
  }
}
</style>
