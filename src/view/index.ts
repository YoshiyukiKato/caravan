import * as Promise from "bluebird";
import Component, {renderFunc} from "./component";
import Filter from "./filter";

export default class View{
  readonly components:Component[] = [];
  private userAttrs:any = {}; 
  private state:any = { renderCount : 0 };

  /**
   * build component dynamically and use it
   * @param id unique id of a component
   * @param _render render function of a component
   */
  import(id:string, _render:renderFunc){
    const component = new Component(id, _render);
    this.use(component);
  }

  /**
   * add a view component to the list of them
   * @param component view component
   */
  use(component:Component){
    this.components.push(component);
    if(!!this.userAttrs) component.render(this.userAttrs);
    return;
  }

  /**
   * Distribute a filter to target components
   * @param filter has component id and validate function
   */
  useFilter(filter:Filter){
    //for all components
    if(filter.componentId === "*"){
      this.components.forEach((component:Component) => {
        component.useFilter(filter);
      });
    
    //for certain component
    }else{
      const component = this.components.find((component:Component) => {
        return component.id === filter.componentId;
      });
      if(component) component.useFilter(filter);
    }
  }

  /**
   * Call render method of all view components with user attributes
   * @param userAttrs The latest user attributes
   */
  render(userAttrs:any):Promise<any>{
    this.userAttrs = userAttrs;

    const renderPromise = this.components
    .map((component:Component) => {
      return component._render(userAttrs);
    });
    
    return Promise.all(renderPromise).then(() => {
      //console.log(`view updated : ${this.state.renderCount}`);
      this.state.renderCount += 1;
    });
  }
}