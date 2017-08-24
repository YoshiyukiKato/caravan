import {UserAttr} from "../../../src"

export interface UserClock{
  time : Date;
}

export default class Clock extends UserAttr<UserClock>{
  public name:string = "clock";
  public value:UserClock = {
    time : new Date()
  }
  
  watch(){
    setInterval(() => {
      this.set({
        time : new Date()
      });
    }, 1000);
  }
}