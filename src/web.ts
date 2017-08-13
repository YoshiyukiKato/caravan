import UserAttr from "./user/attr";
import ViewComponent from "./view/component";
import App from "./app";
import * as util from "./util";

declare global{
  interface Window{
    Gimmickry : {
      App:any;
      util:any;
      ViewComponent:any;
      UserAttr:any;
    }
  }
}

window.Gimmickry = {
  App : App,
  util : util,
  ViewComponent : ViewComponent,
  UserAttr : UserAttr,
};