import * as Promise from "bluebird";
import {App,UserLoader,ViewLoader,UserSensor,SensorUnit} from "../src";
import * as $ from "jquery";

class After5Sec extends SensorUnit{
  constructor(){
    super("after5sec", false);
  }
  
  watch(){
    setTimeout(() => {
      this.value = true;
      this.change();
    }, 5000);
  }
}

class VL extends ViewLoader{
  load(){
    return Promise.resolve({
      components : [
        {
          id: "render-html",
          _render: (user:any) => {
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

const us = new UserSensor();
us.use(new After5Sec());
app.setUserSensor(us);