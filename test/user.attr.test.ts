import "./util/browser.env";
import UserAttr from "../src/user/attr";
import * as sinon from "sinon";
import * as assert from "power-assert";


interface Schema {
  count: number;
}

class TestAttr extends UserAttr<Schema>{
  id = "test";
  value = {
    count: 0
  };
}

describe("UserAttr", () => {
  describe("create new instance", () => {
    context("new from class definition", () => {
      it("passes", () => {
        const attr = new TestAttr();
        assert(attr);
      });
    });
    
    context("new with paramters", () => {
      it("passes", () => {
        const attr = new UserAttr<any>("test", {});
        assert(attr);
      });
    });
  });

  describe("uptate value", () => {
    it("set next value", () => {
      const attr = new TestAttr();
      attr.set({ count: 1 });
      assert(attr.value.count === 1);
    });

    describe("set callback for when attribute updated", () => {
      it("calles when value updated", () => {
        const attr = new TestAttr();
        const callback = sinon.spy();
        attr.onChange(callback);
        attr.set({});
        assert(callback.called);
      });

      it("receive latest attribute value", () => {
        const attr = new TestAttr();
        attr.onChange((attrs: any) => {
          const value = attrs["test"];
          assert(value.count === 2);
        });
        attr.set({ count: 2 });
      });

      it("update attribute value without exec callback", () => {
        const attr = new TestAttr();
        const callback = sinon.spy();
        attr.onChange(callback);
        attr.set({}, true);
        assert(!callback.called);
      });
    });
  });
});