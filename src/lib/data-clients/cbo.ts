import DataClient from "./data-client";

class CBO extends DataClient{
	constructor(){
		super();
	}

	load(){
		const visitorId = $("#se_id").attr("content");
		if(!visitorId) return;
		const reqUrl = `https://dccvn6mpyh.execute-api.ap-northeast-1.amazonaws.com/dev/hat?visitor_id=${visitorId}`;
		return this._load(reqUrl);
	}

	onLoad(loadStartAt, data){
		if(!data.status || data.property.age === "" || data.property.sex === ""){
			throw new Error("no_data"); //データなし
		}

		let now = new Date();
		if(now.getTime() - loadStartAt.getTime() > 1000){
			throw new Error("timeout");//時間制限超過
		}
		return data.property;
	}
	
	onError(err){
		console.log(err);
		return {};
	}
}