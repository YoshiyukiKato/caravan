import UserAttr from "./user/attr";
import {ViewLoader} from "./view/view-loader";
import App from "./app";
import * as util from "./util";

declare global{
  interface Window{
    Gimmickry : {
      App:any;
      util:any;
      ViewLoader:any;
      UserAttr:any;
    }
  }
}

window.Gimmickry = {
  App : App,
  util : util,
  ViewLoader : ViewLoader,
  UserAttr : UserAttr,
};