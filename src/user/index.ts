import UserAttr, {loadFunc, watchFunc, callback} from "./attr";

export default class User{
  public attrs: any = {};
  public callbacks: callback[] = [];
  
  constructor(){}
  
  use(attr:UserAttr<any>){
    this.attrs[attr.id] = attr.value;
    attr.onChange(this.setAttrs.bind(this));
    if(attr.load) attr.load();
    if(attr.watch) attr.watch();
  }

  import(id:string, value:any, load:loadFunc, watch:watchFunc){
    const attr = new UserAttr(id, value, load, watch);
    this.use(attr);
  }

  setAttrs(this:User, nextAttrs:any, silent:boolean=false){
    this.attrs = Object.assign(this.attrs, nextAttrs);
    if(!silent) this.callbacks.forEach((cb:callback) => cb(this.attrs));
  }

  onChange(cb:callback):void{
    this.callbacks.push(cb);
  };
}