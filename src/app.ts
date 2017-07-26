import * as Promise from "bluebird";
import User from "./user";
import View from "./view";
import UserLoader from "./user-loader";
import ViewLoader, { ViewConfig, ComponentConfig } from "./view-loader";


export default class App{
  isInitialized:boolean = false;
  user:User;
  view:View;

  constructor(userLoader:UserLoader, viewLoader:ViewLoader){
    this.user = new User();
    this.view = new View();
    this.user.onChange((user:User) => {
      this.view.render(user);
    });

    //viewの初期化
    viewLoader.load().then((viewConfig:ViewConfig) => {
      viewConfig.components.forEach((component:ComponentConfig) => {
        this.view.import(component.id, component._render);
      });
    });

    //ユーザ情報の読み込み
    userLoader.load().then((userProps:any) => {
      this.user.setProps(userProps);
    });
  }
}