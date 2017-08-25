import Filter from "./filter";
export declare type renderFunc = (userAttrs: any) => any;
export default class ViewComponent {
    id: string;
    readonly filters: Filter[];
    private state;
    constructor(id?: string, render?: renderFunc);
    /**
     * add filter to the list of them. They will be used before redering
     * @param filter
     */
    useFilter(filter: Filter): void;
    /**
     * exec render method if the user is a target
     * @param userAttrs
     */
    _render(userAttrs: any): Promise<any>;
    render(user: any): void;
}
