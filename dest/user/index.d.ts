import UserAttr, { callback } from "./attr";
export default class User {
    attrs: any;
    callbacks: callback[];
    constructor();
    use(attr: UserAttr<any>): void;
    setAttrs(this: User, nextAttrs: any, silent?: boolean): void;
    onChange(cb: callback): void;
}
