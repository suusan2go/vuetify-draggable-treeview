<template>
  <div
    :class="`v-treeview-node v-treeview-node--click ${
      hasChildren ? '' : 'v-treeview-node--leaf'
    }`"
  >
    <div class="v-treeview-node__root" @click="open = !open">
      <div
        v-for="index in appendLevel"
        :key="index"
        class="v-treeview-node__level"
      />
      <i
        v-if="hasChildren"
        role="button"
        class="v-icon notranslate v-treeview-node__toggle v-icon--link mdi material-icons"
        :class="[
          {
            'v-treeview-node__toggle--open': open,
            'theme--dark': isDark,
            'theme--light': !isDark,
          },
          expandIcon,
        ]"
      />
      <button
        v-if="selectable"
        type="button"
        :class="{
          'value.isSelected': 'accent--text',
        }"
        class="v-icon notranslate v-treeview-node__checkbox v-icon--link theme--light mr-2"
        @click.stop="checkSelect(!value.isSelected)">
        <svg v-if="value.isIndeterminate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z"></path></svg>
        <svg v-else-if="!value.isSelected" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"></path></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z"></path></svg>
      </button>
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
        :handle="handle"
        ghost-class="ghost"
        @input="updateValue"
        @change="changeValue"
      >
        <treeview-node
          v-for="child in value.children"
          :key="child.id"
          :group="group"
          :value="child"
          :level="level + 1"
          :expand-icon="expandIcon"
          :selectable="selectable"
          @input="updateChildValue"
          @changeValue="changeValue"
          @changeSelect="changeSelectChild"
        >
          <template v-slot:prepend="{ item, open }">
            <slot name="prepend" v-bind="{ item, open }" />
          </template>
          <template v-slot:label="{ item, open }">
            <slot name="label" v-bind="{ item, open }"></slot>
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
  parentId: number | null;
  name: string;
  isSelected: boolean;
  isIndeterminate: boolean;
  children: TreeItem[];
};

export default Vue.extend({
  name: "TreeviewNode",
  components: {
    Draggable,
  },
  props: {
    level: {
      type: Number,
      default: 0,
    },
    value: {
      type: Object as PropType<TreeItem>,
      default: (): TreeItem => ({
        id: 0,
        parentId: null,
        name: "",
        isSelected: false,
        isIndeterminate: false,
        children: [],
      }),
    },
    root: {
      type: Boolean,
      default: (): boolean => false,
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
    selectable: Boolean,
  },
  data() {
    return {
      open: false,
      localValue: { ...this.value } as TreeItem,
    };
  },
  computed: {
    hasChildren(): boolean {
      return this.value.children != null && this.value.children.length > 0;
    },
    isDark(): boolean {
      return this.$vuetify.theme.isDark;
    },
    appendLevel(): number {
      return this.level + (this.hasChildren ? 0 : 1);
    },
  },
  watch: {
    value(value): void {
      this.localValue = { ...value };
    },
  },
  methods: {
    updateValue(value: TreeItem[]): void {
      this.localValue.children = [...value];
      this.$emit("input", this.localValue);
    },
    changeValue(event: void) {
      this.$emit("changeValue", event);
    },
    updateChildValue(value: TreeItem): void {
      const index = this.localValue.children.findIndex(
        (c) => c.id === value.id
      );
      this.$set(this.localValue.children, index, value);
      this.$emit("input", this.localValue);
    },
    checkSelect(value: boolean): void {
      this.localValue.isSelected = value;
      this.localValue.isIndeterminate = false;
      if (this.hasChildren) {
        this.setChildren(this.localValue.children, value);
      }
      this.$emit("changeSelect", this.localValue);
    },
    setChildren(children: TreeItem[], selected: boolean): void {
      for (let index = 0; index < children.length; index++) {
        children[index].isSelected = selected;
        children[index].isIndeterminate = false;
        if (children[index].children.length > 0) {
          this.setChildren(children[index].children, selected);
        }
        this.$set(children, index, children[index]);
      }
    },
    checkIndeterminate(children: TreeItem[]): boolean {
      const unique = this.getCheck(children);
      return unique.includes(true);
    },
    getCheck(children: TreeItem[]): Array<boolean> {
      return [
        ...new Set(
          children.map(
            (item) =>
              !(!item.isSelected || typeof item.isSelected === "undefined") ||
              item.isSelected ||
              item.isIndeterminate
          )
        ),
      ];
    },
    changeSelectChild(value: TreeItem): void {
      const index = this.localValue.children.findIndex(
        (c) => c.id === value.id
      );
      this.$set(this.localValue.children, index, value);
      this.localValue.isIndeterminate = this.checkIndeterminate(this.localValue.children);
      this.$emit("changeSelect", this.localValue);
    },
  },
});
</script>
