import "./util/browser.env";
import User from "../src/user";
import UserAttr from "../src/user/attr";
import * as sinon from "sinon";
import * as assert from "power-assert";


describe("user", () => {
  var user;
  it("create new user instance", () => {
    user = new User();
    assert(user);
  });

  describe("UserAttr", () => {
    interface Schema {
      count : number;
    }

    class TestAttr extends UserAttr<Schema>{
      name = "test";
      value = {
        count : 0
      };
    }

    var attr;
    it("create new attribute", () => {
      attr = new TestAttr();
      assert(attr);
    });

    it("update attribute value", () => {
      attr.set({ count : 1 });
      assert(attr.value.count === 1);
    });

    it("set callback for when attribute updated", () => {
      const callback = sinon.spy();
      attr.onChange(callback);
      attr.set({});
      assert(callback.called);
    });

    it("receive latest attribute value", () => {
      attr.onChange((attrs:any) => {
        const value = attrs["test"];
        assert(value.count === 2);
      });
      attr.set({ count : 2 });
    });
  });

  interface Schema {
    count : number;
  }

  class TestAttr extends UserAttr<Schema>{
    name = "test-attr";
    value = {
      count : 0
    };
    
    load(){
      return {
        count : 1
      }
    }
  }

  it("loads attribute data when use", () => {
    const attr = new TestAttr();
    user.use(attr);
  });

});