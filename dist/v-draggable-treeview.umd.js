(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('vuedraggable')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue', 'vuedraggable'], factory) :
    (global = global || self, factory(global.VuetifyDraggableTreeview = {}, global.Vue, global.Draggable));
}(this, (function (exports, Vue, Draggable) { 'use strict';

    Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;
    Draggable = Draggable && Object.prototype.hasOwnProperty.call(Draggable, 'default') ? Draggable['default'] : Draggable;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var script = Vue.extend({
        name: "TreeviewNode",
        components: {
            Draggable: Draggable,
        },
        props: {
            level: {
                type: Number,
                default: 0,
            },
            value: {
                type: Object,
                default: function () { return ({
                    id: 0,
                    parentId: null,
                    name: "",
                    isSelected: false,
                    isIndeterminate: false,
                    children: [],
                }); },
            },
            root: {
                type: Boolean,
                default: function () { return false; },
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
        data: function () {
            return {
                open: false,
                localValue: __assign({}, this.value),
            };
        },
        computed: {
            hasChildren: function () {
                return this.value.children != null && this.value.children.length > 0;
            },
            isDark: function () {
                return this.$vuetify.theme.isDark;
            },
            appendLevel: function () {
                return this.level + (this.hasChildren ? 0 : 1);
            },
        },
        watch: {
            value: function (value) {
                this.localValue = __assign({}, value);
            },
        },
        methods: {
            updateValue: function (value) {
                this.localValue.children = __spread(value);
                this.$emit("input", this.localValue);
            },
            changeValue: function (event) {
                this.$emit("changeValue", event);
            },
            updateChildValue: function (value) {
                var index = this.localValue.children.findIndex(function (c) { return c.id === value.id; });
                this.$set(this.localValue.children, index, value);
                this.$emit("input", this.localValue);
            },
            checkSelect: function (value) {
                this.localValue.isSelected = value;
                this.localValue.isIndeterminate = false;
                if (this.hasChildren) {
                    this.setChildren(this.localValue.children, value);
                }
                this.$emit("changeSelect", this.localValue);
            },
            setChildren: function (children, selected) {
                for (var index = 0; index < children.length; index++) {
                    children[index].isSelected = selected;
                    children[index].isIndeterminate = false;
                    if (children[index].children.length > 0) {
                        this.setChildren(children[index].children, selected);
                    }
                    this.$set(children, index, children[index]);
                }
            },
            checkIndeterminate: function (children) {
                var unique = this.getCheck(children);
                return unique.includes(true);
            },
            getCheck: function (children) {
                return __spread(new Set(children.map(function (item) {
                    return !(!item.isSelected || typeof item.isSelected === "undefined") ||
                        item.isSelected ||
                        item.isIndeterminate;
                })));
            },
            changeSelectChild: function (value) {
                var index = this.localValue.children.findIndex(function (c) { return c.id === value.id; });
                this.$set(this.localValue.children, index, value);
                this.localValue.isIndeterminate = this.checkIndeterminate(this.localValue.children);
                this.$emit("changeSelect", this.localValue);
            },
        },
    });

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        const options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        let hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                const originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                const existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    /* script */
    const __vue_script__ = script;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        {
          class:
            "v-treeview-node v-treeview-node--click " +
            (_vm.hasChildren ? "" : "v-treeview-node--leaf")
        },
        [
          _c(
            "div",
            {
              staticClass: "v-treeview-node__root",
              on: {
                click: function($event) {
                  _vm.open = !_vm.open;
                }
              }
            },
            [
              _vm._l(_vm.appendLevel, function(index) {
                return _c("div", {
                  key: index,
                  staticClass: "v-treeview-node__level"
                })
              }),
              _vm._v(" "),
              _vm.hasChildren
                ? _c("i", {
                    staticClass:
                      "v-icon notranslate v-treeview-node__toggle v-icon--link mdi material-icons",
                    class: [
                      {
                        "v-treeview-node__toggle--open": _vm.open,
                        "theme--dark": _vm.isDark,
                        "theme--light": !_vm.isDark
                      },
                      _vm.expandIcon
                    ],
                    attrs: { role: "button" }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.selectable
                ? _c(
                    "button",
                    {
                      staticClass:
                        "v-icon notranslate v-treeview-node__checkbox v-icon--link theme--light mr-2",
                      class: {
                        "value.isSelected": "accent--text"
                      },
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          $event.stopPropagation();
                          return _vm.checkSelect(!_vm.value.isSelected)
                        }
                      }
                    },
                    [
                      _vm.value.isIndeterminate
                        ? _c(
                            "svg",
                            {
                              staticClass: "v-icon__svg",
                              attrs: {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                role: "img",
                                "aria-hidden": "true"
                              }
                            },
                            [
                              _c("path", {
                                attrs: {
                                  d:
                                    "M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z"
                                }
                              })
                            ]
                          )
                        : !_vm.value.isSelected
                        ? _c(
                            "svg",
                            {
                              staticClass: "v-icon__svg",
                              attrs: {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                role: "img",
                                "aria-hidden": "true"
                              }
                            },
                            [
                              _c("path", {
                                attrs: {
                                  d:
                                    "M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"
                                }
                              })
                            ]
                          )
                        : _c(
                            "svg",
                            {
                              staticClass: "v-icon__svg",
                              attrs: {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                role: "img",
                                "aria-hidden": "true"
                              }
                            },
                            [
                              _c("path", {
                                attrs: {
                                  d:
                                    "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z"
                                }
                              })
                            ]
                          )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm._t("prepend", null, null, { item: _vm.value, open: _vm.open }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "v-treeview-node__label" },
                [
                  _vm._t(
                    "label",
                    [_vm._v("\n        " + _vm._s(_vm.value.name) + "\n      ")],
                    null,
                    { item: _vm.value, open: _vm.open }
                  )
                ],
                2
              ),
              _vm._v(" "),
              _vm._t("append", null, null, { item: _vm.value })
            ],
            2
          ),
          _vm._v(" "),
          _vm.open
            ? _c(
                "div",
                {
                  staticClass:
                    "v-treeview-node__children v-treeview-node__children__draggable"
                },
                [
                  _c(
                    "draggable",
                    {
                      attrs: {
                        group: _vm.group,
                        value: _vm.value.children,
                        handle: _vm.handle,
                        "ghost-class": "ghost"
                      },
                      on: { input: _vm.updateValue, change: _vm.changeValue }
                    },
                    _vm._l(_vm.value.children, function(child) {
                      return _c("treeview-node", {
                        key: child.id,
                        attrs: {
                          group: _vm.group,
                          value: child,
                          level: _vm.level + 1,
                          "expand-icon": _vm.expandIcon,
                          selectable: _vm.selectable
                        },
                        on: {
                          input: _vm.updateChildValue,
                          changeValue: _vm.changeValue,
                          changeSelect: _vm.changeSelectChild
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "prepend",
                              fn: function(ref) {
                                var item = ref.item;
                                var open = ref.open;
                                return [
                                  _vm._t("prepend", null, null, {
                                    item: item,
                                    open: open
                                  })
                                ]
                              }
                            },
                            {
                              key: "label",
                              fn: function(ref) {
                                var item = ref.item;
                                var open = ref.open;
                                return [
                                  _vm._t("label", null, null, {
                                    item: item,
                                    open: open
                                  })
                                ]
                              }
                            },
                            {
                              key: "append",
                              fn: function(ref) {
                                var item = ref.item;
                                return [
                                  _vm._t("append", null, null, { item: item })
                                ]
                              }
                            }
                          ],
                          null,
                          true
                        )
                      })
                    }),
                    1
                  )
                ],
                1
              )
            : _vm._e()
        ]
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        undefined,
        undefined,
        undefined
      );

    var script$1 = Vue.extend({
        components: {
            draggable: Draggable,
            DraggableTreeViewNode: __vue_component__,
        },
        props: {
            value: {
                type: Array,
                default: function () {
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
                default: function () {
                    return [];
                },
            },
        },
        data: function () {
            return {
                selectedAll: false,
                indeterminateAll: false,
                localValue: __spread(this.value),
                localSelected: __spread(this.selected),
            };
        },
        computed: {
            themeClassName: function () {
                return this.$vuetify.theme.isDark ? "theme--dark" : "theme--light";
            },
        },
        watch: {
            value: function (value) {
                this.localValue = __spread(value);
                this.setSelect();
            },
        },
        methods: {
            updateValue: function (value) {
                this.localValue = value;
                this.updateInput();
            },
            changeValue: function (event) {
                this.$emit("change", event);
            },
            updateItem: function (itemValue) {
                var index = this.localValue.findIndex(function (v) { return v.id === itemValue.id; });
                this.$set(this.localValue, index, itemValue);
                this.updateInput();
            },
            changeSelectItem: function (itemValue) {
                var index = this.localValue.findIndex(function (v) { return v.id === itemValue.id; });
                this.$set(this.localValue, index, itemValue);
                this.updateInput();
            },
            updateInput: function () {
                this.$emit("input", this.localValue);
                this.setSelect();
            },
            setSelect: function () {
                this.localSelected = this.checkSelect(this.localValue);
                this.indeterminateAll = this.localSelected.length > 0;
                this.selectedAll = !!this.indeterminateAll;
                this.$emit("update:selected", this.localSelected);
            },
            checkSelect: function (items) {
                var array = [];
                for (var index = 0; index < items.length; index++) {
                    if (items[index].isSelected)
                        array.push(items[index]);
                    if (items[index].children.length > 0) {
                        var childArray = this.checkSelect(items[index].children);
                        if (childArray.length > 0)
                            array = array.concat(childArray);
                    }
                }
                return array;
            },
            clearCheckbox: function () {
                this.setCheckbox(this.localValue, false);
            },
            setCheckbox: function (items, value) {
                for (var index = 0; index < items.length; index++) {
                    items[index].isSelected = value;
                    items[index].isIndeterminate = false;
                    if (items[index].children.length > 0) {
                        this.setCheckbox(items[index].children, value);
                    }
                }
            },
            selectAll: function (value) {
                this.indeterminateAll = false;
                this.selectedAll = value;
                this.setCheckbox(this.localValue, value);
            }
        },
    });

    /* script */
    const __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        [
          _vm.header
            ? _c(
                "div",
                { staticClass: "d-flex align-center", style: { height: "48px" } },
                [
                  _c("div", { style: { padding: "0 96px 0 32px" } }, [
                    _vm.selectable && _vm.localValue.length > 0
                      ? _c(
                          "button",
                          {
                            staticClass:
                              "v-icon notranslate v-treeview-node__checkbox v-icon--link theme--light mr-2",
                            class: { "value.isSelected": "accent--text" },
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                $event.stopPropagation();
                                return _vm.selectAll(!_vm.selectedAll)
                              }
                            }
                          },
                          [
                            _vm.indeterminateAll
                              ? _c(
                                  "svg",
                                  {
                                    staticClass: "v-icon__svg",
                                    attrs: {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 24 24",
                                      role: "img",
                                      "aria-hidden": "true"
                                    }
                                  },
                                  [
                                    _c("path", {
                                      attrs: {
                                        d:
                                          "M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z"
                                      }
                                    })
                                  ]
                                )
                              : !_vm.selectedAll
                              ? _c(
                                  "svg",
                                  {
                                    staticClass: "v-icon__svg",
                                    attrs: {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 24 24",
                                      role: "img",
                                      "aria-hidden": "true"
                                    }
                                  },
                                  [
                                    _c("path", {
                                      attrs: {
                                        d:
                                          "M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"
                                      }
                                    })
                                  ]
                                )
                              : _c(
                                  "svg",
                                  {
                                    staticClass: "v-icon__svg",
                                    attrs: {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 24 24",
                                      role: "img",
                                      "aria-hidden": "true"
                                    }
                                  },
                                  [
                                    _c("path", {
                                      attrs: {
                                        d:
                                          "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z"
                                      }
                                    })
                                  ]
                                )
                          ]
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _vm._t("header")
                ],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "draggable",
            {
              staticClass: "v-treeview v-treeview-draggable",
              class: _vm.themeClassName,
              attrs: {
                value: _vm.localValue,
                group: _vm.group,
                handle: _vm.handle,
                "ghost-class": "ghost"
              },
              on: { input: _vm.updateValue, change: _vm.changeValue }
            },
            _vm._l(_vm.value, function(item) {
              return _c("draggable-tree-view-node", {
                key: item.id,
                attrs: {
                  group: _vm.group,
                  value: item,
                  "expand-icon": _vm.expandIcon,
                  selectable: _vm.selectable
                },
                on: {
                  input: _vm.updateItem,
                  changeValue: _vm.changeValue,
                  changeSelect: _vm.changeSelectItem,
                  setSelect: _vm.setSelect
                },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "prepend",
                      fn: function(ref) {
                        var item = ref.item;
                        var open = ref.open;
                        return [
                          _vm._t("prepend", null, null, { item: item, open: open })
                        ]
                      }
                    },
                    {
                      key: "label",
                      fn: function(ref) {
                        var item = ref.item;
                        var open = ref.open;
                        return [
                          _vm._t("label", null, null, { item: item, open: open })
                        ]
                      }
                    },
                    {
                      key: "append",
                      fn: function(ref) {
                        var item = ref.item;
                        var open = ref.open;
                        return [
                          _vm._t("append", null, null, { item: item, open: open })
                        ]
                      }
                    }
                  ],
                  null,
                  true
                )
              })
            }),
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

      /* style */
      const __vue_inject_styles__$1 = undefined;
      /* scoped */
      const __vue_scope_id__$1 = undefined;
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        undefined,
        undefined,
        undefined
      );

    const install = (Vue) => {
      if (install.installed) return;
      install.installed = true;
      Vue.component("VDraggableTreeview", __vue_component__$1);
    };

    const plugin = {
      install,
    };

    let GlobalVue = null;
    if (typeof window !== "undefined") {
      GlobalVue = window.Vue;
    } else if (typeof global !== "undefined") {
      GlobalVue = global.Vue;
    }
    if (GlobalVue) {
      GlobalVue.use(plugin);
    }

    __vue_component__$1.install = install;

    exports.default = __vue_component__$1;
    exports.install = install;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
