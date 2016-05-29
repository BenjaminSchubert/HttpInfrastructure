import {Http, Headers} from "angular2/http";
import {Injectable} from "angular2/core";
import {CookieService} from "angular2-cookie/core";


@Injectable()
export class SimpleTODOHeaders {
    constructor(private http: Http, private cookies: CookieService) {}

    public baseHeaders() {
        let headers: Headers = new Headers();

        if (this.cookies.get("csrftoken") == null) {
            this.http.get("/api/auth/csrf").subscribe();
        }
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
