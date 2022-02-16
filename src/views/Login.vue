<template>
  <div class="container mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <h5>請先登入</h5>
        <div class="col-8">
          <form class="form-signin" @submit.prevent="loginIn">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="emailInput"
                placeholder="name@example.com"
                required
                autofocus
                v-model="user.username"
              />
              <label for="emailInput">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="passwordInput"
                placeholder="Password"
                required
                v-model="user.password"
              />
              <label for="passwordInput">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </form>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    loginIn() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http
        .post(api, this.user)
        .then((response) => {
          const { token, expired } = response.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          this.$router.push("/admin");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
