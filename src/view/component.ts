type renderFunc = (user:any) => any;

export default class ViewComponent{
  id:string = "";
  private state:any = {};
  
  constructor(id?:string, render?:renderFunc){
    if(id) this.id = id;
    if(render) this.render = render;
  }

  /**
   * view 
   * @param user 
   */
  _render(user:any):Promise<any>{
    try {
      this.render(user);
    } catch (e) {
      console.log(e);
    }
    return Promise.resolve(user)
  }

  render(user:any){};
}