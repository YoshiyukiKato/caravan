import * as Promise from "bluebird";

export default class ApiClient{
  private baseUrl:string;
  constructor(baseUrl){
    this.baseUrl = baseUrl;
  }

  getItems(){
    return new Promise((resolve, reject) => {
			$.ajax({
				type: "GET",
				url: `${this.baseUrl}/gizmoItems`,
				dataType: "json",
				success: resolve,
				error: reject
			});
		})
  }
}