import Agent from "../src/lib/agent";
import assert from "power-assert";

const testUrl = "/testurl";
const testApi = "/testapi";
const testCodebase = "/testcodebase";

var server;
describe("agent",  () => {
  before(() => {
    server = sinon.fakeServer.create();
  });  

  after(() => {
    server.restore(); 
  });

  it("creates new agent", () => {
    const agent = new Agent(testUrl, testApi, testCodebase);
    assert(agent);
  });

  it("loads services data", () => {
    const agent = new Agent(testUrl, testApi, testCodebase);
    const testServices = { services : [{ pattern : "testurl" }, { pattern : "hoge" }] };
  
    server.respondWith("GET", `${testApi}/services`,
            [200, { "Content-Type": "application/json" },
            JSON.stringify(testServices)]);
    
    agent.loadServices()
    .then(() => {
      assert(agent);
      done();
    })
    .catch((err) => {
      assert(err);
      done();
    });
    server.respond()
  });

  it("loads data sources", () => {
    const agent = new Agent(testUrl, testApi, testCodebase);
    const testDataSources = { dataSources : [{ url : "/testdatasource", key_id : "visitor_id" }] };


    server.respondWith("GET", `${testApi}/dataSources`,
            [200, { "Content-Type": "application/json" },
            JSON.stringify(testDataSources)]);
    
    agent.loadDataSources()
    .then(() => {
      assert(agent);
      done();
    })
    .catch((err) => {
      assert(err);
      done();
    });
    server.respond()
  });

  it("loads a data source", () => {
    const agent = new Agent(testUrl, testApi, testCodebase);
    agent.setUser({ visitor_id : "testuser" });

    const testDataSource = { url : "/testdatasource", key_id : "visitor_id" };
    const testUser = { visitor_id : "testuser" };
    const testParams = { age : 20, sex : 0 };
    
    server.respondWith("GET", `${testDataSource.url}?${testDataSource.key_id}=${testUser[testDataSource.key_id]}`,
            [200, { "Content-Type": "application/json" },
            JSON.stringify(testParams)]);
    
    agent.loadDataSource(testDataSource)
    .then(() => {
      assert(agent);
      done();
    })
    .catch((err) => {
      assert(err);
      done();
    });
    server.respond()
  });
});