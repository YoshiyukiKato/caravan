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
        const component = new Component("test", () => {});
        view.use(component);
        assert(view.components[0].id === "test");
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
      it("add filter for all components", () => {
        const view = new View();
        const component1 = new Component("test1", () => {});
        const component2 = new Component("test2", () => {});
        const filter = new TestFilterForAll();
        view.use(component1);
        view.use(component2);
        view.useFilter(filter);
        assert.deepEqual(filter, component1.filters[0]);
        assert.deepEqual(filter, component2.filters[0]);
      });
      
      it("add filter for certain component", () => {
        const view = new View();
        const target = new Component("test", () => {});
        const other = new Component("other", () => {});
        const filter = new TestFilter();
        view.use(target);
        view.use(other);
        view.useFilter(filter);
        assert.deepEqual(filter, target.filters[0]);
        assert(other.filters.length === 0);
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
      context("without filter", () => {
        it("calls render for any user attributes", () => {
          const callback = sinon.spy();
          const component = new Component("test", callback);
          const userAttrs = {};
          component._render(userAttrs);
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