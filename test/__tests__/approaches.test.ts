import Approaches from "../../src/ts/approaches";
import TestAPI from "./fixture/testapi";

const testapi = new TestAPI();

describe("approaches", () => {
  test("Approachesインスタンスの作成", () => {
    const approaches = new Approaches(testapi);
    expect(approaches);
  });

  test("#create 新規Approachの作成", () => {
    const config = {
      id : "test",
      src : "/src/test"
    };
    
  });
});