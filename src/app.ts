import * as Promise from "bluebird";
import User from "./user";
import View from "./view";
import {PropsLoader, LoaderUnit} from "./user/props-loader";
import {StateSensor, SensorUnit} from "./user/state-sensor";
import {ViewLoader, ViewConfig, ComponentConfig } from "./view/view-loader";


export default class App{
  isInitialized:boolean = false;
  user:User;
  PropsLoader:PropsLoader;
  StateSensor:StateSensor;
  view:View;

  constructor(){
    this.user = new User();
    this.view = new View();
    this.user.onChange((user:User) => { return this.view.render(user); });
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

}