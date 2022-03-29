<template>
  <div>
    <div class="d-flex align-center" :style="{ height: '48px' }" v-if="header">
      <div :style="{ padding: '0 96px 0 32px' }">
        <button
          v-if="selectable && localValue.length > 0"
          type="button"
          :class="{'value.isSelected': 'accent--text'}"
          class="v-icon notranslate v-treeview-node__checkbox v-icon--link theme--light mr-2"
          @click.stop="selectAll(!selectedAll)">
          <svg v-if="indeterminateAll" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z"></path></svg>
          <svg v-else-if="!selectedAll" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z"></path></svg>
        </button>
      </div>
      <slot name="header"/>
    </div>
    <draggable
      :value="localValue"
      :group="group"
      :handle="handle"
      class="v-treeview v-treeview-draggable"
      :class="themeClassName"
      ghost-class="ghost"
      @input="updateValue"
      @change="changeValue"
    >
      <draggable-tree-view-node
        v-for="item in value"
        :key="item.id"
        :group="group"
        :value="item"
        :expand-icon="expandIcon"
        :selectable="selectable"
        @input="updateItem"
        @changeValue="changeValue"
        @changeSelect="changeSelectItem"
        @setSelect="setSelect"
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
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import draggable from "vuedraggable";
import DraggableTreeViewNode from "./DraggableTreeviewNode.vue";

type TreeItem = {
  id: number;
  parentId: number | null;
  name: string;
  isSelected: boolean;
  isIndeterminate: boolean;
  children: TreeItem[];
};
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
    handle: {
      type: String,
      default: null,
    },
    header: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default: (): Array<any> => {
        return [];
      },
    },
  },
  data() {
    return {
      selectedAll: false,
      indeterminateAll: false,
      localValue: [...this.value],
      localSelected: [...this.selected],
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
      this.setSelect();
    },
  },
  methods: {
    updateValue(value): void {
      this.localValue = value;
      this.updateInput();
    },
    changeValue(event: void) {
      this.$emit("change", event);
    },
    updateItem(itemValue): void {
      const index = this.localValue.findIndex((v) => v.id === itemValue.id);
      this.$set(this.localValue, index, itemValue);
      this.updateInput();
    },
    changeSelectItem(itemValue: TreeItem): void {
      const index = this.localValue.findIndex((v) => v.id === itemValue.id);
      this.$set(this.localValue, index, itemValue);
      this.updateInput();
    },
    updateInput(): void {
      this.$emit("input", this.localValue);
      this.setSelect();
    },
    setSelect(): void {
      this.localSelected = this.checkSelect(this.localValue);
      this.indeterminateAll = this.localSelected.length > 0;
      this.selectedAll = !!this.indeterminateAll;
      this.$emit("update:selected", this.localSelected);
    },
    checkSelect(items): void {
      let array = [];
      for (let index = 0; index < items.length; index++) {
        if (items[index].isSelected) array.push(items[index]);
        if (items[index].children.length > 0) {
          const childArray = this.checkSelect(items[index].children);
          if (childArray.length > 0) array = array.concat(childArray);
        }
      }
      return array;
    },
    clearCheckbox (): void {
      this.setCheckbox(this.localValue, false);
    },
    setCheckbox(items, value: boolean): void {
      for (let index = 0; index < items.length; index++) {
        items[index].isSelected = value;
        items[index].isIndeterminate = false;
        if (items[index].children.length > 0) {
          this.setCheckbox(items[index].children, value);
        }
      }
    },
    selectAll (value) {
      this.indeterminateAll = false;
      this.selectedAll = value;
      this.setCheckbox(this.localValue, value);
    }
  },
});
</script>
