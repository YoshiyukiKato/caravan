import Promise from "bluebird";

export default abstract class UserLoader{
  abstract load():Promise<any>
}