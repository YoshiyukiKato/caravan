import {UserAttr} from "../../../src";

export interface UserId{
  value : number;
}

export default class Id extends UserAttr<UserId>{
  public id:string = "id";
  public value:UserId = { value : Math.floor(Math.random() * 10000) };
}