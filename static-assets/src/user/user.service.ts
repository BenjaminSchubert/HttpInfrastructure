import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {SimpleTODOHeaders} from "../headers.provider";

@Injectable()
export class UserService {
    private loggedIn = false;

    constructor(private http: Http, private headers: SimpleTODOHeaders) {
        console.log("CREATED");
    }
    
    login(username: string, password: string) {
        return this.http.post("/api/auth/login", JSON.stringify({username, password}), {headers: this.headers.headers()})
            .map(res => res.json())
            .map((res) => {
                console.log(res);
            });
    }

    logout() {
        // implement
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}
