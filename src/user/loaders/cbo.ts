import * as Promise from "bluebird";
import {LoaderUnit} from "../props-loader";

export default abstract class CBO extends LoaderUnit{
	endpoint: string;
	
	constructor(endpoint:string){
		super("cbo", null);
		this.endpoint = endpoint;
	}

	abstract getVisitorId():string;
	load(){
		const visitorId = this.getVisitorId();
		if(!visitorId) return Promise.reject(new Error("no visitor id"));
		const reqUrl = `${this.endpoint}?visitor_id=${visitorId}`;
		httpGet(reqUrl).then(this.onLoad.bind(this)).catch(this.onError.bind(this))
	}

	onLoad(data:any){
		if(!data.status || data.property.age === "" || data.property.sex === ""){
			throw new Error("no_data"); //データなし
		}
		this.change(data.property);
	}
	
	onError(err:Error){
		throw err;
	}
}

function httpGet(reqUrl:string){
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "GET",
			url: reqUrl,
			dataType: "json",
			success: resolve,
			error: reject
		});
	});
}