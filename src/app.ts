import * as Promise from "bluebird";
import User from "./user";
import View from "./view";
import UserLoader from "./user-loader";
import UserSensor from "./user-sensor";
import ViewLoader, { ViewConfig, ComponentConfig } from "./view-loader";


export default class App{
  isInitialized:boolean = false;
  user:User;
  view:View;

  constructor(){
    this.user = new User();
    this.view = new View();
    this.user.onChange((user:User) => { return this.view.render(user); });
  }

  setUserSensor(userSensor:UserSensor){
    userSensor.onChange((userState:any) => {
      this.user.setState(userState);
    })
    console.log("here");
    userSensor.activate();
  }

  setUserLoader(userLoader:UserLoader){
    userLoader.load()
    .then((userProps:any) => this.user.setProps(userProps))
    .catch(console.log);
  }

  setViewLoader(viewLoader:ViewLoader){
    viewLoader.load()
    .then((viewConfig:ViewConfig) => {
      viewConfig.components.forEach((component:ComponentConfig) => {
        this.view.import(component.id, component._render);
      });
      return;
    })
    .catch(console.log);
  }


}