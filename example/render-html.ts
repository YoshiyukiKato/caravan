import * as Promise from "bluebird";
import {App,UserLoader,ViewLoader} from "../src";
import * as $ from "jquery";

function renderUserInfo(name:any,age:any,sex:any){
  return `<h1>User info</h1>
    <div>name : ${name}</div>
    <div>age : ${age}</div>
    <div>sex : ${sex}</div>
  `
}

class VL extends ViewLoader{
  load(){
    return Promise.resolve({
      components : [
        {
          id: "render-html",
          _render: (user:any) => {
            const html = renderUserInfo(user.props.name, user.props.age, user.props.sex);
            $("body").append(html);
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