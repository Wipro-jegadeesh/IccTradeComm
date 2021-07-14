import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient, HttpParams, HttpClientModule } from "@angular/common/http";
// import { HttpModule } from '@angular/http';
import { Observable } from "rxjs";
// import { DeviceDetectorService } from 'ngx-device-detector';
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
// import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from "../service/loader.service";

let headers = new HttpHeaders();

@Injectable()
export class ApiService {
	deviceInfo;
	loginDatas: Array<any> = [];
	token;
	baseUrl;
	constructor(private loaderService: LoaderService,private http: HttpClient, public router: Router
	) {
		headers = headers.set("Content-Type", "application/json");
		headers = headers.set("type", "web");
        this.baseUrl =  environment.api_url
		this.setToken();
	}
	private formatErrors(error: any) {
		if (error.error.webStatus == 422) {
			this.router.navigateByUrl("/login")
		}
		this.loaderService.showLoadingIcon(false);
		return throwError(error);
	}
	get(path: any, params: HttpParams = new HttpParams()): Observable<any> {
		this.loaderService.showLoadingIcon(true);
		this.setToken();
		return this.http.get(`${path}`, { params, headers: headers }).pipe(
			map((res: Response) => {
				this.loaderService.showLoadingIcon(false);
				return res;
			}),
			catchError(this.formatErrors.bind(this))
		);
	}
	generalServiceget(path: any, params: HttpParams = new HttpParams()): Observable<any> {
		this.loaderService.showLoadingIcon(true);
		this.setToken();
		return this.http.get(`${path}`, { params, headers: headers }).pipe(
			map((res: Response) => {
				this.loaderService.showLoadingIcon(false);
				return res;
			}),
			catchError(this.formatErrors.bind(this))
		);
	}

		tempGet(path: any, params: HttpParams = new HttpParams()): Observable<any> {
			this.loaderService.showLoadingIcon(true);
			this.setToken();
			// ${this.baseUrl}
			return this.http.get(`${path}`, { params, headers: headers }).pipe(
				map((res: Response) => {
					this.loaderService.showLoadingIcon(false);
					return res;
				}),
				catchError(this.formatErrors.bind(this))
			);
		}
	

	// get(path: any, params: HttpParams = new HttpParams()): Observable<any> {
	// 	let params1 = `{
	// 		"invoiceDetails": {
	// 			"id": 1
	// 		}
	// 	}`
	// 	 let params2 = new HttpParams().set("requestData", encodeURIComponent(params1));
	// 	this.setToken();
	// 	return this.http.get(`${this.baseUrl}${path}`, {params: params2, headers: headers }).pipe(
	// 		map((res: Response) => {
	// 			return res;
	// 		}),
	// 		catchError(this.formatErrors.bind(this))
	// 	);
	// }



	put(path: string, body: any): Observable<any> {
		this.loaderService.showLoadingIcon(true);
		// this.setToken();
		return this.http
			.put(`${path}`, body, { headers: headers })
			.pipe(
				map((res: Response) => {
					this.loaderService.showLoadingIcon(false);
					return res;
				}),
				catchError(this.formatErrors.bind(this))
			);
	}
	putAd(path: string, body: any): Observable<any> {
		this.loaderService.showLoadingIcon(true);
		var token = localStorage.getItem("token");
		this.setToken();
		return this.http
			.put(`${this.baseUrl}${path}`, (body), { headers: { "Authorization": token } })
			.pipe(
				map((res: Response) => {
					this.loaderService.showLoadingIcon(false);
					return res;
				}),
				catchError(this.formatErrors.bind(this))
			);
	}
	multipartput(path: string, body: any): Observable<any> {
		this.loaderService.showLoadingIcon(true);
		var token = localStorage.getItem("token");
		return this.http
			.put(`${this.baseUrl}${path}`, body, { headers: { "Authorization": "Bearer " + token, "type": "web" } })
			.pipe(
				map((res: Response) => {
					this.loaderService.showLoadingIcon(false);
					return res;
				}),
				catchError(this.formatErrors.bind(this))
			);
	}


	post(path: string, body: any): Observable<any> {
		this.loaderService.showLoadingIcon(true);
		return this.http
			.post(`${path}`, body, { headers: headers })
			.pipe(
				map((res: Response) => {
					this.loaderService.showLoadingIcon(false);
					return res;
				}),
				catchError(this.formatErrors.bind(this))
			);
	}
	mulipartPost(path: string, body: any): Observable<any> {
		this.loaderService.showLoadingIcon(true);
		var token = localStorage.getItem("token");
		return this.http
			.post(`${this.baseUrl}${path}`, body, { headers: { "Authorization": "Bearer " + token, "type": "web" } })
			.pipe(
				map((res: Response) => {
					this.loaderService.showLoadingIcon(false);
					return res;
				}),
				catchError(this.formatErrors.bind(this))
			);
	}

	delete(path): Observable<any> {
		this.loaderService.showLoadingIcon(true);
		return this.http
			.delete(`${this.baseUrl}${path}`, {
				headers: headers
			})
			.pipe(
				map((res: Response) => {
					this.loaderService.showLoadingIcon(false);
					return res;
				}),
				catchError(this.formatErrors.bind(this))
			);
	}

	setToken() {
		this.token = localStorage.getItem("accessToken");
		if (this.token) {
			headers = headers.set("Authorization", "Bearer " + this.token);
		}
	}

	upload(path, params): Observable<any> {
		;
		let headers = new HttpHeaders();
		return this.http.post(`${this.baseUrl}${path}`, params, { headers: headers }).pipe(
			map((res: any) => {
				return res;
			})
		);
	}

	downloadFile(url) {
		;
		return this.http.get(url, { responseType: "blob" }).pipe(
			map((res: any) => {
				return res;
			})
		);
	}
}
