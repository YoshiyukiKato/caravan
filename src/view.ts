import * as Promise from "bluebird";
import User from "./user";

type renderFunc = (user:any) => any;

export default class View{
  private components:Component[] = [];
  private props:any = { user : null };
  private state:any = { renderCount : 0 };

  constructor(){}

  /**
   * 施策のコンポーネントを取り込む
   * @param id コンポーネントの識別id。施策idなどを入れる
   * @param _render DOMの生成や更新をする関数。
   */
  import(id:string, _render:renderFunc){
    const component = new Component(id, _render);
    this.components.push(component);
    if(!!this.props.user) component.render(this.props.user);
  }

  /**
   * userデータを引数に取り、保持するcomponentsすべてのrenderメソッドを呼び出
   * @param user ユーザ情報。属性情報などを持っている 
   */
  render(user:any){
    this.props.user = user;
    const renderPromise = this.components.map((component:Component) => {
      return component.render(user)
    });
    
    return Promise.all(renderPromise).then(() => {
      console.log(`view updated : ${this.state.renderCount}`);
      this.state.renderCount += 1;
    });
  }
}

export class Component{
  private id : string;
  private _render:renderFunc;
  private state:any = {};
  constructor(id:string, _render:renderFunc){
    this.id = id;
    this._render = _render;
  }
  
  /**
   * ユーザ情報を引数にとって、DOMを操作する
   * @param user 
   */
  render(user:any){
    return new Promise((resolve, reject) => {
      try{
        this._render(user);
        resolve(this);
        return null;
      }catch(e){
        reject(e);
        return null;
      }
    }); 
  }
}