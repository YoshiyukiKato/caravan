import * as Promise from "bluebird";
import User from "./user";
import {API} from "./api";

declare global {
  interface Window {
    __import_gizmo_item__?: () => void;
  }
}

export class Approaches{
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
    const promises = this.api.approach.load() //apiからリストを取り寄せ
    .then(({items}) => items)
    .map((item:{id:string, src:string}) => this.create(item))
    .map((approach:Approach) => approach.loadScript());

    return Promise.all(promises)
    .then((result) =>  this);
  }

  import(id:string, render:Function):void{
    const approach = this.itemMap.get(id); //api経由で引いてくるのは後。とりあえず汎用化が先
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
    const promises = this.itemList.map((approach) => approach.render(user));
    return Promise.all(promises).then((result) => result);
  }
}

export class Approach{
  public isScriptLoaded:boolean = false;
  public isRenderSetted:boolean = false;
  readonly id:string;
  readonly src:string;
  private _render:(user:User) => Promise<any>;
  constructor(item:{id:string, src:string}){
    this.id = item.id;
    this.src = item.src;
  }

  loadScript():boolean{
    if(this.isScriptLoaded) return false;
    const script = window.document.createElement("script");
    script.id = this.id;
    script.src = this.src;
    window.document.body.appendChild(script);
    this.isScriptLoaded = true;
    return true;
    //ここで読み込むソースの中に、__init_gizmo_item__("id", () => {})がある
  }

  render(user:User):Promise<any>{
    if(!this._render) return Promise.resolve(null);
    return this._render(user);
  }

  setRender(_render: (user:User) => Promise<any>):void{
    this._render = _render;
    this.isRenderSetted = true;
  }
}