export declare type renderFunc = (user: any) => any;
export default class ViewComponent {
    id: string;
    private state;
    constructor(id?: string, render?: renderFunc);
    /**
     * view
     * @param user
     */
    _render(user: any): Promise<any>;
    render(user: any): void;
}
