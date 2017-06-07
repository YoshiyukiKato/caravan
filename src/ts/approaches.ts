import * as Promise from "bluebird";
import User from "./user";
import {API} from "./api";

declare global {
  interface Window {
    __import_gizmo_item__?: () => void;
  }
}

export default class Approaches{
  private itemMap: Map<string, Approach> = new Map<string, Approach>();
  private itemList: Approach[] = [];
  private api:API;

  constructor(api:API){
    this.exposeImport();
    this.api = api;
  }

  create(item:{id:string, src:string}){
    const newItem = new Approach(item);
    this.itemMap.set(item.id, newItem);
    this.itemList.push(newItem);
    return newItem;
  }

  init():Promise<Approaches>{
    const loadPromises = this.api.approach.load() //apiからリストを取り寄せ
    .then(({items}) => items)
    .map((item:{id:string, src:string}) => this.create(item));
    
    return Promise.all(loadPromises)
    .map((approach:Approach) => approach.loadScript)
    .then(() => this);
  }

  import(id:string, render:Function):void{
    const approach = this.itemMap.get(id);
    if(approach) approach.setRender(render.bind(approach));
  }

  private exposeImport():void{
    window.__import_gizmo_item__ = this.import.bind(this);
  }

  all():Approach[]{
    return this.itemList;
  }

  find(id:string):Approach | undefined{
    return this.itemMap.get(id);
  }

  renderAll(user:User):Promise<any>{
    const promises = this.itemList.map((Approach) => Approach.render(user));
    return Promise.all(promises).then((result) => result);
  }
}

class Approach{
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
    
    document.body.appendChild(script);
    this.isScriptLoaded = true;
    //ここで読み込むソースの中に、__init_gizmo_item__("id", () => {})がある
  }

  setRender(render: (user:User) => Promise<any>):void{
    this.render = render;
  }
}