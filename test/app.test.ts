import "./util/browser.env";
import App from "../src/app";
import * as assert from "power-assert";

describe("app", () => {
  it("create new app instance", () => {
    const app = new App();
    assert(app);
  });
});