export default class User{
  constructor(ids){
    for(id in this.supportedIDs){
      this[id] = ids[id];
    }
  }
  
  get supportedIDs(){
    return ["visitor_id"]; //サポートしてるid
  }

}