import App from "../src/app";
import * as assert from "power-assert";

describe("app", () => {
  context("prod mode", () => {
    let window:any = {};
    window.__import_view_component__ = null;
    window.__import_user_attr__ = null;
    window.__import_user_attrs_value__ = null;
    global.window = window;
    const app = new App("prod");
    it("does not exist __import_view_component__", () => {
      assert(!window.__import_view_component__);
    });

    it("does not exist __import_user_attr__", () => {
      assert(!window.__import_user_attr__);
    });

    it("does not exist __import_user_attrs_value__", () => {
      assert(!window.__import_user_attrs_value__);
    });
  });
  
  context("dev mode", () => {
    let window:any = {};
    window.__import_view_component__ = null;
    window.__import_user_attr__ = null;
    window.__import_user_attrs_value__ = null;
    global.window = window;
    const app = new App();
    describe("__import_view_component__", () => {
      it("is alias of app.view.import", () => {
        app.__import_view_component__("test", ()=>{});
        assert(app.view.components[0].id === "dev-test");
      });
      it("exists __import_view_component__ in window", () => {
        assert(window.__import_view_component__);
      });
    });
    
    describe("__import_user_attr__", () => {
      it("is alias of app.user.import", () => {
        const attr = { key : "value" };
        app.__import_user_attr__("test", attr);
        assert.deepEqual(app.user.attrs["dev-test"], attr);
      });
      it("exists __import_user_attr__", () => {
        assert(window.__import_user_attr__);
      });
    });
    
    describe("__import_user_attrs_value__", () => {
      it("is alias of app.user.setAttrs", () => {
        const attr = { key : "value" };
        const attrs = { attr : attr };
        app.__import_user_attrs_value__(attrs);
        assert.deepEqual(app.user.attrs.attr, attr);
      });
      it("exists __import_user_attrs_value__", () => {
        assert(window.__import_user_attrs_value__);
      });
    });
  });
});