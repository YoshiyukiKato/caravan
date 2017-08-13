type callback = (value:any) => any;

export default abstract class UserAttr<T>{
  public abstract name:string;
  public abstract value:T;
  private callback:callback = (change:any) => {};
  
  load(){}
  watch(){}

  set(nextValue:any, silent:boolean=false){
    this.value = Object.assign(this.value, nextValue);
    if(!silent){
      let attr:any = {};
      attr[this.name] = this.value;
      this.callback(attr);
    }
  }

  onChange(callback:callback){
    this.callback = callback;
  }
}