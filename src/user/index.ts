import Promise from "bluebird";
import {StateSensor} from "./state-sensor";
import {PropsLoader} from "./props-loader";

type handleChangeFunc = (user:{ props:any, state:any }) => any

export default class User{
  public state: any = { isInitialized : false };
  public props: any = {};
  public handleChangeFuncs: handleChangeFunc[] = [];
  
  constructor(){}
  
  get data(){
    return {
      props : this.props,
      state : this.state
    }
  }

  setStateSensor(stateSensor:StateSensor){
    stateSensor.onChange((userState:any) => this.setState(userState));
    stateSensor.activate();
  }

  setPropsLoader(propsLoader:PropsLoader){
    propsLoader.onChange((userProps:any) => this.setProps(userProps));
    propsLoader.load();
  }

  setProps(nextProps:any, silent:boolean=false):Promise<User>{
    this.props = Object.assign(this.props, nextProps);
    if(!silent){
      const promises = Promise.map(this.handleChangeFuncs, (func:handleChangeFunc) => func(this.data));
      return Promise.all(promises).then(() => { return this; });
    }else{
      return Promise.resolve(this);
    }
  }

  setState(nextState:any, silent:boolean=false):Promise<User>{
    this.state = Object.assign(this.state, nextState);
    if(!silent){
      return Promise.map(this.handleChangeFuncs, (func:handleChangeFunc) => func(this.data))
      .then(() => this);
    }else{
      return Promise.resolve(this);
    }
  }

  onChange(cb:handleChangeFunc):void{
    this.handleChangeFuncs.push(cb);
  };
}