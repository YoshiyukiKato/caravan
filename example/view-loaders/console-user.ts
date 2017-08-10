import Promise from "bluebird";
import {ViewLoader} from "../../src";

export default class ConsoleUser extends ViewLoader{
  load(){
    return Promise.resolve({
      components : [
        {
          id: "console-user",
          _render: (user:any) => {
            console.log(user);
          }
        }
      ]
    });
  }
}