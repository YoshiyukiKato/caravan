import * as Promise from "bluebird";

export interface API{
  user : {
    load:() => Promise<any>,
  }

  gizmoItems : {
    load:() => Promise<{gizmoItems:[{id:string, src:string}]}>
  }
}