type renderFunc = (user:any) => any;

export default class ViewComponent{
  private id : string;
  private _render:renderFunc;
  private state:any = {};
  constructor(id:string, _render:renderFunc){
    this.id = id;
    this._render = _render;
  }
  
  /**
   * ユーザ情報を引数にとって、DOMを操作する
   * @param user 
   */
  render(user:any){
    return new Promise((resolve, reject) => {
      try{
        this._render(user);
        resolve(this);
        return null;
      }catch(e){
        reject(e);
        return null;
      }
    }); 
  }
}