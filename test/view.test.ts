import "./util/browser.env";
import * as assert from "power-assert";
import * as sinon from "sinon";
import View from "../src/view";
import Component from "../src/view/component";
import Filter from "../src/view/filter";

class TestComponent extends Component{
  id = "test";
  render(){}
}

class TestFilter extends Filter{
  componentId = "test";
  validate(userAttrs:{isTarget:boolean}):boolean{
    return userAttrs.isTarget;
  }
}

class TestFilterForAll extends Filter{
  componentId = "*";
  validate(userAttrs:{isTarget:boolean}):boolean{
    return userAttrs.isTarget;
  }
}

describe("view", () => {
  describe("View", () => {
    it("create new item", () => {
      const view = new View();
      assert(view);
    });

    describe("use", () => {
      it("add a component to a list of them", () => {
        const view = new View();
        const callback = sinon.spy();
        const component = new Component("test", callback);
        view.use(component);
        assert(view.components[0].id === "test");
        assert(callback.called);
      });
    });
    
    describe("import", () => {
      it("build component from id and callback", () => {
        const view = new View();
        view.import("test", () => {});
        assert(view.components[0].id === "test");
      });
    });
    
    describe("useFilter", () => {
      context("a target component exists", () => {
        it("add filter for all components", () => {
          const view = new View();
          const component1 = new Component("test1", () => { });
          const component2 = new Component("test2", () => { });
          const filter = new TestFilterForAll();
          view.use(component1);
          view.use(component2);
          view.useFilter(filter);
          assert.deepEqual(filter, component1.filters[0]);
          assert.deepEqual(filter, component2.filters[0]);
        });

        it("add filter for certain component", () => {
          const view = new View();
          const target = new Component("test", () => { });
          const other = new Component("other", () => { });
          const filter = new TestFilter();
          view.use(target);
          view.use(other);
          view.useFilter(filter);
          assert.deepEqual(filter, target.filters[0]);
          assert(other.filters.length === 0);
        });
      });

      context("a target components does not exist", () => {
        it("applies a filter when a target component added", () => {
          const view = new View();
          const filter = new TestFilter();
          const filter4all = new TestFilterForAll();
          view.useFilter(filter);
          view.useFilter(filter4all);
          const target = new Component("test", () => { });
          const other = new Component("other", () => { });
          view.use(target);
          view.use(other);
          assert.deepEqual(filter, target.filters[0]);
          assert.deepEqual(filter4all, target.filters[1]);
          assert.deepEqual(filter4all, other.filters[0]);
        });
      });
    });

    describe("render", () => {
      const view = new View();
      const callback1 = sinon.spy();
      const callback2 = sinon.spy();
      const component1 = new Component("test1", callback1);
      const component2 = new Component("test2", callback2);
      view.use(component1);
      view.use(component2);
      return view.render({}).then(() => {
        assert(callback1.called);
        assert(callback2.called);
      });
    });
  });
  
  describe("Component", () => {
    it("create new item", () => {
      const component = new TestComponent();
      assert(component);
    });

    it("create new item dynamically", () => {
      const component = new Component("test", (userAttrs:any) => {});
      assert(component);
    });

    describe("useFilter", () => {
      it("add new filter", () => {
        const component = new TestComponent();
        const filter = new TestFilter();
        component.useFilter(filter);
        assert(component);
      });
    });

    describe("_render", () => {
      context("error in a render method of a component", () => {
        it("does not throw it", () => {
          const callback = () => { throw new Error("This is error for Test. No problem ;)"); };
          const component = new Component("test", callback);
          const userAttrs = {};
          return component._render(userAttrs)
            .then(() => {
              assert(true, "OK");
            })
            .catch(() => {
              assert(false, "Unexpected catch");
            })
        });
      });

      context("without filter", () => {
        it("calls render for any user attributes", () => {
          const callback = sinon.spy();
          const component = new Component("test", callback);
          const userAttrs = {};
          return component._render(userAttrs)
            .then(() => {
              assert(callback.called);
            });
        });
      });

      context("with filter", () => {
        const filter = new TestFilter();

        it("calls render for user satisfied with a condition", () => {
          const callback = sinon.spy();
          const component = new Component("test", callback);
          component.useFilter(filter);
          const userAttrs = {
            isTarget: true
          };

          return component._render(userAttrs)
            .then(() => {
              assert(callback.called);
            });
        });

        it("does not call render for user not satisfied with a condition", () => {
          const callback = sinon.spy();
          const component = new Component("test", callback);
          component.useFilter(filter);
          const userAttrs = {
            isTarget: false
          };

          return component._render(userAttrs)
            .then(() => {
              assert(!callback.called);
            });
        });
      });
    });
  });

  describe("Filter", () => {
    it("create new item", () => {
      const filter = new TestFilter();
      assert(filter);
    });
  });
});