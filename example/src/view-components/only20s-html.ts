import {ViewComponent} from "../../../src";


function renderUserInfo(name:any,age:any,sex:any){
  return `<h1>Only 20s</h1>
  <div>${name} is 20s!</div>
  `
}

export default class Only20sHTML extends ViewComponent{
  id : "only20s-html";
  render(user:any){
    const profile = user["profile"];
    if (profile) {
      const html = renderUserInfo(profile.name, profile.age, profile.sex);
      const box = document.querySelector("#only20s");
      if(box) box.innerHTML = html;
    }
  }
}