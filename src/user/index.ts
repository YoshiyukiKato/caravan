import UserAttr, {callback} from "./attr";

type loadFunc = (this:UserAttr<any>) => any;
type watchFunc = (this:UserAttr<any>) => any;

export default class User{
  public attrs: any = {};
  public callbacks: callback[] = [];
  
  constructor(){}
  
  use(attr:UserAttr<any>){
    this.attrs[attr.id] = attr.value;
    attr.onChange(this.setAttrs.bind(this));
    attr.load();
    attr.watch();
  }

  import(id:string, value:any, load?:loadFunc, watch?:watchFunc){
    class Attr extends UserAttr<any>{
      id = id;
      value = value;
    }
    const attr = new Attr();
    if(load) attr.load = load.bind(attr);
    if(watch) attr.watch = watch.bind(attr);
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