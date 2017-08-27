import Filter from "./filter";

export default class ViewComponent{
  id:string = "";
  readonly filters:Filter[] = [];
  private state:any = {};
  
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
      const componentId = this.id;
      const isTargetUser = this.filters.reduce((acc:boolean, filter:Filter) => {
        return filter.validate(userAttrs, componentId);
      }, true);

      if(isTargetUser) this.render(userAttrs);
    } catch (e) {
      //console.log(e);
    }

    return Promise.resolve(userAttrs)
  }

  render(user:any){};
}