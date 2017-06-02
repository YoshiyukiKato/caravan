import * as Promise from "bluebird";

export default abstract class DataClient {
	abstract load(visitorId: string): void;
	_load(reqUrl: string): Promise<Object> {
		const loadStartedAt = new Date();
		return new Promise((resolve, reject) => {
			$.ajax({
				type: "GET",
				url: reqUrl,
				dataType: "json",
				success: resolve,
				error: reject
			});
		})
		.then(this.onLoad.bind(this, loadStartedAt))
		.catch(this.onError);
	}
	
	abstract onLoad(loadStartedAt:Date, data:Object): Promise<Object>;
	abstract onError(err:Error):never;
}