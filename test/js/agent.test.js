import Agent from "../src/js/agent";
import assert from "power-assert";

const config = {
  env : "dev",
  api : "/testapi",
  codebase : "/testcodebase"
};
const url = "/testurl";
const user = { visitor_id : "testuser" }

var server;

describe("agent",  () => {
  before(() => {
    server = sinon.fakeServer.create();
  });  

  after(() => {
    server.restore(); 
  });

  it("creates new agent", () => {
    const agent = new Agent(config, url, user);
    assert(agent);
  });

  it("get services data", (done) => {
    const agent = new Agent(config, url, user);
    const services = { services : [{ pattern : "testurl" }, { pattern : "hoge" }] };
  
    server.respondWith("GET", `${config.api}/services`,
            [200, { "Content-Type": "application/json" },
            JSON.stringify(services)]);

    agent.getServices()
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

  it("get data source list", (done) => {
    const agent = new Agent(config, url, user);
    const dataSources = { dataSources : [{ url : "/testdatasource", key_id : "visitor_id" }] };

    server.respondWith("GET", `${config.api}/dataSources`,
            [200, { "Content-Type": "application/json" },
            JSON.stringify(dataSources)]);
    
    agent._getDataSourceList()
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

  it("get data", (done) => {
    const agent = new Agent(config, url, user);
    const dataSource = { name : "test", url : "/testdatasource", key_id : "visitor_id" };
    const params = { age : 20, sex : 0 };
    
    server.respondWith("GET", `${dataSource.url}?${dataSource.key_id}=${agent.user[dataSource.key_id]}`,
            [200, { "Content-Type": "application/json" },
            JSON.stringify(params)]);
    
    agent._getData(dataSource)
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

  it("renders service", () => {
    const user = {
      data : {
        age : 20,
        sex : 0
      }
    };
    const agent = new Agent(config, url, user);
    const service = { id : "testservice" };
    const renderService = function(){
      assert.deepEqual(this.user.data, { age : 20, sex : 0 });
    }
    
    agent.services = [service];
    agent.exportRender();

    const render = window[`__gizmo_render_${config.env}__`];
    assert(render);
    render();
  });
});