import * as Promise from "bluebird";
import {API} from "./api";

export default class User{
  public state: any = { isInitialized : false };
  public props: any = {};
  public handleChangeStateFuncs: Function[] = [];
  private api: API;
  
  constructor(api:API){
    this.api = api;
  }

  init():Promise<User>{
    return this.api.user.load()
    .then((props) => {
      this.props = props;
      return this.setState({ isInitialized : true });
    });
  }

  setState(nextState:Object):Promise<User>{
    this.state = Object.assign(this.state, nextState);
    return Promise.resolve(this.handleChangeStateFuncs)
    .map((func:Function) => func(this.state))
    .then(() => this);
  }

  onChangeState(cb:Function): void{
    this.handleChangeStateFuncs.push(cb);
  };
}