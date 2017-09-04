import UserAttr, {callback} from "./attr";

export type initFunc = (this:UserAttr<any>) => any;

export default class User{
  public attrs: any = {};
  public callbacks: callback[] = [];
  
  /**
   * Register an attribute to a user
   * @param attr The attribute to register 
   */
  use(attr:UserAttr<any>){
    attr.onChange(this.setAttrs.bind(this));
    //this.attrs[attr.id] = attr.value;
    attr.init();
  }

  /**
   * Build an attribute dynamically and register it to a user
   * @param id The new attribute id
   * @param value Initial value of the attribute
   * @param init A function called when passed to `User.use` method 
   */
  import(id:string, value:any, init?:initFunc){
    class Attr extends UserAttr<any>{
      id = id;
      value = value;
    }
    const attr = new Attr();
    if(init) attr.init = init.bind(attr);
    this.use(attr);
  }

  /**
   * Set attributes value to a user
   * @param this The user
   * @param nextAttrs The attributes value to set
   * @param silent A flag for whether execute callbacks or not
   */
  setAttrs(this:User, nextAttrs:any, silent:boolean=false){
    this.attrs = Object.assign(this.attrs, nextAttrs);
    if(!silent) this.callbacks.forEach((cb:callback) => cb(this.attrs));
  }

  /**
   * Set a callback function for when user attributes changed
   * @param cb The callback function
   */
  onChange(cb:callback):void{
    this.callbacks.push(cb);
  };
}