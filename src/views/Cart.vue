<template>
  <div>
    <h5 class="m-5">這是購物車頁面</h5>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeCart(item.id)"
                    >
                      <i class="fas fa-spinner fa-pulse"></i>
                      移除購物車
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <input
                        type="number"
                        min="1"
                        class="form-control"
                        v-model="item.qty"
                        @change="editQty(item)"
                      />
                    </div>
                  </td>
                  <td class="text-end">
                    <small
                      v-if="cart.final_total !== cart.total"
                      class="text-success"
                      >折扣價：</small
                    >
                    {{ item.final_total }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ cart.total }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="my-5 row justify-content-center">
        <Form
          ref="form"
          class="col-md-6"
          v-slot="{ errors }"
          @submit="postOrder"
        >
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="form.user.email"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <Field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            ></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <Field
              id="tel"
              name="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              :rules="checkPhone"
              v-model="form.user.tel"
            ></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <Field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
            ></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea
              name=""
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary">送出訂單</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      coupon: "",
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        this.cart = res.data.data;
      });
    },
    removeCart(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http
        .delete(url)
        .then((response) => {
          alert(response.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    editQty(item) {
      if (item.qty < 1) {
        item.qty = 1;
        alert("商品數量不能小於 1");
        return;
      }
      const cart = {
        data: {
          product_id: item.id,
          qty: item.qty,
        },
      };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .put(url, cart)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          this.getCart();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    checkPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "請確認電話號碼為 09 開頭";
    },
    postOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      this.$http
        .post(url, { data: this.form })
        .then((response) => {
          alert(response.data.message);
          this.$refs.form.resetForm();
          this.formData.message = "";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
