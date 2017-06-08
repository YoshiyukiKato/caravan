import "./util/browser.env";
import App from "../src/app";
import TestAPI from "./fixture/testapi";
import * as assert from "power-assert";

const testapi = new TestAPI();

describe("app", () => {
  var app;
  it("Appインスタンスの作成", () => {
    app = new App(testapi);
    assert(app);
    assert(app.user);
    assert(app.approaches);
    assert(app.isInitialized === false);
  });
  
  it("init（1回目）", () => {
    const cbs = app.approaches.all().map((approach) => {
      const cb = sinon.spy();
      approach.setRender(cb);
      return cb;
    });
    
    return app.init().then((result) => {
      assert(app.isInitialized === true);
      const isAllCbCalled = cbs.reduce((acc, cb) => acc && cb.called, true);
      assert(isAllCbCalled === true);
    });
  });

  it("init（2回目）は実行されない", () => {
    const cbs = app.approaches.all().map((approach) => {
      const cb = sinon.spy();
      approach.setRender(cb);
      return cb;
    });

    return app.init().then((result) => {
      assert(app.isInitialized === true);
      const isAllCbNotCalled = cbs.reduce((acc, cb) => acc && !cb.called, true);
      assert(isAllCbNotCalled === true);
    })
    .catch((err) => {
      throw err;
    });
  });
});