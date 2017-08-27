export type callback = (value:any) => any;

export default class UserAttr<T>{
  public id:string;
  public value:T;
  private callback?:callback = (change:any) => {};

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

  load(){};
  watch(){};
}