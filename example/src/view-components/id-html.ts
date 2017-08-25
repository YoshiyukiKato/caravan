import {ViewComponent} from "../../../src";
import {UserId} from "../user-attrs/id"

export class Component1 extends ViewComponent{
  id = "component1";
  render(userAttrs:{ id : UserId }){
    const elm = document.querySelector("#component");
    if(elm){
      elm.innerHTML = `
        <div> component : 1</div>
        <div>    userId : ${userAttrs.id.value}</div>
      `;
    }
  }
}

export class Component2 extends ViewComponent{
  id = "component2";
  render(userAttrs:{ id : UserId }){
    const elm = document.querySelector("#component");
    if(elm){
      elm.innerHTML = `
        <div> component : 2</div>
        <div>    userId : ${userAttrs.id.value}</div>
      `;
    }
  }
}