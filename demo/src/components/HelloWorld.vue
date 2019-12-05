<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12 text-center>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Vuetify Draggable Treeview
        </h1>
      </v-flex>
      <v-flex mb-5 xs12>
        <h2>demo codes</h2>
        <a
          target="_blank"
          rel="noopener"
          href="https://github.com/suusan2go/vuetify-draggable-treeview/blob/master/demo/"
          >GitHub</a
        >
      </v-flex>
    </v-layout>

    <v-layout wrap>
      <v-flex mb-5 xs12>
        <v-card>
          <v-card-title> Basic Example </v-card-title>
          <v-card-text>
            <v-draggable-treeview
              group="test"
              v-model="items"
            ></v-draggable-treeview>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex mb-5 xs12>
        <v-card>
          <v-card-title> Drag and drop only in children. </v-card-title>
          <v-card-text>
            <v-draggable-treeview v-model="items"></v-draggable-treeview>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex mb-5 xs12>
        <v-card>
          <v-card-title> Using Slot </v-card-title>
          <v-card-text>
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
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",

  data: () => ({
    firstExample:
      '<v-draggable-treeview group="test" v-model="items"></v-draggable-treeview>',
    secondExample:
      '<v-draggable-treeview v-model="items"></v-draggable-treeview>',
    thirdExample:
      '            <v-draggable-treeview v-model="items" group="hoge">\n' +
      '              <template v-slot:prepend="{ item }">\n' +
      "                <v-icon>mdi-file</v-icon>\n" +
      "              </template>\n" +
      '              <template v-slot:label="{ item }">\n' +
      '                <span class="primary--text">{{ item.name }}</span>\n' +
      "              </template>\n" +
      '              <template v-slot:append="{ item }">\n' +
      "                <template\n" +
      '                  v-if="item.children != null && item.children.length > 0"\n' +
      "                >\n" +
      "                  has {{ item.children.length }} children\n" +
      "                </template>\n" +
      "              </template>\n" +
      "            </v-draggable-treeview>",
    items: [
      {
        id: 1,
        name: "Central League",
        children: [
          { id: 101, name: "Dragons" },
          { id: 102, name: "Tigers" }
        ]
      },
      {
        id: 2,
        name: "Pacific League",
        children: [
          {
            id: 201,
            name: "Lions",
            children: [
              { id: 203, name: "Lions Minor" },
              {
                id: 204,
                name: "Lions third",
                children: [{ id: 2041, name: "Lions Minor Second" }]
              }
            ]
          }
        ]
      }
    ]
  })
});
</script>
