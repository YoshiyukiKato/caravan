export type callback = (value:any) => any;
export type loadFunc = () => any;
export type watchFunc = () => any;

export default class UserAttr<T>{
  public id:string;
  public value:T;
  public load?:loadFunc;
  public watch?:watchFunc;
  private callback?:callback = (change:any) => {};

  constructor(id?:string, value?:T, load?:loadFunc, watch?:watchFunc){
    if(id) this.id = id;
    if(value) this.value = value;
    if(load) this.load = load;
    if(watch) this.watch = watch;
  }

  set(nextValue:any, silent:boolean=false){
    this.value = Object.assign(this.value, nextValue);
    if(!silent && this.callback){
      let attr:any = {};
      attr[this.id] = this.value;
      this.callback(attr);
    }
  }

  onChange(callback:callback){
    this.callback = callback;
  }
}