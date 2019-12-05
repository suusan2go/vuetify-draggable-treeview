import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VDraggableTreeView from "vuetify-draggable-treeview";

Vue.use(VDraggableTreeView);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
