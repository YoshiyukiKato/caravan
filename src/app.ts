import Promise from "bluebird";
import User from "./user";
import View from "./view";
import {PropsLoader, LoaderUnit} from "./user/props-loader";
import {StateSensor, SensorUnit} from "./user/state-sensor";
import {ViewLoader, ViewConfig, ComponentConfig } from "./view/view-loader";

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
  PropsLoader:PropsLoader;
  StateSensor:StateSensor;
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

  setStateSensor(StateSensor:StateSensor){
    StateSensor.onChange((userState:any) => this.user.setState(userState));
    StateSensor.activate();
  }

  setPropsLoader(PropsLoader:PropsLoader){
    PropsLoader.onChange((userProps:any) => this.user.setProps(userProps));
    PropsLoader.load();
  }

  setViewLoader(viewLoader:ViewLoader){
    viewLoader.load()
    .then((viewConfig:ViewConfig) => {
      viewConfig.components.forEach((component:ComponentConfig) => {
        this.view.import(component.id, component._render);
      });
    })
    .catch(console.log);
  }

  //開発モード用機能
  __importUser__(user:any){
    this.user.setProps(user.props || {}, true);
    this.user.setState(user.state || {});
  }
  
  __importView__(id:string, _render:(user:any) => any){
    const devId = `dev-${id}`;
    this.view.import(devId, _render);
  }
}