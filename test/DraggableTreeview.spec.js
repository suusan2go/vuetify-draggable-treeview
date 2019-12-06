import Vuetify from "vuetify";
import { mount } from "@vue/test-utils";
import DraggableTreeview from "../src/DraggableTreeview.vue";

describe("VueDraggableTreeview", () => {
  test("renders correctly", () => {
    const wrapper = mount(DraggableTreeview, {
      vuetify: new Vuetify(),
      propsData: {
        value: [
          {
            id: 1,
            name: "test",
            children: [{ id: 101, name: "test-children" }]
          }
        ]
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
