import * as Promise from "bluebird";
import {App,UserLoader,ViewLoader} from "../src";

class VL extends ViewLoader{
  load(){
    return Promise.resolve({
      components : [
        {
          id: "mock",
          _render: (props) => { alert("Hello World!") }
        }
      ]
    });
  }
}

class UL extends UserLoader{
  load(){
    return Promise.resolve({
      message : "mock"
    });
  }
}

const app = new App(new UL(), new VL());
console.log(app);