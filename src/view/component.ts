import Filter from "./filter";

export type renderFunc = (user:any) => any;

export default class ViewComponent{
  id:string = "";
  private filters:Filter[];
  private state:any = {};
  
  constructor(id?:string, render?:renderFunc){
    if(id) this.id = id;
    if(render) this.render = render;
  }

  /**
   * add filter to the list of them. They will be used before redering
   * @param filter 
   */
  useFilter(filter:Filter){
    this.filters.push(filter);
  }

  /**
   * exec render method if the user is a target
   * @param userAttrs
   */
  _render(userAttrs:any):Promise<any>{
    try {
      const isTargetUser = this.filters.reduce((acc:boolean, filter:Filter) => {
        return filter.validate(userAttrs);
      }, true);

      if(isTargetUser) this.render(userAttrs);
    } catch (e) {
      console.log(e);
    }

    return Promise.resolve(userAttrs)
  }

  render(user:any){};
}