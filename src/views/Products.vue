<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <h5 class="m-5">這是產品畫面</h5>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width: 200px">
            <div
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
            <del class="h6" v-if="item.price"
              >原價 {{ item.origin_price }} 元</del
            >
            <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="getProduct(item.id)"
                :disabled="loadingStatus.loadingItem === item.id"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-if="loadingStatus.loadingItem === item.id"
                ></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(item.id)"
                :disabled="loadingStatus.loadingItem === item.id"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-if="loadingStatus.loadingItem === item.id"
                ></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ProductModal
      :product="tempProduct"
      @add-to-cart="addToCart"
      ref="ProductModal"
    ></ProductModal>
  </div>
</template>

<script>
import ProductModal from "../components/ProductModal.vue";

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isLoading: false,
      loadingStatus: {
        loadingItem: "",
      },
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((error) => {
          alert(error.response.data.message);
          this.isLoading = false;
        });
    },
    getProduct(id) {
      this.isLoading = true;
      this.loadingStatus.loadingItem = id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.loadingStatus.loadingItem = "";
          this.tempProduct = res.data.product;
          this.$refs.ProductModal.openModal();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      this.loadingStatus.loadingItem = id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http
        .post(url, { data: cart })
        .then((res) => {
          this.isLoading = false;
          this.loadingStatus.loadingItem = "";
          alert(res.data.message);
        })
        .catch((error) => {
          this.isLoading = false;
          alert(error.response.data.message);
        });
      this.$refs.ProductModal.closeModal();
    },
  },
  mounted() {
    this.getProducts();
  },
  components: {
    ProductModal,
  },
};
</script>
