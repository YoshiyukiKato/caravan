export declare type callback = (value: any) => any;
export default abstract class UserAttr<T> {
    abstract name: string;
    abstract value: T;
    private callback;
    load(): void;
    watch(): void;
    set(nextValue: any, silent?: boolean): void;
    onChange(callback: callback): void;
}
