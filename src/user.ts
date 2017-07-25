import * as Promise from "bluebird";

type handleChangeFunc = (user:User) => any

export default class User{
  public state: any = { isInitialized : false };
  public props: any = {};
  public handleChangeFuncs: handleChangeFunc[] = [];
  
  constructor(){}

  setProps(nextProps:any):Promise<User>{
    this.props = Object.assign(this.props, nextProps);
    return Promise.resolve(this.handleChangeFuncs)
    .map((func:handleChangeFunc) => func(this.state))
    .then(() => this);
  }

  setState(nextState:any):Promise<User>{
    this.state = Object.assign(this.state, nextState);
    return Promise.resolve(this.handleChangeFuncs)
    .map((func:handleChangeFunc) => func(this))
    .then(() => this);
  }

  onChange(cb:handleChangeFunc):void{
    this.handleChangeFuncs.push(cb);
  };
}