export declare type callback = (value: any) => any;
export default class UserAttr<T> {
    id: string;
    value: T;
    private callback?;
    /**
     * Set a value to an attribute
     * @param nextAttrs The value to set
     * @param silent A flag for whether execute callbacks or not
     */
    set(nextValue: any, silent?: boolean): void;
    /**
     * Set a callback function for when attribute value changed
     * @param callback
     */
    onChange(callback: callback): void;
    /**
     * A function called when an attribute passed to `User.use` method
     */
    init(): void;
}
