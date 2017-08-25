export default abstract class Filter {
    componentId?: string;
    abstract validate(userAttrs: any, componentId: string): boolean;
}
