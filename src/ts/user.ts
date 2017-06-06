import * as Promise from "bluebird";
import {API} from "./api";

export default class User{
  state: any;
  props: any;
  api: API;
  handleChangeStateFuncs: Function[];
  
  constructor(api:API){
    this.api = api;
    this.handleChangeStateFuncs = [];
  }

  init():Promise<User>{
    return this.api.user.load()
    .then((props) => {
      this.props = props;
      return this;
    })
  }

  setState(nextState:Object):void{
    this.state = Object.assign(this.state, nextState);
    Promise.resolve(this.handleChangeStateFuncs)
    .map((func:Function) => func(this.state))
    .then(console.log)
    .catch(console.error);
  }  

  onChangeState(cb:Function): void{
    this.handleChangeStateFuncs.push(cb);
  };
}