import Filter from "./filter";
export default class ViewComponent {
    id: string;
    readonly filters: Filter[];
    private state;
    /**
     * Add filter to the list of them. They will be used before redering
     * @param filter
     */
    useFilter(filter: Filter): void;
    /**
     * Exec render method if the user is a target
     * @param userAttrs
     */
    _render(userAttrs: any): Promise<any>;
    render(user: any): void;
}
