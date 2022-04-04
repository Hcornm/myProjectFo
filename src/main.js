import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
// store
import store from "./resource/store";
// css
import "./assets/scss/parent.scss";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
