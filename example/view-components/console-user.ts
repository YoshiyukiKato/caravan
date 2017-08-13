import {ViewComponent} from "../../src";


export default class ConsoleUser extends ViewComponent{
  constructor(){
    super("console-user", (user:any) => {
      console.log(user);
    });
  }
}