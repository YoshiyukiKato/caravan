import * as React from "react";
import * as ReactDOM from "react-dom";
import {UserProfile} from "../user-attrs/profile";
import {ViewComponent} from "../../../src";

interface AppProps{
  userAttrs : {
    "user-profile" : UserProfile;
  };
}

class App extends React.Component<AppProps, any>{
  constructor(props:AppProps){
    super(props);
  }
  
  render(){
    const profile = this.props.userAttrs["user-profile"];
    return <div>
      <h1>User info</h1>
      <div>name : {profile.name}</div>
      <div>age : {profile.age}</div>
      <div>sex : {profile.sex}</div>
    </div>;
  }
}

export default class ProfileReact extends ViewComponent{
  id : "profile-react";
  render(userAttrs:any){
    ReactDOM.render(<App userAttrs={userAttrs}/>, document.querySelector("#user-profile"));
  }
}