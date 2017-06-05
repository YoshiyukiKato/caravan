import * as Promise from "bluebird";

module HttpClient {
	export function get(reqUrl: string): Promise<Object> {
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

	export function post(reqUrl: string, data:any): Promise<Object> {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: "POST",
				url: reqUrl,
				contentType: "json",
				data:JSON.stringify(data),
				success: resolve,
				error: reject
			});
		});
	}
}