import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {UserService} from "./user.service";
import {FormBuilder} from "angular2/common";
import {BaseAuthFormComponent} from "./baseAuth.component";

@Component({
    selector: 'login',
    templateUrl: 'auth/login.html',
    styleUrls: ['css/auth/auth.css']
})
export class LoginComponent extends BaseAuthFormComponent {
    private triedSending: boolean = false;

    constructor(private userService: UserService, private router: Router, private builder: FormBuilder) {
        super();
        this.authForm = builder.group({
            username: this.usernameCtrl,
            password: this.passwordCtrl
        });
        this.userService.setLoggedOut();
    }

    login() {
        this.userService.login(this.username, this.password).subscribe(
            (result) => this.router.navigate(['Todo']),
            err => this.handleError(err.json())
        );
        this.triedSending = true;
    }
    
    register() {
        this.router.navigate(["Register"]);
    }

}
