import UserAttr from "../../src/user/attr";

export interface Profile{
  name? : string;
  age? : number;
  sex? : string;
}

export default class UserProfile extends UserAttr<Profile>{
  public name:string = "user-profile";
  public value:Profile = {};
  
  load(){
    this.set({
      name : "taro",
      age : 20,
      sex : "male"
    });
  }
}