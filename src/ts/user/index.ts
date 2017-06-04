import * as Promise from "bluebird";

export default class User{
  state: any;
  props: any;
  handleChangeStateFuncs: Function[];
  
  constructor(props){
    this.props = props;
    this.handleChangeStateFuncs = [];
  }

  setState(nextState:Object){
    this.state = Object.assign(this.state, nextState);
    Promise.resolve(this.handleChangeStateFuncs)
    .map((func:Function) => func(this.state))
    .then(console.log)
    .catch(console.error);
  }  

  onChangeState(cb): void{
    this.handleChangeStateFuncs.push(cb);
  };
}