<template>
  <draggable
    :value="value"
    :group="group"
    class="v-treeview theme-light v-treeview-draggable"
    ghost-class="ghost"
    @input="value => $emit('input', value)"
  >
    <draggable-tree-view-node
      :group="group"
      v-for="item in value"
      :key="item.id"
      :value="item"
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
    DraggableTreeViewNode
  },
  props: {
    value: {
      type: Array as PropType<{ id: string | number }[]>,
      default: (): { id: string | number }[] => {
        return [];
      }
    },
    group: {
      type: [String, null],
      default: null
    }
  },
  methods: {
    updateItem(itemValue): void {
      console.log("itemValue");
      console.log(itemValue);
      console.log(itemValue);
      const newValue = this.value.map(v => {
        if (v.id === itemValue.id) {
          return itemValue;
        }
        return v;
      });
      console.log("newValue");
      console.log(newValue);
      this.$emit("input", newValue);
    }
  }
});
</script>
