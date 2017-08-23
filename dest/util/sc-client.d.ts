export default class SC {
    s_gi: Function;
    s_account: any;
    constructor(s_gi: Function, s_account: any);
    sendEvar(eVars: any, message: string): void;
    sendEvent(events: string[], message: string): void;
}
