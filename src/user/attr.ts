export type callback = (value:any) => any;

export default class UserAttr<T>{
  public id:string;
  public value:T;
  private callback?:callback = (change:any) => {};

  /**
   * Set a value to an attribute
   * @param nextAttrs The value to set
   * @param silent A flag for whether execute callbacks or not
   */
  set(nextValue:any, silent:boolean=false){
    const currentValue = Object.assign({}, this.value);
    this.value = Object.assign(currentValue, nextValue);
    if(!silent && this.callback){
      let attr:any = {};
      attr[this.id] = this.value;
      this.callback(attr);
    }
  }


  
  /**
   * Set a callback function for when attribute value changed
   * @param callback 
   */
  onChange(callback:callback){
    this.callback = callback;
  }

  /**
   * A function called when an attribute passed to `User.use` method
   */
  init(){
    if(this.value) this.set(this.value);
  }
}