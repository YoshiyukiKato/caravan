import ViewComponent from "./component";
import Filter from "./filter";
export declare type renderFunc = (userAttrs: any) => any;
export default class View {
    readonly components: ViewComponent[];
    readonly filters: Filter[];
    private userAttrs;
    private state;
    /**
     * Build a component dynamically and use it
     * @param id A unique id of the component
     * @param render A render function of the component
     */
    import(id: string, render: renderFunc): void;
    /**
     * Register a view component
     * @param component The view component
     */
    use(component: ViewComponent): void;
    /**
     * Distribute a filter to target components
     * @param filter The filter
     */
    useFilter(filter: Filter): void;
    /**
     * Call render method of all view components with user attributes
     * @param userAttrs The latest user attributes
     */
    render(userAttrs: any): Promise<any>;
}
