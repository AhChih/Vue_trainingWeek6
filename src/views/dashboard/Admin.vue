<template>
  <div>
    <h1>後台畫面</h1>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/index">回到前台</router-link>
          <router-link class="nav-link" to="/admin/productList"
            >產品列表</router-link
          >
          <router-link class="nav-link" to="/admin/orders"
            >訂單管理</router-link
          >
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    checkToken() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.$http.defaults.headers.common.Authorization = `${token}`;

      const url = `${process.env.VUE_APP_API}/api/user/check`;
      this.$http
        .post(url, { api_token: this.token })
        .then(() => {
          // alert("成功登入");
        })
        .catch(() => {
          // alert(error.response.data.message);
          this.$router.push("/login");
        });
    },
  },
  mounted() {
    this.checkToken();
  },
};
</script>
