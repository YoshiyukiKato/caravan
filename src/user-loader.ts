import * as Promise from "bluebird";

type cb = (userProps:any) => any;

export class UserLoader{
  private isLoaded:boolean = false;
  private state:any = {};
  private loaders:LoaderUnit[] = [];
  private cbs:cb[] = [];
  
  use(loader:LoaderUnit){
    this.state[loader.name] = loader.value;
    loader.onChange(function(this:UserLoader, sensor:LoaderUnit){
      let nextState:any = {};
      nextState[sensor.name] = sensor.value;
      this.setState(nextState);
    }.bind(this, loader));
    this.loaders.push(loader);
  }

  load(){
    if(this.isLoaded) return;
    this.isLoaded = true;
    this.loaders.forEach((loader:LoaderUnit) => loader.load());
  }

  reload(loaderName:string){
    const loader = this.loaders.find((loader:LoaderUnit) => loader.name === loaderName);
    if(!loader) return;
    loader.load();
  }

  setState(nextState:any){
    this.state = Object.assign(this.state, nextState);
    this.cbs.forEach((cb:cb) => cb(this.state));
  }

  onChange(cb:cb){
    this.cbs.push(cb);
  }
}

export abstract class LoaderUnit{
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

  change(value:any){
    this.value = value;
    this.cbs.forEach((cb:cb) => cb(this.value));
  }

  abstract load():any;
}