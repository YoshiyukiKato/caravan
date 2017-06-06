import * as passert from "power-assert";

describe("jest test", () => {
  it("hello jest", () => {
    const message = "hello jest";
    passert(message === "hello jest");
  });
});