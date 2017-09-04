export default abstract class Filter {
    componentId?: string;
    /**
     * Decide to whether render a view component or not by a user attributes
     * @param userAttrs The user attributes
     * @param componentId id of the component
     */
    abstract validate(userAttrs: any, componentId: string): boolean;
}
