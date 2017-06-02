//common
import {jsdom} from "jsdom";
import * as jquery from "jquery";
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