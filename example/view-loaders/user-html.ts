import * as Promise from "bluebird";
import {ViewLoader} from "../../src";

function renderUserInfo(name:any,age:any,sex:any){
  return `<h1>User info</h1>
    <div>name : ${name}</div>
    <div>age : ${age}</div>
    <div>sex : ${sex}</div>
  `
}

export default class UserHTML extends ViewLoader{
  load(){
    return Promise.resolve({
      components : [
        {
          id: "user-html",
          _render: (user:any) => {
            const html = renderUserInfo(user.props.name, user.props.age, user.props.sex);
            $("body").append(html);
          }
        }
      ]
    });
  }
}