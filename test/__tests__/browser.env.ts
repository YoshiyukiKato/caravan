import * as jquery from "jquery";
declare global{
  namespace NodeJS{
    interface Global{
      $:any
    }
  }
}

global.$ = jquery;