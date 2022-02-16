import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

// 載入驗證套件
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import rules from "@vee-validate/rules";

import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

// 載入 axios
import axios from "axios";
import VueAxios from "vue-axios";

Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale("zh_TW");

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .component("Form", Form)
  .component("Field", Field)
  .component("ErrorMessage", ErrorMessage)
  .component("Loading", Loading)
  .mount("#app");
