import {UserAttr} from "../../../src"

export interface UserClock{
  time : Date;
}

export default class Clock extends UserAttr<UserClock>{
  public id:string = "clock";
  public value:UserClock = {
    time : new Date()
  }
  
  init(){
    setInterval(() => {
      this.set({
        time : new Date()
      });
    }, 1000);
  }
}