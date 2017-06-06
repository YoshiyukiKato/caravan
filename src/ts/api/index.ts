import * as Promise from "bluebird";
import * as util from "./util";

abstract class API{
  abstract user:{
    load:() => Promise<any>
  }

  abstract gizmoItem:{
    load:() => Promise<{gizmoItems:{id:string, src:string}[]}>
  }
}

export {API, util};