import DataClient from "./data-client";


//CBOとかはサービスによって違うので、個別実装する
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

		return data.property;
	}
	
	onError(err){
		throw err;
	}
}