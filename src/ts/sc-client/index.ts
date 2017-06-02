export default class SC{
  s_gi: Function;
  s_account: any;
  constructor(s_gi, s_account){
    this.s_gi = s_gi;
    this.s_account = s_account;
  }
  
  sendEvar(eVars:any, message:string):void{
    if(!this.s_gi || !this.s_account) return;
    try {
      let s = this.s_gi(this.s_account);
      let eVarKeys = Object.keys(eVars);
      s.linkTrackVars = eVarKeys.join(",");
      eVarKeys.forEach((eVarKey) => {
        s[eVarKey] = eVars[eVarKey];
      });
      s.tl(this, "o", message);
    } catch (e) {}
  }

  sendEvent(events:string[], message:string):void{
    if(!this.s_gi || !this.s_account) return;
    try {
      let s = this.s_gi(this.s_account);
      s.linkTrackVars = 'events';
      s.linkTrackEvents = events.join(",");
      s.events = events.join(",");
      s.tl(this, "o", message);
    } catch (e) {}
  }
}