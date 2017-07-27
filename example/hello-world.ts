import * as Promise from "bluebird";
import {App,UserLoader,ViewLoader} from "../src";

class VL extends ViewLoader{
  load(){
    return Promise.resolve({
      components : [
        {
          id: "hello-world",
          _render: (user:any) => {
            console.log("hello world!")
            console.log(user);
          }
        }
      ]
    });
  }
}

class UL extends UserLoader{
  load(){
    return Promise.resolve({
      name : "taro",
      age : 20,
      sex : "male"
    });
  }
}

const app = new App();
app.setUserLoader(new UL());
app.setViewLoader(new VL());