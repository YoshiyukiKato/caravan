import clone from "clone";
import { Component } from "react";

export default class Wrapper extends Component<any, any>{
  constructor(props:any){
    super(props);
    this.state = Object.assign({}, props);
  }

  componentDidMount(){
    this.props.onChange(this.setState.bind(this));
  }
  
  render(){
    const nextProps = clone(this.state);
    return <Component {...nextProps}/>
  }
}

