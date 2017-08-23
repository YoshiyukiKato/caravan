import {ViewComponent} from "../../src";


export default class ConsoleUser extends ViewComponent{
  id : "console-user"
  render(user:any){
    console.log(user);
  }
}