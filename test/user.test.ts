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

  load() {
    this.set({
      count: 1
    });
  }
}

describe("User", () => {
  var user;
  it("create new user instance", () => {
    user = new User();
    assert(user);
  });

  describe("set user attributes", () => {
    it("set user attributes", () => {
      const attr = {
        key : "value1"
      };
      const attrs = {
        attrName : attr
      };
      user.setAttrs(attrs);
      assert.deepEqual(user.attrs.attrName, attr);
    });

    it("set a user attribute", () => {
      const attr = {
        key: "value2"
      };
      user.import("attrName", attr);
      assert.deepEqual(user.attrs.attrName, attr);
    });

    it("set callback for when attributes changed", () => {
      const callback = sinon.spy();
      user.onChange(callback);
      user.setAttrs({});
      assert(callback.called);
    });

    it("set user attributes without no exec callback", () => {
      const callback = sinon.spy();
      user.onChange(callback);
      user.setAttrs({}, true);
      assert(!callback.called);
    });
  });

  it("loads attribute data when use", () => {
    const attr = new TestAttr();
    user.use(attr);
    user.onChange((attrs:any) => {
      assert(attrs["test-attr"]);
    });
  });
});