//common
import {jsdom} from "jsdom";
import * as jquery from "jquery";

declare global{
  interface Window{
    XMLHttpRequest:XMLHttpRequest;
  }
  
  namespace NodeJS{
    interface Global {
      jsdom?: any;
      sinon?: any;
      $?:JQuery;
      document?: Document;
      window?:Window;
      XMLHttpRequest?:XMLHttpRequest;
      navigator?:Navigator;
    }
  }
}

global.jsdom = jsdom;
global.document = global.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.XMLHttpRequest = global.window.XMLHttpRequest;
global.navigator = window.navigator;

import * as sinon from "sinon";
global.sinon = sinon;
global.sinon.useFakeXMLHttpRequest();
global.window.XMLHttpRequest = global.XMLHttpRequest;
global.$ = jquery(global.window);