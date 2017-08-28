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
    constructor(mode?: Mode);
    __import_user_attrs_value__(attrs: any): void;
    __import_user_attr__(id: string, value: any, init: initFunc): void;
    __import_view_component__(id: string, render: renderFunc): void;
}
