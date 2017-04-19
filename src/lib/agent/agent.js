import Promise from "bluebird";
import $ from "jquery"; //jqueryはexternalにしてビルドする
import User from "./user";
import Service from "./service";

export default class Agent{
  constructor({ env, api, codebase }, url=""){
    this.env = env; //dev|prod
    this.api = api; //api-gatewayのurl
    this.codebase = codebase; //s3のurl
    this.url = url; //サイトのurl
    this.services = [];
    this.user = null;
  }

  init(){
    this.exportProvide();
    const servicesPromise = this.getServices();
    const userDataPromise = this.getUserData();
    Promise.all([userDataPromise, servicesPromise])
    .then((result) => {
      this.user = result[1];
      this.services = result[0];
      this.services.forEach((service) => {
        service.load(this.codebase);
      });
    });
  }

  //サービスのリストを全部取ってきて、URLのパターンで絞り込む
  getServices(){
    return new Promise((resolve, reject) => {
      $.ajax({
        type : "GET",
        url : `${this.api}/services`,
        dataType : "json",
        success : (res) => { resolve(res.services); },
        error : (err) => { reject(new Error(err.message)); }
      });
    })
    .filter((service) => {
      //パターンが未定義なら除外
      if(!service.pattern) return false;
      //urlにマッチするサービスのみ抽出
      const regexp = new RegExp(pattern);
      return !!this.url.match(regexp);
    })
    .reduce((services, service) => {
      //idで引けるようにして
      services[service.id] = new Service(service);
      return services;
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
        url : `${this.api}/data_sources`,
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
    window[`__gizmo_provide_${this.env}__`] = this.provideService.bind(this);
  }

  provideService(id, adapt, render){
    const service = this.services[id];
    if(!!service) service.init(this.user, adapt, render);
  }
}