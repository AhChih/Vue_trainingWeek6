<template>
  <div class="container">
    <div class="row">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">顧客名稱</th>
            <th scope="col">顧客信箱</th>
            <th scope="col">顧客電話</th>
            <th scope="col">顧客地址</th>
            <th scope="col">狀態</th>
            <th scope="col">訂單日期</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orders" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.user.name }}</td>
            <td>{{ item.user.email }}</td>
            <td>{{ item.user.tel }}</td>
            <td>{{ item.user.address }}</td>
            <td>{{ item.is_paid ? "已付款" : "未付款" }}</td>
            <td>{{ showDate(item.create_at * 1000) }}</td>
            <td>
              <button class="btn btn-primary" @click="openModal(item)">
                詳細資訊
              </button>
              <button class="btn btn-danger" @click="deleteOrder(item.id)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <OrderModal :order="tempOrder"></OrderModal> -->
    <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
    <OrderModal ref="orderModal" :order="tempOrder"></OrderModal>
  </div>
</template>
<script>
import Pagination from "../../components/Pagination.vue";
import OrderModal from "../../components/OrderModal.vue";
export default {
  data() {
    return {
      orders: {},
      pagination: {},
      tempOrder: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          alert(error);
        });
    },
    showDate(item) {
      const day = new Date(item);
      const year = day.getFullYear();
      const month = day.getMonth() + 1;
      const date = day.getDate();
      return `${year}/${month}/${date}`;
    },
    deleteOrder(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          alert(res.data.message);
          this.getOrders();
        })
        .catch(() => {
          alert("移除失敗");
        });
    },
    openModal(item) {
      this.tempOrder = item;
      this.$refs.orderModal.openModal();
    },
  },
  mounted() {
    this.getOrders();
  },
  components: {
    Pagination,
    OrderModal,
  },
};
</script>
