import {UserAttr} from "../../../src";

export interface UserProfile{
  name? : string;
  age? : number;
  sex? : string;
}

export default class Profile extends UserAttr<UserProfile>{
  public id:string = "profile";
  public value:UserProfile = {};
  
  init(){
    this.set({
      name : "taro",
      age : 20,
      sex : "male"
    });
  }
}