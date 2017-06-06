import * as Promise from "bluebird";
import * as util from "./util";

export default abstract class API{
  util:Object = util;
  abstract user:{
    load:() => Promise<any>
  }

  abstract gizmoItem:{
    load:() => Promise<{gizmoItems:{id:string, src:string}[]}>
  }
}