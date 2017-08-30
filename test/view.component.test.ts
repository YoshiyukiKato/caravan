import "./util/browser.env";
import * as assert from "power-assert";
import * as sinon from "sinon";
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

describe("Component", () => {
  describe("render", () => {
    it("passes", () => {
      const component = new TestComponent();
      assert(component);
    });
  });

  describe("#useFilter : register a filter", () => {
    it("add new filter", () => {
      const component = new TestComponent();
      const filter = new TestFilter();
      component.useFilter(filter);
      assert.deepEqual(component.filters[0], filter);
    });
  });

  describe("#render", () => {
    it("default render method throws error", () => {
      assert.throws(() => {
        class TestComponent extends Component{
          id = "test"
        };
        const component = new TestComponent();
        component.render({});
      });
    });
    
    context("without filters", () => {
      it("calls render for any user attributes", () => {
        const callback = sinon.spy();
        class TestComponent extends Component{
          id = "test";
          render(){
            callback();
          }
        }
        const component = new TestComponent();
        const userAttrs = {};
        return component._render(userAttrs)
          .then(() => {
            assert(callback.called);
          });
      });
    });

    context("with a filter", () => {
      const filter = new TestFilter();
      it("calls render with user attributes satisfied with the filter's condition", () => {
        const callback = sinon.spy();
        class TestComponent extends Component{
          id = "test";
          render(){
            callback();
          }
        }
        const component = new TestComponent();
        component.useFilter(filter);
        const userAttrs = {
          isTarget: true
        };

        return component._render(userAttrs)
          .then(() => {
            assert(callback.called);
          });
      });

      it("does not call render with user attributes not satisfied with the filter's condition", () => {
        const callback = sinon.spy();
        class TestComponent extends Component{
          id = "test";
          render(){
            callback();
          }
        }
        const component = new TestComponent();
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

    context("error orrured in a render method of a component", () => {
      it("does not throw it", () => {
        class TestComponent extends Component{
          id = "test";
          render(){
            throw new Error("This is error for Test. No problem ;)");
          }
        }
        const component = new TestComponent();
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
  });
});