import Stuff from "./stuff";

export default class Approach extends Stuff{
  constructor(props){
    super(props);
  }

  get initialState(){
    return {
      arg : null
    }
  }

  load(codebase){
    const script = document.createElement("script");
    script.src = `${codebase}/${this.props.id}.js`;
    document.querySelector("body").appendChild(script);
  }

  init(user, adapt, render){
    const firstArg = adapt(user.state);
    render(firstArg);
    //react使いたい
    user.onChange((nextState, prevState) => {
      const nextArg = adapt(nextState);
      if(nextArg !== this.state.arg){
        this.setState({ arg : nextArg });
        render(nextArg);
      };
    });
  }
}