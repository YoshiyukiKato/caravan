import App from "../app";
import User from "../user";

export default class GizmoItems{
  private itemMap: Map<string, GizmoItem> = new Map<string, GizmoItem>();
  private itemList: GizmoItem[] = [];
  
  create(item:{id:string, src:string}){
    const newItem = new GizmoItem(item);
    this.itemMap[item.id] = newItem;
    this.itemList.push(newItem);
    newItem.init();
    return newItem;
  }

  all(){
    return this.itemList;
  }

  find(id:string){
    return this.itemMap[id];
  }
}

class GizmoItem{
  private id:string;
  private src:string;
  public render:Function(user:User);
  constructor(item:{id:string, src:string}){
    this.id = item.id;
    this.src = item.src;
  }

  init(){
    const script = document.createElement("script");
    script.id = this.id;
    script.src = this.src;
  }

  setRender(render:Function(user:User)){
    this.render = render;
  }
}