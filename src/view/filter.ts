export default abstract class Filter{
  abstract componentId:string;
  abstract validate(userAttrs:any):boolean;
}