import {LoaderUnit} from "../../src";

export default class UserProfile extends LoaderUnit{
  constructor(){
    super("user_profile", null);
  }
  
  load(){
    //本来は、ここでajaxなどを投げて、返って来た値を整形してvalueに入れる
    this.change({
      name : "taro",
      age : 20,
      sex : "male"
    });
  }
}