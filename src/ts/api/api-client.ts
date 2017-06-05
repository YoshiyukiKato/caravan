import * as Promise from "bluebird";

export default abstract class ApiClient{
  abstract getItems():Promise<any>
	abstract getUser():Promise<any>
}