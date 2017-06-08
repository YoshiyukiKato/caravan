import * as Promise from "bluebird";
import {API,util} from "../../src/api";

const testUser = {
  name : "test",
  age : 20,
  sex : 1
};

const testItems = [];
for(let i = 0; i<10; i++){
  testItems.push({
    id : `test_${i}`,
    src : `/src/test`
  });
}

export default class TestAPI extends API{
  user = {
    load: () => { 
      return Promise.resolve(testUser);
    }
  }
  
  approach = {
    load: () => {
      return Promise.resolve({items:testItems});
    }
  }
}