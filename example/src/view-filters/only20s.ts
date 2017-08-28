import {ViewFilter} from "../../../src";
import {UserProfile} from "../user-attrs/profile";

export interface UserSchema{
  profile:UserProfile
}

export default class Only20s extends ViewFilter{
  componentId:"only20s-html";
  validate(userAttrs:UserSchema, componentId:string){
    const age = userAttrs["profile"].age;
    if(!age) return false;
    return 20 <= age && age < 30;
  }
}