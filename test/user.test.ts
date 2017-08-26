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

  it("set user attributes", () => {
    const attr = {
      key : "value2"
    };
    const attrs = {
      attrName : attr
    };
    user.setAttrs(attrs);
    assert.deepEqual(user.attrs.attrName, attr);
  });

  it("set a user attribute", () => {
    const attr = {
      key : "value2"
    };
    user.import("attrName", attr);
    assert.deepEqual(user.attrs.attrName, attr);
  });

  it("loads attribute data when use", () => {
    const attr = new TestAttr();
    user.use(attr);
    user.onChange((attrs:any) => {
      assert(attrs["test-attr"]);
    });
  });
});