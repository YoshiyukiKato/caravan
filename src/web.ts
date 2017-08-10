import {PropsLoader, LoaderUnit} from "./user/props-loader";
import {ViewLoader} from "./view/view-loader";
import {StateSensor, SensorUnit} from "./user/state-sensor";
import App from "./app";
import * as util from "./util";

declare global{
  interface Window{
    Gimmickry : {
      App:any;
      util:any;
      ViewLoader:any;
      PropsLoader:any;
      LoaderUnit:any;
      StateSensor:any;
      SensorUnit:any;
    }
  }
}

window.Gimmickry = {
  App : App,
  util : util,
  ViewLoader : ViewLoader,
  PropsLoader : PropsLoader,
  LoaderUnit : LoaderUnit,
  StateSensor : StateSensor,
  SensorUnit : SensorUnit
};