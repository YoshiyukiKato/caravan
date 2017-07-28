import {LoaderUnit} from "../../src";

export default class UserProfile extends LoaderUnit{
  constructor(){
    super("user_profile", null);
  }
  
  load(){
    return Promise.resolve({
      name : "taro",
      age : 20,
      sex : "male"
    });
  }
}