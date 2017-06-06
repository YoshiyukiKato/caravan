import * as Promise from "bluebird";
import "./browser.env";
import * as mocha from "mocha";
import * as assert from "power-assert";
import {API,util} from "../../src/ts/api";

function createFakeServer(url, responseObj){
  const server = global.sinon.fakeServer.create();
  server.respondWith("GET", url,
    [200, { "Content-Type": "application/json" }, JSON.stringify(responseObj)]);
  return server;
}

describe("api", () => {
  describe("API", () => {
    it("APIクライアントの定義", () => {
      class TestAPI extends API{
        user = {
          load: () => { return Promise.resolve({ name : "test" }); }
        }

        /*gizmoItem = {
          load: () => { return Promise.resolve({items:[{ id:"test", src:"/src/test" }]}); }
        }*/
      }
      
      const testApi = new TestAPI();
      assert(testApi);
    });
  });
  
  describe("util", () => {
    describe("cbo", () => {
    const endpoint = "cbo";
      it("CBOクライアントの生成", () => {
        const cbo = new util.CBO(endpoint);
        assert(cbo);
      });

      it("正しいデータが返ってきたとき", () => {
        const endpoint = "/cbo";
        const visitorId = "test";
        const url =`${endpoint}?visitor_id=${visitorId}`;
        const response = {
          status : true,
          property : {
            age : "20",
            sex : "1",
            ann_income : "3",
            has_rid : "1"
          }
        }

        const server = createFakeServer(url, response);
        const cbo = new util.CBO(endpoint);
        cbo.load(visitorId)
        .then((property) => {
          assert(property);
        })
        .catch((err) => {
          throw err;
        });
        server.respond();
      });

      it("データがなかったとき", () => {
        const endpoint = "/cbo";
        const visitorId = "test";
        const url =`${endpoint}?visitor_id=${visitorId}`;
        const response = {
          status : false,
          property : {}
        }

        const server = createFakeServer(url, response);
        const cbo = new util.CBO(endpoint);
        cbo.load(visitorId)
        .then((property) => {
          throw new Error("エラーになるべき")
        })
        .catch((err) => {
          assert(err);
        });
        server.respond();
      });
    });
  });
});