import Promise from "bluebird";
import $ from "jquery"; //jqueryはexternalにしてビルドする

export default class Agent{
  constructor({ env, api, codebase }, User, url=""){
    this.env = env; //dev|prod
    this.api = api; //api-gatewayのurl
    this.codebase = codebase; //s3のurl
    this.user = new User(); //ユーザクラスを渡して初期化するようにする
    this.url = url; //サイトのurl
    this.services = []
    this.userData = {};
    this.state = this.initialState;
  }

  get initialState(){
    return {
      isServicesLoaded : false,
      isDataSourceLoaded : false
    }
  }

  init(){
    //1. 描画インタフェース関数のエクスポート
    this.exportRender();
    //2. サービスのロード & ユーザデータのロード
    //3. サービスのレンダリング
  }

  exportRender(){
    window[`__gizmo_render_${this.env}__`] = this.render;
  }

  //クロージャとして外に出しておく
  render(id, renderService){
    if(!!this.services[id]) renderService.bind(this)();
  }

  //サービスのリストを全部取ってきて、URLのパターンで絞り込む
  loadServices(){
    this.getServiceList()
    .then(this.getServices)
  }
  
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
    .then((services) => {
      this.services = res.services.filter((service) => {
        //urlにマッチするサービスのみ抽出
        const pattern = service.pattern || ".*";
        const regexp = new RegExp(pattern);
        return !!this.url.match(regexp);
      }).reduce((services, service) => {
        //idで引けるようにして
        services[service.id] = service;
        return services;
      }, this.services);
      
      //もし、ユーザデータのロードが終わっていたらレンダリング
      this.state.isServicesLoaded = true;
      if(this.state.isDataSourceLoaded) this.renderServices();
    })
    //エラーハンドリングは後々考える
    .catch((err) => {
      console.log(err);
    });
  }

  renderServices(){
    this.services.forEach((service) => {
      const script = document.createElement("script");
      script.src = `${this.codebase}/${service.id}.js`;
      $("body").append(script);
    });
  }

  getUserData(){
    //APIのリストを取得
    return new Promise((resolve, reject) => {
      $.ajax({
        type : "GET",
        url : `${this.api}/data_sources`,
        dataType : "json",
        success : (res) => { resolve(res.dataSources); },
        error : (err) => { reject(new Error(err.message)); }
      });
    })
    //一つずつユーザのデータを読みに行って、ひとまとめにする
    .map(this._loadUserData).reduce((userData, data)=>{
      userData[data.name] = data;
      return userData;
    }, this.userData)
    .then((userData) => {
      this.userData = userData;
      this.state.isDataSourceLoaded = true;
      if(this.state.isServicesLoaded) this.renderServices();;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //ユーザデータのapi読みに行く
  _loadUserData({ name, url, key_id }){
    return new Promise((resolve, reject) => {
      if(!this.user[key_id]) resolve({});
      $.ajax({
        type : "GET",
        url : `${url}?${key_id}=${this.user[key_id]}`,
        dataType : "json",
        success : (res) => {
          const result = {};
          result[name] = res;
          return result;
        },
        error : (err) => { reject(new Error(err.message)); }
      });
    });
  }
}