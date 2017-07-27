# web-sdk

## usage

```ts
import * as Promise from "bluebird";
import {App,UserLoader,ViewLoader} from "../src";

class VL extends ViewLoader{
  load(){
    return Promise.resolve({
      components : [
        {
          id: "mock",
          _render: (user:any) => { console.log(user); }
        }
      ]
    });
  }
}

class UL extends UserLoader{
  load(){
    return Promise.resolve({
      profile : {
        name : "taro",
        age : 20,
        sex : "male"
      }
    });
  }
}

const app = new App(new UL(), new VL());
```