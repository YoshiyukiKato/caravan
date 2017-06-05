import * as Promise from "bluebird";
import User from "../user";
import ApiClient from "../api-client";
import GizmoItems from "../gizmo-item";
import {CBO} from "../data-client";

export default class App{
  loadedAt:Date;
  status:{isUserLoaded:boolean, isGizmoItemsLoaded:boolean} = {isUserLoaded:true, isGizmoItemsLoaded:true};
  user:User;
  gizmoItems:GizmoItems;

  constructor(user:User, gizmoItems:GizmoItems){
    this.loadedAt = new Date();
    this.user = user;
    this.gizmoItems = gizmoItems;
    
  }

  onUserLoad(user){
    this.status.isUserLoaded = true;
    if(this.status.isGizmoItemsLoaded) this.gizmoItems.render(user);
  }

  onGizmoItemsLoad(gizmoItems){
    this.status.isGizmoItemsLoaded = true;
    if(this.status.isUserLoaded) this.gizmoItems.render(user);
  }
}