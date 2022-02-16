<template>
  <div
    class="modal fade"
    id="productModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-if="isDelete === true">
            確定要刪除 {{ product.title }}
          </h5>
          <h5 class="modal-title" v-if="isNew === true">新增產品</h5>
          <h5 class="modal-title" v-if="!isNew && !isDelete">編輯產品</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="!isDelete">
          <div class="d-flex">
            <div class="form-group px-2">
              <label class="form-label" for="title">產品標題</label>
              <input
                v-model="tempProduct.title"
                class="form-control"
                type="text"
              />
            </div>

            <div class="form-group px-2">
              <label class="form-label" for="category">產品分類</label>
              <input
                v-model="tempProduct.category"
                class="form-control"
                id="category"
                type="text"
              />
            </div>

            <div class="form-group px-2">
              <label class="form-label" for="unit">產品單位</label>
              <input
                v-model="tempProduct.unit"
                class="form-control"
                id="unit"
                type="text"
              />
            </div>
          </div>

          <div class="d-flex my-3">
            <div class="form-group px-2">
              <label class="form-label" for="origin_price">產品售價</label>
              <input
                v-model="tempProduct.origin_price"
                class="form-control"
                id="origin_price"
                type="number"
              />
            </div>

            <div class="form-group px-2">
              <label class="form-label" for="price">產品原價</label>
              <input
                v-model="tempProduct.price"
                class="form-control"
                id="price"
                type="number"
              />
            </div>
          </div>

          <div class="form-group mt-3 px-2">
            <label class="form-label" for="description">產品描述</label>
            <textarea
              v-model="tempProduct.description"
              class="form-control"
              id="description"
              type="text"
            ></textarea>
          </div>

          <div class="form-group mt-3 px-2">
            <label class="form-label" for="content">產品說明</label>
            <textarea
              v-model="tempProduct.content"
              class="form-control"
              id="content"
              type="text"
            ></textarea>
          </div>

          <div class="form-group mt-3 px-2">
            <label for="formFile" class="form-label"
              >Default file input example</label
            >
            <input
              class="form-control"
              name="file-to-upload"
              type="file"
              id="formFile"
              @change="$emit('upload-img')"
            />
          </div>

          <div class="form-group mt-3">
            <div class="form-check">
              <input
                id="is_enabled"
                v-model="tempProduct.is_enabled"
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
              />
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button
            type="button"
            class="btn btn-primary"
            v-if="isNew === true"
            @click="addProduct"
          >
            確定新增
          </button>
          <button
            type="button"
            class="btn btn-primary"
            v-if="!isNew && !isDelete"
            @click="editProduct"
          >
            確定更改
          </button>
          <button
            type="button"
            class="btn btn-danger"
            v-if="isDelete === true"
            @click="delProduct"
          >
            確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "bootstrap/js/dist/modal";
export default {
  props: ["product", "isNew", "isDelete"],
  data() {
    return {
      tempProduct: {},
    };
  },
  methods: {
    openModal() {
      if (this.isNew) {
        this.tempProduct = {};
        this.modal.show();
      } else if (!this.isNew && !this.isDelete) {
        this.tempProduct = JSON.parse(JSON.stringify(this.product));
        this.modal.show();
      } else if (this.isDelete) {
        this.tempProduct = { ...this.product };
        this.modal.show();
      }
    },
    closeModal() {
      this.modal.hide();
    },
    addProduct() {
      const data = {
        data: { ...this.tempProduct },
      };
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/`,
          data
        )
        .then((res) => {
          alert(res.data.message);
          this.closeModal();
          this.$emit("get-products");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    editProduct() {
      const data = {
        data: { ...this.tempProduct },
      };
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${data.data.id}`,
          data
        )
        .then((res) => {
          alert(res.data.message);
          this.closeModal();
          this.$emit("get-products");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          alert(res.data.message);
          this.closeModal();
          this.$emit("get-products");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
    });
  },
};
</script>
