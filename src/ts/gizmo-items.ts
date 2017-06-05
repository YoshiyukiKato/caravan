import Promise from "bluebird";
import User from "./user";
import API from "./api";

export default class GizmoItems{
  private itemMap: Map<string, GizmoItem> = new Map<string, GizmoItem>();
  private itemList: GizmoItem[] = [];
  private api:API;

  constructor(api:API){
    this.exposeImport();
    this.api = api;
  }

  create(item:{id:string, src:string}){
    const newItem = new GizmoItem(item);
    this.itemMap[item.id] = newItem;
    this.itemList.push(newItem);
    return newItem;
  }

  init():Promise<GizmoItems>{
    const loadPromises = this.api.gizmoItems.load() //apiからリストを取り寄せ
    .then(({gizmoItems}) => gizmoItems) //中身をとりだし
    .map((item:{id:string, src:string}) => this.create(item)); //全て登録
    
    return Promise.all(loadPromises)
    .map((gizmoItem:GizmoItem) => gizmoItem.loadScript)
    .then(() => this);
  }

  import(id, render):void{
    const gizmoItem = this.itemMap[id];
    gizmoItem.setRender(render.bind(gizmoItem));
  }

  private exposeImport():void{
    window["__import_gizmo_item__"] = this.import.bind(this);
  }

  all():GizmoItem[]{
    return this.itemList;
  }

  find(id:string):GizmoItem{
    return this.itemMap[id];
  }

  renderAll(user:User):Promise<any>{
    const promises = this.itemList.map((GizmoItem) => GizmoItem.render(user));
    return Promise.all(promises).then((result) => result);
  }
}

class GizmoItem{
  private isScriptLoaded:boolean = false;
  private id:string;
  private src:string;
  public render:(user:User) => Promise<any>;
  constructor(item:{id:string, src:string}){
    this.id = item.id;
    this.src = item.src;
  }

  loadScript():void{
    if(this.isScriptLoaded) return;
    const script = document.createElement("script");
    script.id = this.id;
    script.src = this.src;
    document.querySelector("body").appendChild(script);
    this.isScriptLoaded = true;
    //ここで読み込むソースの中に、__init_gizmo_item__("id", () => {})がある
  }

  setRender(render: (user:User) => Promise<any>):void{
    this.render = render;
  }
}