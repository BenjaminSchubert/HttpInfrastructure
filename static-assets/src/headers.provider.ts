import {Http, Response, Headers} from "angular2/http";
import {OnInit} from "angular2/core";
import {CookieService} from "angular2-cookie/core";


export class SimpleTODOHeaders implements OnInit {
    constructor(private http: Http, private cookies: CookieService) {

    }

    ngOnInit() {
        //this.http.get("api/csrf")
        //    .map((res: Response) => this.cookies.put("X-CSRFTOKEN", res["csrf"]))
        //    .catch(this.handleError);
    }

    private handleError (error: Response) {
        console.log(error.json().error);
    }

    public headers() {
        let headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("X-CSRFTOKEN", this.cookies.get("X-CSRFTOKEN"));
        return headers;
    }

}

export const HeadersService: any[] = [
    SimpleTODOHeaders
];
