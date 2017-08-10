import {PropsLoader, LoaderUnit} from "./user/props-loader";
import {ViewLoader} from "./view/view-loader";
import {StateSensor, SensorUnit} from "./user/state-sensor";
import App from "./app";
import * as util from "./util";

declare global{
  interface Window{
    Gimmickry : {
      App;
      util;
      ViewLoader;
      PropsLoader;
      LoaderUnit;
      StateSensor;
      SensorUnit;
    }
  }
}

window.Gimmickry = {App, util, ViewLoader, PropsLoader, LoaderUnit, StateSensor, SensorUnit};