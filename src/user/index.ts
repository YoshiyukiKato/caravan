import UserAttr, {callback} from "./attr";

export type initFunc = (this:UserAttr<any>) => any;

export default class User{
  public attrs: any = {};
  public callbacks: callback[] = [];
  
  constructor(){}
  
  use(attr:UserAttr<any>){
    attr.onChange(this.setAttrs.bind(this));
    //this.attrs[attr.id] = attr.value;
    attr.init();
  }

  import(id:string, value:any, init?:initFunc){
    class Attr extends UserAttr<any>{
      id = id;
      value = value;
    }
    const attr = new Attr();
    if(init) attr.init = init.bind(attr);
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