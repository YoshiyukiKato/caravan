import $ from "jquery";

export default class Stuff{
  constructor(props={}){
    this.props = props;
    this.state = this.initialState;
    this._history = [];
    this._onChangeCallbacks = [];
  }

  get initialState(){
    return {}
  }
  
  setState(newState, isAsync){
    const prevState = this._state;
    const nextState = Object.assign(prevState, newState);
    this._history.push(prevState);
    this._state = nextState;
    this._onChange(nextState, newState, prevState);
  }

  onChange(func){
    this._onChangeCallbacks.push(func);
  }

  removeOnChange(func){
    let i;
    for(i = 0; i<this._onChangeCallbacks.length; i++){
      if(this._onChangeCallbacks[i] === func){
        this._onChangeCallbacks.splice(i, 1);
        break;
      }
    }
  }

  _onChange(nextState, prevState){
    this._onChangeCallbacks.forEach((cb) => {
      setTimeout(() => { cb(nextState, prevState); }, 0);
    });
  }
}