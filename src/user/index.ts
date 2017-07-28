import * as Promise from "bluebird";
import {StateSensor} from "./state-sensor";
import {PropsLoader} from "./props-loader";

type handleChangeFunc = (user:User) => any

export default class User{
  public state: any = { isInitialized : false };
  public props: any = {};
  public handleChangeFuncs: handleChangeFunc[] = [];
  
  constructor(){}

  setStateSensor(stateSensor:StateSensor){
    stateSensor.onChange((userState:any) => this.setState(userState));
    stateSensor.activate();
  }

  setPropsLoader(propsLoader:PropsLoader){
    propsLoader.onChange((userProps:any) => this.setProps(userProps));
    propsLoader.load();
  }

  setProps(nextProps:any):Promise<User>{
    this.props = Object.assign(this.props, nextProps);
    const promises = Promise.map(this.handleChangeFuncs, (func:handleChangeFunc) => { return func(this); })
    return Promise.all(promises).then(() => { return this; });
  }

  setState(nextState:any):Promise<User>{
    this.state = Object.assign(this.state, nextState);
    return Promise.map(this.handleChangeFuncs, (func:handleChangeFunc) => func(this))
    .then(() => this);
  }

  onChange(cb:handleChangeFunc):void{
    this.handleChangeFuncs.push(cb);
  };
}