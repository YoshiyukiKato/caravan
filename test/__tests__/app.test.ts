import App from "../../src/ts/app";
import TestAPI from "./fixture/testapi";

const testapi = new TestAPI();

describe("app", () => {
  test("Appインスタンスの作成", () => {
    const app = new App(testapi);
    expect(app);
  });
});