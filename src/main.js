import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vuetify from "./plugins/vuetify";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.prototype.axios = axios;
Vue.config.productionTip = false;

fetch(process.env.BASE_URL + "config.json")
    .then((response) => response.json())
    .then((config) => {
      Vue.prototype.$config = config
      store.commit('setConfig', config);
      new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
      }).$mount("#app");
    })
