import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {SimpleTODOHeaders} from "../headers.provider";

@Injectable()
export class UserService {
    private loggedIn: boolean = true;
    private triedLocked: boolean = false;

    constructor(private http: Http, @Inject(SimpleTODOHeaders) private headers: SimpleTODOHeaders) {}

    login(username: string, password: string) {
        return this.http.post(
                "/api/auth/login/", "username=" + username + "&password=" + password,
                {headers: this.headers.postHeaders()})
            .map((res) => {
                this.loggedIn = true;
                this.triedLocked = false;
                return res.json;
            });
    }

    logout() {
        this.http.get("/api/auth/logout/", {headers: this.headers.baseHeaders()})
            .map((res) => {
                this.loggedIn = false;
                this.triedLocked = true;
            }).subscribe();
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    setLoggedOut() {
        this.loggedIn = false;
    }
}
