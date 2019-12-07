<template>
  <div
    :class="
      `v-treeview-node v-treeview-node--click ${
        hasChildren ? '' : 'v-treeview-node--leaf'
      }`
    "
  >
    <div class="v-treeview-node__root" @click="open = !open">
      <i
        v-if="hasChildren"
        role="button"
        class="v-icon notranslate v-treeview-node__toggle v-icon--link mdi mdi-menu-down"
        :class="{
          'v-treeview-node__toggle--open': open,
          'theme--dark': isDark,
          'theme--light': !isDark
        }"
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
          :group="group"
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
      type: String,
      default: null
    }
  },
  data() {
    return {
      open: false,
      localValue: { ...this.value } as TreeItem
    };
  },
  computed: {
    hasChildren(): boolean {
      return this.value.children != null && this.value.children.length > 0;
    },
    isDark(): boolean {
      return this.$vuetify.theme.isDark;
    }
  },
  watch: {
    value(value): void {
      this.localValue = { ...value };
    }
  },
  methods: {
    updateValue(value: TreeItem[]): void {
      this.localValue.children = [...value];
      this.$emit("input", this.localValue);
    },
    updateChildValue(value: TreeItem): void {
      const index = this.localValue.children.findIndex(c => c.id === value.id);
      this.$set(this.localValue.children, index, value);
      this.$emit("input", this.localValue);
    }
  }
});
</script>
