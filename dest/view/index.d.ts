/// <reference types="bluebird" />
import * as Promise from "bluebird";
import Component, { renderFunc } from "./component";
export default class View {
    private components;
    private props;
    private state;
    constructor();
    /**
     * 施策のコンポーネントを取り込む
     * @param id コンポーネントの識別id。施策idなどを入れる
     * @param _render DOMの生成や更新をする関数。
     */
    import(id: string, _render: renderFunc): void;
    use(component: Component): void;
    /**
     * userデータを引数に取り、保持するcomponentsすべてのrenderメソッドを呼び出
     * @param user ユーザ情報。属性情報などを持っている
     */
    render(user: any): Promise<void>;
}
