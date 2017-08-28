import "./util/browser.env";
import User from "../src/user";
import UserAttr from "../src/user/attr";
import * as sinon from "sinon";
import * as assert from "power-assert";

interface Schema {
  count: number;
}

class TestAttr extends UserAttr<Schema>{
  name = "test-attr";
  value = {
    count: 0
  };

  init(){
    this.set({
      count: 1
    });
  }
}

describe("User", () => {
  it("create new user instance", () => {
    const user = new User();
    assert(user);
  });

  describe("set attrs value", () => {
    it("passes", () => {
      const user = new User();
      const attr = {
        key : "value1"
      };
      const attrs = {
        attrName : attr
      };
      user.setAttrs(attrs);
      assert.deepEqual(user.attrs.attrName, attr);
    });

    it("set callback for when attributes changed", () => {
      const user = new User();
      const callback = sinon.spy();
      user.onChange(callback);
      user.setAttrs({});
      assert(callback.called);
    });

    it("set user attributes without no exec callback", () => {
      const user = new User();
      const callback = sinon.spy();
      user.onChange(callback);
      user.setAttrs({}, true);
      assert(!callback.called);
    });
  });

  describe("build an attr from arguments", () => {
    it("build with a default value", () => {
      const user = new User();
      const attr = {
        key: "value"
      };
      user.import("attrName", attr);
      assert.deepEqual(user.attrs.attrName, attr);
    });

    it("build with an init method", () => {
      const user = new User();
      const attr = { key : "value" };
      const load = function(this:UserAttr<any>){
        this.set(attr);
      };
      user.import("attrName", {}, load);
      assert.deepEqual(user.attrs.attrName, attr);
    });
  });

  it("loads attribute data when use", () => {
    const user = new User();
    const attr = new TestAttr();
    user.use(attr);
    user.onChange((attrs:any) => {
      assert(attrs["test-attr"]);
    });
  });
});