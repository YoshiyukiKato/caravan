import UserAttr from "../../src/user/attr"

export interface Value{
  isPassed : boolean;
}

export default class After5Sec extends UserAttr<Value>{
  public name:string = "after5sec";
  public value:Value = {
    isPassed : false
  }
  
  watch(){
    setTimeout(() => {
      this.set({
        isPassed : true
      });
    }, 5000);
  }
}