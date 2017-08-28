import UserAttr, { callback } from "./attr";
export declare type initFunc = (this: UserAttr<any>) => any;
export default class User {
    attrs: any;
    callbacks: callback[];
    constructor();
    use(attr: UserAttr<any>): void;
    import(id: string, value: any, init?: initFunc): void;
    setAttrs(this: User, nextAttrs: any, silent?: boolean): void;
    onChange(cb: callback): void;
}
