import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VDraggableTreeView from "vuetify-draggable-treeview";
import "vuetify/dist/vuetify.css";

Vue.use(VDraggableTreeView);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
