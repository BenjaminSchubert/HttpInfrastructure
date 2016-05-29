import {Http, Headers} from "angular2/http";
import {Inject, Injectable} from "angular2/core";
import {CookieService} from "angular2-cookie/core";


@Injectable()
export class SimpleTODOHeaders {
    constructor(@Inject(Http) private http: Http, @Inject(CookieService) private cookies: CookieService) {
        this.http.get("api/auth/csrf");
    }

    public baseHeaders() {
        let headers: Headers = new Headers();
        headers.append("X-CSRFTOKEN", this.cookies.get("csrftoken"));
        return headers;
    }
    public jsonHeaders() {
        let headers = this.baseHeaders();
        headers.append("Content-Type", "application/json");
        return headers;
    }
    
    public postHeaders() {
        let headers = this.baseHeaders();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        return headers;
    }

}
