import {ViewComponent} from "../../../src";
import {UserId} from "../user-attrs/id"

export interface UserAttrs{
  id : UserId;
}

export class Component1 extends ViewComponent{
  id = "component1";
  render(userAttrs:UserAttrs){
    _render(this.id, userAttrs);
  }
}

export class Component2 extends ViewComponent{
  id = "component2";
  render(userAttrs:UserAttrs){
    _render(this.id, userAttrs);
  }
}

function _render(componentId:string, userAttrs:UserAttrs){
  const elm = document.querySelector("#component");
  if(elm){
    elm.innerHTML = `
      <div> component : ${componentId}</div>
      <div>    userId : ${userAttrs.id.value}</div>
    `;
  }
}