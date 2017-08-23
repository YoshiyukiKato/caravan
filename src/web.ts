import UserAttr from "./user/attr";
import ViewComponent from "./view/component";
import App from "./app";

declare global{
  interface Window{
    Gimmickry : {
      App:any;
      ViewComponent:any;
      UserAttr:any;
    }
  }
}

window.Gimmickry = {
  App : App,
  ViewComponent : ViewComponent,
  UserAttr : UserAttr,
};