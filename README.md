[![Actions Status](https://github.com/suusan2go/vuetify-draggable-treeview/workflows/test/badge.svg)](https://github.com/suusan2go/vuetify-draggable-treeview/actions)
[![codecov](https://codecov.io/gh/suusan2go/vuetify-draggable-treeview/branch/master/graph/badge.svg)](https://codecov.io/gh/suusan2go/vuetify-draggable-treeview)
[![npm version](https://badge.fury.io/js/vuetify-draggable-treeview.svg)](https://badge.fury.io/js/vuetify-draggable-treeview)

# vuetify-draggable-treeview
Drag and drop `v-treeview` (Vuetify Treeview) component.

[Live Demo](https://v-draggable-treeview.netlify.com/)

![v-treeview](https://user-images.githubusercontent.com/8841470/70327688-b6ca2800-187a-11ea-907e-79d7dc3afca9.gif)


## Installation

```bash
yarn add vuetify-draggable-treeview
// @NOTE: This component requires vue, vuetify, vuedraggable as peerDependency.
yarn add vuedraggable
```

## Setup

```ts
import VuetifyDraggableTreeview from 'vuetify-draggable-treeview'
Vue.use(VuetifyDraggableTreeview)

// or manually import
VuetifyDraggableTreeview

export default Vue.extend({
  components: {
    VuetifyDraggableTreeview
  }
})

```

## Usage

### Basic Example
```vue
<template>
<v-draggable-treeview
  group="test"
  v-model="items"
></v-draggable-treeview>
</template>

<script>
export default {
  data() {
    return {
      items: [{ id: 1, name: "hoge", children: [{ id:11, name: "hoge-child1" }] }]
    }
  }
}
</script>
```

### Drag and drop only in children.
```vue
<template>
<v-draggable-treeview
  v-model="items"
></v-draggable-treeview>
</template>

<script>
export default {
  data() {
    return {
      items: [{ id: 1, name: "hoge", children: [{ id:11, name: "hoge-child1" }] }]
    }
  }
}
</script>
```

### Using slot
```vue
<template>
<v-draggable-treeview v-model="items" group="hoge">
  <template v-slot:prepend="{ item }">
    <v-icon>mdi-file</v-icon>
  </template>
  <template v-slot:label="{ item }">
    <span class="primary--text">{{ item.name }}</span>
  </template>
  <template v-slot:append="{ item }">
    <template
            v-if="item.children != null && item.children.length > 0"
    >
      has {{ item.children.length }} children
    </template>
  </template>
</v-draggable-treeview>
</template>

<script>
export default {
  data() {
    return {
      items: [{ id: 1, name: "hoge", children: [{ id:11, name: "hoge-child1" }] }]
    }
  }
}
</script>
```

## API
Currently, this component dose not support all original `v-treeview` component's props, slots, event.

### Props
Name | Type | Default | Description
--- | ---- | ---- | ---
value | Object | [] | items for treeview. `item-key`, `item-text`, `item-children` are not customizable currently.  `value` can be like `{ id: 1, name: "test", children: []}` .
group | string | null | group name for vuedraggable. If this props not provided, drag and drop are enabled only in children.
expand-icon | string | 'mdi-menu-down' |mdi string for the expand icon.

### Events
Name | Value  | Description
--- | ---- | ---- 
input | array |  Emits the array of selected items when this value changes


### Slots
Name | Props  | Description
--- | ---- |  ---
append | { item: any, open: boolean } |  Appends content after label
label | { item: any, open: boolean } |  Label content
prepend | { item: any, open: boolean } |  Prepends content before label


