import * as Promise from "bluebird";
import User from "../user";
import ApiClient from "../api-client";
import GizmoItems from "../gizmo-items";
import {CBO} from "../data-client";

export default class App{
  api:ApiClient;
  user:User;
  gizmoItems:GizmoItems;

  constructor(config:{apiUrl:string}){
    this.api = new ApiClient(config.apiUrl);
    this.gizmoItems = new GizmoItems();
  }

  exposeInit(){
    //gizmo itemのソースは、全て__gizmo_render__を呼び出すように生成する
    //exposeするのapp？それともgizmoItem？
    //__gizmo_init__(id, render);
    window["__gizmo_init__"] = this.init;
  }

  init(id, render){
    
  }

  loadGizmoItems(){
    return this.api.getItems()
    //TODO: item用のmap interfaceをつくる
    .map((item:{id:string, src:string}) => {
      return this.gizmoItems.create(item);
    .catch((err) => {

    });
  }
  
  onUserLoad(user){
    const promises = this.gizmoItems.map((gi) => {
      return gi.render();
    });
    Promise.all(promises).then(this.loadGizmoItems);
  }
  
  onUserChange(user){
    
  }
}