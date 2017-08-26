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
  validate(userAttrs:{isTarget:boolean}):boolean{
    return userAttrs.isTarget;
  }
}

describe("View", () => {
  describe("#use : add a component to a list of them", () => {
    it("", () => {
      const view = new View();
      const callback = sinon.spy();
      const component = new Component("test", callback);
      view.use(component);
      assert(view.components[0].id === "test");
      assert(callback.called);
    });
  });

  describe("#import : build a component from id and render function", () => {
    it("adds the component to the list of them", () => {
      const view = new View();
      view.import("test", () => { });
      assert(view.components[0].id === "test");
    });
  });

  describe("#useFilter : register a filter", () => {
    context("the target component exists", () => {
      context("a filter for all components", () => {
        it("is applied to all components", () => {
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
      });

      context("a filter for a target component", () => {
        const filter = new TestFilter();

        it("is used by the target component", () => {
          const view = new View();
          const target = new Component("test", () => { });
          view.use(target);
          view.useFilter(filter);
          assert.deepEqual(filter, target.filters[0]);
        });
        it("is not used by another component", () => {
          const view = new View();
          const other = new Component("other", () => { });
          view.use(other);
          view.useFilter(filter);
          assert(other.filters.length === 0);
        });
      });
    });

    context("components does not exist", () => {
      it("is applied when the target component added", () => {
        const view = new View();
        const filter = new TestFilter();
        view.useFilter(filter);
        const target = new Component("test", () => {});
        view.use(target);
        assert.deepEqual(filter, target.filters[0]);
      });
      
      it("is not applied when a not target component added", () => {
        const view = new View();
        const filter = new TestFilter();
        view.useFilter(filter);
        const other = new Component("other", () => {});
        view.use(other);
        assert(!other.filters[0]);
      });
    });
  });

  describe("#render", () => {
    it("calls render methods of all components", () => {
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
});