export declare type callback = (value: any) => any;
export default class UserAttr<T> {
    id: string;
    value: T;
    private callback?;
    set(nextValue: any, silent?: boolean): void;
    onChange(callback: callback): void;
    init(): void;
}
