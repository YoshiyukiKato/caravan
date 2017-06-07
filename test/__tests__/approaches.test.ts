import Approaches from "../../src/ts/approaches";
import TestAPI from "./fixture/testapi";

const testapi = new TestAPI();

describe("approaches", () => {
  test("Approachesインスタンスの作成", () => {
    const approaches = new Approaches(testapi);
    expect(approaches);
  });
});