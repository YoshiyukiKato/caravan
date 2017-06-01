import Promise from "bluebird";
import $ from "jquery";

export default abstract class DataClient {
	abstract load(): void;
	_load(reqUrl): Promise<Object> {
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
	abstract onError(Error);
}