import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {UserService} from "./user.service";
import {FormBuilder, ControlGroup, Validators, Control} from "angular2/common";

@Component({
    selector: 'login',
    templateUrl: 'user/login.html',
    styleUrls: ['css/user/login.css']
})
export class LoginComponent {
    private username: string;
    private password: string;
    
    private username_ctrl = new Control('', Validators.required);
    private password_ctrl = new Control('', Validators.required);

    private loginForm: ControlGroup;
    private triedSending: boolean = false;

    constructor(private userService: UserService, private router: Router, private builder: FormBuilder) {
        this.loginForm = builder.group({
            username: this.username_ctrl,
            password: this.password_ctrl
        });
    }

    login() {
        this.userService.login(this.username, this.password).subscribe(
            (result) => this.router.navigate(['Todo']),
            err => this.handleError(err.json())
        );
        this.triedSending = true;
    }

    handleError(err: any) {
        for (let entry in err) {
            if (entry == "global") {
                this.loginForm.setErrors({"serverError": err["global"]});
            }
            else {
                this.loginForm.controls[entry].setErrors({"serverError": err[entry]});
            }
        }
    }

    errors(errors: any) : string {
        if (errors == null || errors.length == 0) {
            return;
        }
        else if ("required" in errors) {
            return "This field is required";
        }
        else if ("serverError" in errors) {
            return errors["serverError"];
        }
        else {
            console.log("No error set for", errors);
            return "undefined error";
        }
    }
}
