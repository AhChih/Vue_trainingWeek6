<template>
  <div>
    <div class="d-flex justify-content-between mt-3">
      <h2>產品列表</h2>
      <button
        type="button"
        class="btn btn-primary"
        @click="checkModal('新增資料')"
      >
        新增商品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="100">編輯商品</th>
          <th width="100">刪除商品</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">
            {{ item.origin_price }}
          </td>
          <td class="text-end">
            {{ item.price }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="checkModal('編輯資料', item)"
            >
              編輯
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              @click="checkModal('刪除資料', item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
    <AdminProductModal
      ref="AdminProductModal"
      :is-new="isNew"
      :is-delete="isDelete"
      :product="tempProduct"
      @get-products="getProducts"
    ></AdminProductModal>
  </div>
</template>
<script>
import Pagination from "../../components/Pagination.vue";
import AdminProductModal from "../../components/AdminProductModal.vue";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isDelete: false,
      tempId: "",
    };
  },
  components: {
    Pagination,
    AdminProductModal,
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          //   alert(error.response.data.message);
        });
    },
    checkModal(status, item) {
      if (status === "新增資料") {
        this.tempProduct = {};
        this.isDelete = false;
        this.isNew = true;
        setTimeout(() => {
          this.$refs.AdminProductModal.openModal();
        }, 0);
      } else if (status === "編輯資料") {
        this.tempProduct = { ...item };
        this.isDelete = false;
        this.isNew = false;
        setTimeout(() => {
          this.$refs.AdminProductModal.openModal();
        }, 0);
      } else if (status === "刪除資料") {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.isDelete = true;
        setTimeout(() => {
          this.$refs.AdminProductModal.openModal();
        }, 0);
      }
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
