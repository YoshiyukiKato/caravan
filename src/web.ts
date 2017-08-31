import UserAttr from "./user/attr";
import ViewComponent from "./view/component";
import ViewFilter from "./view/filter";
import App from "./app";

declare global{
  interface Window{
    Gimmickry : {
      App:any;
      ViewComponent : any;
      ViewFilter : any;
      UserAttr : any;
    }
  }
}

window.Gimmickry = {
  App : App,
  ViewComponent : ViewComponent,
  ViewFilter : ViewFilter,
  UserAttr : UserAttr,
};