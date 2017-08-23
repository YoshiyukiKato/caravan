import UserAttr, {callback} from "./attr";

export default class User{
  public attrs: any = {};
  public callbacks: callback[] = [];
  
  constructor(){}
  
  use(attr:UserAttr<any>){
    this.attrs[attr.name] = attr.value;
    attr.onChange(this.setAttrs.bind(this));
    attr.load();
    attr.watch();
  }

  setAttrs(this:User, nextAttrs:any, silent:boolean=false){
    this.attrs = Object.assign(this.attrs, nextAttrs);
    if(!silent) this.callbacks.forEach((cb:callback) => cb(this.attrs));
  }

  onChange(cb:callback):void{
    this.callbacks.push(cb);
  };
}