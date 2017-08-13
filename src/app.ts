import Promise from "bluebird";
import User from "./user";
import View from "./view";

declare global{
  interface Window{
    __importView__ : (id:string, _render:(user:any) => any) => any;
    __importUser__ : (user:any) => any;
  }
}

type Mode = "dev"|"prod";

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
      window.__importView__ = this.__importView__.bind(this);
      window.__importUser__ = this.__importUser__.bind(this);
    }
  }

  //開発モード用機能
  __importUser__(attrs:any){
    this.user.setAttrs(attrs);
  }
  
  __importView__(id:string, _render:(user:any) => any){
    const devId = `dev-${id}`;
    this.view.import(devId, _render);
  }
}