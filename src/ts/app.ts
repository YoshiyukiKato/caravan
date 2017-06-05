import * as Promise from "bluebird";
import User from "../user";
import GizmoItems from "../gizmo-items";

export default class App{
  isInitialized:boolean = false;
  loadedAt:Date;
  user:User;
  gizmoItems:GizmoItems;

  constructor(user:User, gizmoItems:GizmoItems){
    this.loadedAt = new Date();
    this.user = user;
    this.gizmoItems = gizmoItems;
  }

  init():void{
    if(this.isInitialized) return;
    const gizmoItemsPromise = this.gizmoItems.init();
    const userPromise = this.user.init();
    Promise.all([gizmoItemsPromise, userPromise])
    .then(() => {
      this.isInitialized = true;
      this.gizmoItems.renderAll(this.user)
    });
  }
}