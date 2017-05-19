import Promise from "bluebird";
import $ from "jquery"; //jqueryはexternalにしてビルドする
import User from "./user";
import Item from "./item";

export default class Agent{
  constructor({ env, api, codebase }, url=""){
    this.env = env; //dev|prod
    this.api = api; //api-gatewayのurl
    this.codebase = codebase; //s3のurl
    this.url = url; //サイトのurl
    this.items = [];
    this.user = null;
  }

  init(){
    this.exportProvide();
    const itemsPromise = this.getItems();
    const userDataPromise = this.getUserData();
    Promise.all([userDataPromise, itemsPromise])
    .then((result) => {
      this.user = result[1];
      this.items = result[0];
      this.items.forEach((item) => {
        item.load(this.codebase);
      });
    });
  }

  //itemsのリストを全部取ってきて、URLのパターンで絞り込む
  getItems(){
    return new Promise((resolve, reject) => {
      $.ajax({
        type : "GET",
        url : `${this.api}/gizmo-items`,
        dataType : "json",
        success : (res) => { resolve(res.items); },
        error : (err) => { reject(new Error(err.message)); }
      });
    })
    .filter((item) => {
      //パターンが未定義なら除外
      if(!item.pattern) return false;
      //urlにマッチするサービスのみ抽出
      const regexp = new RegExp(pattern);
      return !!this.url.match(regexp);
    })
    .reduce((items, item) => {
      //idで引けるようにして
      items[item.id] = new Item(item);
      return items;
    }, []);
  }

  getUserData(){
    //APIのリストを取得
    return this._loadDataList
    //一つずつユーザのデータを読みに行って、ひとまとめにする
    .map(this._loadData).reduce((userData, data)=>{
      userData[data.name] = data;
      return userData;
    }, this.userData)
    .then((userData) => {
      return new User(userData);
    });
  }

  _getDataSourceList(){
    return new Promise((resolve, reject) => {
      $.ajax({
        type : "GET",
        url : `${this.api}/data-apis`,
        dataType : "json",
        success : (res) => { resolve(res.dataSources); },
        error : (err) => { reject(new Error(err.message)); }
      });
    });
  }

  //ユーザデータのapi読みに行く
  _getData({ name, url, key_id }){
    return new Promise((resolve, reject) => {
      if(!this.user[key_id]) resolve({});
      $.ajax({
        type : "GET",
        url : `${url}?${key_id}=${this.user[key_id]}`,
        dataType : "json",
        success : (res) => {
          const result = {};
          result[name] = res;
          resolve(result);
        },
        error : (err) => { reject(new Error(err.message)); }
      });
    });
  }

  exportProvide(){
    window[`__gizmo_provide_${this.env}__`] = this.provideItem.bind(this);
  }

  provideItem(id, adapt, render){
    const item = this.items[id];
    if(!!item) item.init(this.user, adapt, render);
  }
}