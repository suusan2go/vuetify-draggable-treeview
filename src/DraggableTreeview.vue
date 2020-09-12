<template>
  <draggable
    :value="localValue"
    :group="group"
    class="v-treeview v-treeview-draggable"
    :class="themeClassName"
    ghost-class="ghost"
    @input="updateValue"
  >
    <draggable-tree-view-node
      v-for="item in value"
      :key="item.id"
      :group="group"
      :value="item"
      :expand-icon="expandIcon"
      @input="updateItem"
    >
      <template v-slot:prepend="{ item, open }">
        <slot name="prepend" v-bind="{ item, open }"> </slot>
      </template>
      <template v-slot:label="{ item, open }">
        <slot name="label" v-bind="{ item, open }"> </slot>
      </template>
      <template v-slot:append="{ item, open }">
        <slot name="append" v-bind="{ item, open }"> </slot>
      </template>
    </draggable-tree-view-node>
  </draggable>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import draggable from "vuedraggable";
import DraggableTreeViewNode from "./DraggableTreeviewNode.vue";

export default Vue.extend({
  components: {
    draggable,
    DraggableTreeViewNode,
  },
  props: {
    value: {
      type: Array as PropType<{ id: string | number }[]>,
      default: (): { id: string | number }[] => {
        return [];
      },
    },
    group: {
      type: String,
      default: null,
    },
    expandIcon: {
      type: String,
      default: "mdi-menu-down",
    },
  },
  data() {
    return {
      localValue: [...this.value],
    };
  },
  computed: {
    themeClassName(): string {
      return this.$vuetify.theme.isDark ? "theme--dark" : "theme--light";
    },
  },
  watch: {
    value(value) {
      this.localValue = [...value];
    },
  },
  methods: {
    updateValue(value): void {
      this.localValue = value;
      this.$emit("input", this.localValue);
    },
    updateItem(itemValue): void {
      const index = this.localValue.findIndex((v) => v.id === itemValue.id);
      this.$set(this.localValue, index, itemValue);
      this.$emit("input", this.localValue);
    },
  },
});
</script>
