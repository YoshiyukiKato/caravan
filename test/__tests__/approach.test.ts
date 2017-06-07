import {Approaches, Approach} from "../../src/ts/approach";
import User from "../../src/ts/user";
import TestAPI from "./fixture/testapi";

const testapi = new TestAPI();

describe("Approach", () => {
  describe("Approach クラス", () => {
    var approach;
    test("Approachインスタンスの作成", () => {
      const config = {
        id : "test",
        src : "/src/test"
      };
      approach = new Approach(config);
      expect(approach);
    });
  
    test("renderメソッドの設定", () => {
      const render = (user:User) => Promise.resolve(true);
      approach.setRender(render);
      expect(approach.render).toEqual(render);
    });

    test("renderメソッドの実行", () => {
      approach.render()
      .then((result) => {
        expect(result).toBe(true);
      }).catch((err) => {
        throw err;
      });
    });

    describe("Approachのスクリプトの読み込み", () => {
      test("スクリプトを読み込む(1回目)", () => {
        const result = approach.loadScript()
        expect(result).toBe(true);
      });
      
      test("スクリプトを読み込む(2回目)", () => {
        const result = approach.loadScript()
        expect(result).toBe(false);
      });
    });
  });
 

  describe("Approaches クラス", () => {
    test("Approachesインスタンスの作成", () => {
      const approaches = new Approaches(testapi);
      expect(approaches);
      expect(window.__import_gizmo_item__);
    });
    
    describe("Approachインスタンスの管理", () => {
      let approaches, approach;
      test("Approachインスタンスの作成", () => {
        approaches = new Approaches(testapi);
        const config = {
          id : "test",
          src : "/src/test"
        };
        approach = approaches.create(config);
        expect(approach).toBeInstanceOf(Approach);
      });

      test("全Approachインスタンスの取得", () => {
        const results = approaches.all();
        expect(results).toEqual([approach]);
      });

      test("個別Approachインスタンスの取得", () => {
        const result = approaches.find("test");
        expect(result).toEqual(approach);
      });
    });
  });
 });