import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 정산
import test from "./modules/test";

export default new Vuex.Store({
  modules: {
    test,
  },
});
