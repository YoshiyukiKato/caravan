import Promise from "bluebird";

type cb = (value:any) => any;

export class StateSensor{
  private isActive:boolean = false;
  private state:any = {};
  private sensors:SensorUnit[] = [];
  private cbs:cb[] = [];
  
  use(sensor:SensorUnit){
    this.state[sensor.name] = sensor.value;
    sensor.onChange(function(this:StateSensor, sensor:SensorUnit){
      let nextState:any = {};
      nextState[sensor.name] = sensor.value;
      this.setState(nextState);
    }.bind(this, sensor));
    this.sensors.push(sensor);
  }

  activate(){
    if(this.isActive) return;
    this.isActive = true;
    this.sensors.forEach((sensor:SensorUnit) => sensor.watch());
  }

  setState(nextState:any){
    this.state = Object.assign(this.state, nextState);
    this.cbs.forEach((cb:cb) => cb(this.state));
  }

  onChange(cb:cb){
    this.cbs.push(cb);
  }
}

export abstract class SensorUnit{
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