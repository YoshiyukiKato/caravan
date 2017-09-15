import User,{initFunc} from "./user";
import View,{renderFunc} from "./view";

declare global{
  interface Window{
    __import_view_component__ : (id:string, render:(user:any) => any) => any;
    __import_user_attrs_value__ : (user:any) => any;
    __import_user_attr__ : (user:any) => any;
  }
}

export type Mode = "development"|"production";

/**
 * 
 */

export default class App{
  isInitialized:boolean = false;
  user:User;
  view:View;
  mode:Mode;

  /**
   * Initialize a Gimmickry application
   * @param mode "dev" or "prod"
   */
  constructor(mode:Mode="development"){
    this.user = new User();
    this.view = new View();
    this.user.onChange((user:User) => { return this.view.render(user); });
    this.mode = mode;
    if(this.mode === "development"){
      window.__import_view_component__ = this.__import_view_component__.bind(this);
      window.__import_user_attr__ = this.__import_user_attr__.bind(this);
      window.__import_user_attrs_value__ = this.__import_user_attrs_value__.bind(this);
    }
  }

  /**
   * An alias to `app.user.setAttrs` method.
   * This method is exported as `window.__import_user_attrs_value__` by `dev` mode app
   * @param attrs 
   */
  __import_user_attrs_value__(attrs:any){
    this.user.setAttrs(attrs);
  }

  /**
   * An alias to `app.user.import` method.
   * This method is exported as `window.__import_user_attr__` by `dev` mode app
   * @method __import_user_attr__
   * @param {string} id 
   * @param {any} value 
   * @param {initFunc} init 
   */
  __import_user_attr__(id:string, value:any, init?:initFunc){
    const devId = `dev-${id}`;
    this.user.import(devId, value, init);
  }

  /**
   * An alias to `app.view.import` method.
   * This method is exported as `window.__import_view_component__` by `dev` mode app
   * @method __import_view_component__
   * @param {string} id 
   * @param {renderFunc} render 
   */
  __import_view_component__(id:string, render:renderFunc){
    const devId = `dev-${id}`;
    this.view.import(devId, render);
  }
}