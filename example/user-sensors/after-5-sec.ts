import {SensorUnit} from "../../src"

export default class After5Sec extends SensorUnit{
  constructor(){
    super("after5sec", false);
  }
  
  watch(){
    setTimeout(() => {
      this.value = true;
      this.change();
    }, 5000);
  }
}