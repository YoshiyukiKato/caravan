import * as Promise from "bluebird";
import User from "./user";
import {Approaches} from "./approach";
import {API} from "./api";

export default class App{
  isInitialized:boolean = false;
  loadedAt:Date;
  user:User;
  approaches:Approaches;

  constructor(api:API){
    this.loadedAt = new Date();
    this.user = new User(api);
    this.approaches = new Approaches(api);
  }

  init():Promise<App>{
    if(this.isInitialized) return Promise.resolve(this);
    const approachesPromise = this.approaches.init();
    const userPromise = this.user.init();
    return Promise.all([approachesPromise, userPromise])
    .then(() => {
      this.isInitialized = true;
      this.approaches.renderAll(this.user);
      return this;
    });
  }
}