import Promise from "bluebird";
import Component, {renderFunc} from "./component";

export default class View{
  private components:Component[] = [];
  private props:any = { user : {} };
  private state:any = { renderCount : 0 };

  constructor(){}

  /**
   * 施策のコンポーネントを取り込む
   * @param id コンポーネントの識別id。施策idなどを入れる
   * @param _render DOMの生成や更新をする関数。
   */

  import(id:string, _render:renderFunc){
    const component = new Component(id, _render);
    this.use(component);
  }

  use(component:Component){
    this.components.push(component);
    if(!!this.props.user) component.render(this.props.user);
    return;
  }

  /**
   * userデータを引数に取り、保持するcomponentsすべてのrenderメソッドを呼び出
   * @param user ユーザ情報。属性情報などを持っている 
   */
  render(user:any){
    this.props.user = user;
    const renderPromise = this.components.map((component:Component) => {
      return component._render(user)
    });
    
    return Promise.all(renderPromise).then(() => {
      console.log(`view updated : ${this.state.renderCount}`);
      this.state.renderCount += 1;
    });
  }
}