import {UserAttr} from "../../../src";

export interface UserProfile{
  name? : string;
  age? : number;
  sex? : string;
}

export default class Profile extends UserAttr<UserProfile>{
  public name:string = "user-profile";
  public value:UserProfile = {};
  
  load(){
    this.set({
      name : "taro",
      age : 20,
      sex : "male"
    });
  }
}