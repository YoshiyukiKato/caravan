import Promise from "bluebird";
import User,{initFunc} from "./user";
import View,{renderFunc} from "./view";

declare global{
  interface Window{
    __import_view_component__ : (id:string, render:(user:any) => any) => any;
    __import_user_attrs_value__ : (user:any) => any;
    __import_user_attr__ : (user:any) => any;
  }
}

export type Mode = "dev"|"prod";
export default class App{
  isInitialized:boolean = false;
  user:User;
  view:View;
  mode:Mode;

  constructor(mode:Mode="dev"){
    this.user = new User();
    this.view = new View();
    this.user.onChange((user:User) => { return this.view.render(user); });
    this.mode = mode;
    if(this.mode === "dev"){
      window.__import_view_component__ = this.__import_view_component__.bind(this);
      window.__import_user_attr__ = this.__import_user_attr__.bind(this);
      window.__import_user_attrs_value__ = this.__import_user_attrs_value__.bind(this);
    }
  }

  //開発モード用機能
  __import_user_attrs_value__(attrs:any){
    this.user.setAttrs(attrs);
  }

  __import_user_attr__(id:string, value:any, init:initFunc){
    const devId = `dev-${id}`;
    this.user.import(devId, value, init);
  }

  __import_view_component__(id:string, render:renderFunc){
    const devId = `dev-${id}`;
    this.view.import(devId, render);
  }
}