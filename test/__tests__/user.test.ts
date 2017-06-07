import User from "../../src/ts/user";
import TestAPI from "./fixture/testapi";

const testapi = new TestAPI();

describe("user", () => {
  describe("Userインスタンスの作成", () => {
    const user = new User(testapi);
    expect(user);
  });
});