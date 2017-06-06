import * as http from "./http-client";


//CBOとかはサービスによって違うので、個別実装する
export default class CBO{
	endpoint: string;
	constructor(endpoint:string){
		this.endpoint = endpoint;
	}

	load(visitorId:string){
		if(!visitorId) return;
		const reqUrl = `${this.endpoint}?visitor_id=${visitorId}`;
		return http.get(reqUrl);
	}

	onLoad(data:any){
		if(!data.status || data.property.age === "" || data.property.sex === ""){
			throw new Error("no_data"); //データなし
		}

		return data.property;
	}
	
	onError(err:Error){
		throw err;
	}
}