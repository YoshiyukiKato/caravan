import "./util/browser.env";
import * as assert from "power-assert";
import * as sinon from "sinon";
import View from "../src/view";
import Component from "../src/view/component";
import Filter from "../src/view/filter";

class TestComponent extends Component{
  id : "test";
  render(){}
}

class TestFilter extends Filter{
  componentId:"test";
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
    
    describe("use", () => {});
    describe("import", () => {});
    describe("useFilter", () => {});
    describe("render", () => {});
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