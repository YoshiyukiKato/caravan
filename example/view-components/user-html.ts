import {ViewComponent} from "../../src";

function renderUserInfo(name:any,age:any,sex:any){
  return `<h1>User info</h1>
    <div>name : ${name}</div>
    <div>age : ${age}</div>
    <div>sex : ${sex}</div>
  `
}

export default class UserHTML extends ViewComponent{
  id : "user-html";
  render(user:any){
    const profile = user["user-profile"];
    if (profile) {
      const html = renderUserInfo(profile.name, profile.age, profile.sex);
      $("#user-profile").html(html);
    }
  }
}