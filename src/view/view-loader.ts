import Promise from "bluebird";
import * as $ from "jquery";

export interface ViewConfig{
  components : ComponentConfig[]
}

export interface ComponentConfig{
  id : string;
  _render : (props:any) => any;
}

export abstract class ViewLoader{
  private env : "dev"|"prod";
  abstract load():Promise<ViewConfig>;
}