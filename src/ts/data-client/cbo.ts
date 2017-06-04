import DataClient from "./data-client";

export default class CBO extends DataClient{
	endpoint: string;
	constructor(endpoint:string){
		super();
		this.endpoint = endpoint;
	}

	load(visitorId){
		if(!visitorId) return;
		const reqUrl = `${this.endpoint}?visitor_id=${visitorId}`;
		return this._load(reqUrl);
	}

	onLoad(loadStartAt, data){
		if(!data.status || data.property.age === "" || data.property.sex === ""){
			throw new Error("no_data"); //データなし
		}

		/*let now = new Date();
		if(now.getTime() - loadStartAt.getTime() > 1000){
			throw new Error("timeout");//時間制限超過
		}*/
		return data.property;
	}
	
	onError(err){
		throw err;
	}
}