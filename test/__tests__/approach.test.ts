import "./browser.env";
import {Approaches, Approach} from "../../src/ts/approach";
import User from "../../src/ts/user";
import TestAPI from "./fixture/testapi";
import * as assert from "power-assert";

const testapi = new TestAPI();

describe("approach", () => {
  describe("Approach クラス", () => {
    var approach;
    it("Approachインスタンスの作成", () => {
      const config = {
        id : "test",
        src : "/src/test"
      };
      approach = new Approach(config);
      assert(approach);
    });
    
    it("未設定のrenderメソッドを呼ぶとnullが返ってくる", () => {
      approach.render().then((result) => {
        assert(result === null);
      });
    });

    it("renderメソッドの設定", () => {
      const render = (user:User) => Promise.resolve(true);
      approach.setRender(render);
      assert(approach.isRenderSetted === true);
    });

    it("renderメソッドの実行", () => {
      approach.render()
      .then((result) => {
        assert(result === true);
      }).catch((err) => {
        throw err;
      });
    });

    describe("Approachのスクリプトの読み込み", () => {
      it("スクリプトを読み込む(1回目)", () => {
        const result = approach.loadScript();
        assert(result === true);
      });
      
      it("スクリプトを読み込む(2回目)", () => {
        const result = approach.loadScript();
        assert(result === false);
      });
    });
  });
 

  describe("Approaches クラス", () => {
    it("Approachesインスタンスの作成", () => {
      const approaches = new Approaches(testapi);
      assert(approaches);
      assert(window.__import_gizmo_item__);
    });
    
    it("ApproachesのデータをAPI経由で取得して、各インスタンスのloadScriptを呼び出す", () => {
      const approaches = new Approaches(testapi);
      approaches.init().then(() => {
        const isAllLoaded = approaches.all().reduce((acc, approach) => acc && approach.isScriptLoaded);
        assert(isAllLoaded === true);
      })
      .catch((err) => {
        throw err;
      });
    });

    describe("Approachインスタンスの管理", () => {
      let approaches, approach;
      it("Approachインスタンスの作成", () => {
        approaches = new Approaches(testapi);
        const config = {
          id : "test",
          src : "/src/test"
        };
        approach = approaches.create(config);
        assert(approach instanceof Approach === true);
      });

      it("全Approachインスタンスの取得", () => {
        const results = approaches.all();
        assert.deepEqual(results, [approach]);
      });

      it("個別Approachインスタンスの取得", () => {
        const result = approaches.find("test");
        assert.deepEqual(result, approach);
      });
      
      it("Approachインスタンスに、renderメソッドをインポート", () => {
        const render = (user:User) => Promise.resolve(true);
        approaches.import("test", render);
        return approaches.find("test").render()
        .then((result) => {
          assert(result === true);
        })
        .catch((err) => {
          throw err;
        });
      });

      it("存在しないApproachインスタンスに、renderメソッドをインポートしようとしてもエラーにはならない", () => {
        const render = (user:User) => Promise.resolve(true);
        approaches.import("not-exist", render);
        assert(true);
      });

      it("全Approachインスタンスのrenderメソッド呼び出し", () => {
        return approaches.renderAll()
        .then((result) => {
          assert.deepEqual(result, [true]);
        })
        .catch((err) => {
          throw err;
        });
      });
    });
  });
 });