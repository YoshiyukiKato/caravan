import UserAttr, { callback } from "./attr";
export declare type initFunc = (this: UserAttr<any>) => any;
export default class User {
    attrs: any;
    callbacks: callback[];
    /**
     * Register an attribute to a user
     * @param attr The attribute to register
     */
    use(attr: UserAttr<any>): void;
    /**
     * Build an attribute dynamically and register it to a user
     * @param id The new attribute id
     * @param value Initial value of the attribute
     * @param init A function called when passed to `User.use` method
     */
    import(id: string, value: any, init?: initFunc): void;
    /**
     * Set attributes value to a user
     * @param this The user
     * @param nextAttrs The attributes value to set
     * @param silent A flag for whether execute callbacks or not
     */
    setAttrs(this: User, nextAttrs: any, silent?: boolean): void;
    /**
     * Set a callback function for when user attributes changed
     * @param cb The callback function
     */
    onChange(cb: callback): void;
}
