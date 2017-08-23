import User from "./user";
import View from "./view";
declare global  {
    interface Window {
        __importView__: (id: string, render: (user: any) => any) => any;
        __importUser__: (user: any) => any;
    }
}
export declare type Mode = "dev" | "prod";
export default class App {
    isInitialized: boolean;
    user: User;
    view: View;
    mode: Mode;
    constructor(mode?: Mode);
    __importUser__(attrs: any): void;
    __importView__(id: string, render: (user: any) => any): void;
}
