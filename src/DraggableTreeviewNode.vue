<template>
  <div
    :class="
      `v-treeview-node v-treeview-node--click ${
        value.children.length === 0 ? 'v-treeview-node--leaf' : ''
      }`
    "
  >
    <div class="v-treeview-node__root" @click="open = !open">
      <i
        v-if="value.children.length !== 0"
        role="button"
        class="v-icon notranslate v-treeview-node__toggle v-icon--link mdi mdi-menu-down theme--light"
        :class="{ 'v-treeview-node__toggle--open': open }"
      />
      <slot name="prepend" v-bind="{ item: value, open }" />
      <div class="v-treeview-node__label">
        <slot name="label" v-bind="{ item: value, open }">
          {{ value.name }}
        </slot>
      </div>
      <slot name="append" v-bind="{ item: value }" />
    </div>
    <div
      v-if="open"
      class="v-treeview-node__children v-treeview-node__children__draggable"
    >
      <draggable
        :group="group"
        :value="value.children"
        ghost-class="ghost"
        @input="updateValue"
      >
        <treeview-node
          v-for="child in value.children"
          :key="child.id"
          :value="child"
          @input="updateChildValue"
        >
          <template v-slot:prepend="{ item, open }">
            <slot name="prepend" v-bind="{ item, open }" />
          </template>
          <template v-slot:append="{ item }">
            <slot name="append" v-bind="{ item }" />
          </template>
        </treeview-node>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Draggable from "vuedraggable";

type TreeItem = {
  id: number;
  name: string;
  children: TreeItem[];
};

export default Vue.extend({
  name: "TreeviewNode",
  components: {
    Draggable
  },
  props: {
    value: {
      type: Object as PropType<TreeItem>,
      default: (): TreeItem => ({
        id: 0,
        name: "",
        children: []
      })
    },
    root: {
      type: Boolean,
      default: (): boolean => false
    },
    group: {
      type: [String, null],
      default: null
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    updateValue(value: TreeItem[]): void {
      console.log("updateValue:child");
      console.log(value);
      this.$emit("input", {
        ...this.value,
        children: value
      });
    },
    updateChildValue(value: TreeItem): void {
      const newValue = this.value.children.map(c => {
        if (c.id === value.id) {
          return value;
        }
        return c;
      });
      this.updateValue(newValue);
      console.log("updateChildValue:newValue");
      console.log(newValue);
    }
  }
});
</script>
