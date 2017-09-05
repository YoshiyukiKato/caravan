import User, { initFunc } from "./user";
import View, { renderFunc } from "./view";
declare global  {
    interface Window {
        __import_view_component__: (id: string, render: (user: any) => any) => any;
        __import_user_attrs_value__: (user: any) => any;
        __import_user_attr__: (user: any) => any;
    }
}
export declare type Mode = "dev" | "prod";
export default class App {
    isInitialized: boolean;
    user: User;
    view: View;
    mode: Mode;
    /**
     * Initialize a Gimmickry application
     * @param mode "dev" or "prod"
     */
    constructor(mode?: Mode);
    /**
     * An alias to `app.user.setAttrs` method.
     * This method is exported as `window.__import_user_attrs_value__` by `dev` mode app
     * @param attrs
     */
    __import_user_attrs_value__(attrs: any): void;
    /**
     * An alias to `app.user.import` method.
     * This method is exported as `window.__import_user_attr__` by `dev` mode app
     * @param id
     * @param value
     * @param init
     */
    __import_user_attr__(id: string, value: any, init?: initFunc): void;
    /**
     * An alias to `app.view.import` method.
     * This method is exported as `window.__import_view_component__` by `dev` mode app
     * @param id
     * @param render
     */
    __import_view_component__(id: string, render: renderFunc): void;
}
