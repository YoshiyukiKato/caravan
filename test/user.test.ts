import "./util/browser.env";
import User from "../src/user";
import TestAPI from "./fixture/testapi";
import * as assert from "power-assert";

const testapi = new TestAPI();

describe("user", () => {
  var user;
  it("Userインスタンスの作成", () => {
    user = new User(testapi);
    assert.deepEqual(user.state, { isInitialized : false });
    assert.deepEqual(user.props, {});
    assert.deepEqual(user.handleChangeStateFuncs, []);
  });

  it("stateが変化したときのコールバックを設定", () => {
    const callback = (nextState) => { return true; };
    user.onChangeState(callback);
    assert.deepEqual(user.handleChangeStateFuncs, [callback]);
  });

  it("stateを変化させる", () => {
    const callback = sinon.spy();
    user.onChangeState(callback);
    user.setState({ changed : true })
    .then(() => {
      assert(callback.called === true);
    });
  });

  it("API経由でユーザのプロパティを取得", () => {
    user.init()
    .then(() => {
      assert.notDeepEqual(user.props, {});
      assert(user.state.isInitialized === true);
    });
  });
});