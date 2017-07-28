import * as Promise from "bluebird";
import $ from "jquery";

export interface ViewConfig{
  components : ComponentConfig[]
}

export interface ComponentConfig{
  id : string;
  _render : (props:any) => any;
}

export abstract class ViewLoader{
  abstract load():Promise<ViewConfig>
}