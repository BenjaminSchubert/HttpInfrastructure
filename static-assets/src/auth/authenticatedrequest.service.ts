import {Http, Response} from "angular2/http";
import {Router} from "angular2/router";
import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";


@Injectable()
export class AuthenticatedRequest {
    constructor(private http: Http, private router: Router) {}

    delete<T>(url: string, headers?: any): Observable<T> {
        return this.http.delete(url, headers)
            .catch((err) => this.handleError(err))
    }

    get<T>(url: string, headers?: any): Observable<T> {
        return this.http.get(url, headers)
            .map((res) =>  res.json())
            .catch((err) => this.handleError(err))
    }

    post<T>(url: string, body: any, headers?: any): Observable<T> {
        return this.http.post(url, body, headers)
            .map((res) => res.json())
            .catch((err) => this.handleError(err))
    }
    
    put<T>(url: string, body: any, headers?: any): Observable<T> {
        return this.http.put(url, body, headers)
            .map((res) => res.json())
            .catch((err) => this.handleError(err))
    }
    
    handleError(err: Response) {
        if(err.status == 401) {
            this.router.navigate(["Login"]);
        }
        return Observable.throw(err)
    }
}
