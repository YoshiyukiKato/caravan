import Promise from "bluebird";

type cb = (value:any) => any;

export class UserUpdater{
  private isActive:boolean = false;
  private state:any = {};
  private updaters:UpdaterUnit[] = [];
  private cbs:cb[] = [];
  
  use(updater:UpdaterUnit){
    this.state[updater.name] = updater.value;
    updater.onChange(function(this:UserUpdater, updater:UpdaterUnit){
      let nextState:any = {};
      nextState[updater.name] = updater.value;
      this.setState(nextState);
    }.bind(this, updater));
    this.updaters.push(updater);
  }

  activate(){
    if(this.isActive) return;
    this.isActive = true;
    this.updaters.forEach((updater:UpdaterUnit) => updater.watch());
  }

  setState(nextState:any){
    this.state = Object.assign(this.state, nextState);
    this.cbs.forEach((cb:cb) => cb(this.state));
  }

  onChange(cb:cb){
    this.cbs.push(cb);
  }
}

export abstract class UpdaterUnit{
  name:string;
  value:any;
  private cbs:cb[] = [];

  constructor(name:string, defaultValue:any){
    this.name = name;
    this.value = defaultValue;
  }
  
  onChange(cb:cb){
    this.cbs.push(cb);
  }

  change(){
    this.cbs.forEach((cb:cb) => cb(this.value));
  }

  abstract watch():any;
}