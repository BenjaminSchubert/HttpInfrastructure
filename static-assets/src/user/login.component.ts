import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {UserService} from "./user.service";

@Component({
    selector: 'login',
    templateUrl: 'user/login.html',
    styleUrls: ['css/user/login.css']
})


export class LoginComponent {
    constructor(private userService: UserService, private router: Router) {}

    onSubmit(email: string, password: string) {
        this.userService.login(email, password).subscribe((result) => {
            if (result) {
                this.router.navigate(['Todo']);
            }
        });
    }
}
