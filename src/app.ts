import * as Promise from "bluebird";
import User from "./user";
import View from "./view";
import {UserLoader, LoaderUnit} from "./user-loader";
import {UserSensor, SensorUnit} from "./user-sensor";
import ViewLoader, { ViewConfig, ComponentConfig } from "./view-loader";


export default class App{
  isInitialized:boolean = false;
  user:User;
  userLoader:UserLoader;
  userSensor:UserSensor;
  view:View;

  constructor(){
    this.user = new User();
    this.view = new View();
    this.user.onChange((user:User) => { return this.view.render(user); });
  }

  setUserSensor(userSensor:UserSensor){
    userSensor.onChange((userState:any) => this.user.setState(userState));
    userSensor.activate();
  }

  setUserLoader(userLoader:UserLoader){
    userLoader.onChange((userProps:any) => this.user.setProps(userProps));
    userLoader.load();
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