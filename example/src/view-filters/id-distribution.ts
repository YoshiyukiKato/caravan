import {ViewFilter} from "../../../src";
import {UserId} from "../user-attrs/id";

export interface Rule{
  id : string;
  mod : number;
}

export default class IdDistribution extends ViewFilter{
  get rules():Rule[]{
    return [
      { id : "component1", mod : 1 },
      { id : "component2", mod : 0 },
    ];
  }

  validate(userAttrs:{ id : UserId }, componentId:string){
    const id = userAttrs.id;
    if(!id) return false;
    
    const rule = this.rules.find((rule:Rule) => rule.id === componentId);;
    if(rule){
      return id.value % 2 === rule.mod;
    }else{
      return true;
    }
  }
}