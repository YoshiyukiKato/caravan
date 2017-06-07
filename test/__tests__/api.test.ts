import * as Promise from "bluebird";
import {API,util} from "../../src/ts/api";

import "./browser.env";
import * as sinon from "sinon";
sinon.useFakeXMLHttpRequest();
function createFakeServer(url, responseObj, method="GET"){
  const server = sinon.fakeServer.create();
  server.respondWith(method, url,
    [200, { "Content-Type": "application/json" }, JSON.stringify(responseObj)]);
  return server;
}

describe("api", () => {
  describe("API", () => {
    test("APIクライアントの定義", () => {
      class TestAPI extends API{
        user = {
          load: () => { return Promise.resolve({ name : "test" }); }
        }
        
        approach = {
          load: () => { return Promise.resolve({items:[{ id:"test", src:"/src/test" }]}); }
        }
      }
      
      const testApi = new TestAPI();
      expect(testApi);
    });
  });
  
  describe("util", () => {
    describe("http-client", () => {
      test("getする", () => {
        const endpoint = "/get";
        const response = { message : "ok" };
        const server = createFakeServer(endpoint, response);
        setTimeout(() => { server.respond() }, 10);
        
        return util.http.get(endpoint)
        .then((res) => {
          expect(res).toEqual(response);
        }).catch((err) => {
          throw err;
        });
      });
      
      test("postする", () => {
        const endpoint = "/post";
        const body = { message : "is ok?" };
        const response = { message : "ok" };
        const server = createFakeServer(endpoint, response, "POST");
        setTimeout(() => { server.respond() },10);
        return util.http.post(endpoint, body)
        .then((res) => {
          expect(res).toEqual(response);
        }).catch((err) => {
          throw err;
        });
      });
    });
    
    describe("cbo", () => {
      const endpoint = "/cbo";
      const visitorId = "test";
      let cbo;
    
      test("CBOクライアントの生成", () => {
        cbo = new util.CBO(endpoint);
        expect(cbo);
      });

      test("正しいデータが返ってきたとき", () => {
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
        setTimeout(() => { server.respond() },10);
        return cbo.load(visitorId)
        .then((property) => {
          expect(property).toEqual(response.property);
        })
        .catch((err) => {
          throw err;
        });
      });

      test("visitor idがなかったとき", () => {
        const url =`${endpoint}?visitor_id=${visitorId}`;
        const response = {};
        const server = createFakeServer(url, response);
        setTimeout(() => { server.respond() },10);
        return cbo.load(null)
        .then((property) => {
          throw new Error("エラーになるべき")
        })
        .catch((err) => {
          expect(err);
        });
      });

      test("データが欠けていたとき", () => {
        const url =`${endpoint}?visitor_id=${visitorId}`;
        const response = {
          status : true,
          property : {
            ver : "000",
            age : "",
            sex : ""
          }
        }

        const server = createFakeServer(url, response);
        setTimeout(() => { server.respond() },10);
        return cbo.load(visitorId)
        .then((property) => {
          throw new Error("エラーになるべき")
        })
        .catch((err) => {
          expect(err);
        });
      });

      test("データがなかったとき", () => {
        const response = {
          status : false,
          property : {}
        }

        const url =`${endpoint}?visitor_id=${visitorId}`;
        const server = createFakeServer(url, response);
        setTimeout(() => { server.respond() },10);
        return cbo.load(visitorId)
        .then((property) => {
          throw new Error("エラーになるべき")
        })
        .catch((err) => {
          expect(err);
        });
      });
    });
  });
});