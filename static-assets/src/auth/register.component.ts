import {BaseAuthFormComponent} from "./baseAuth.component";
import {Component} from "angular2/core";
import {UserService} from "./user.service";
import {Router} from "angular2/router";
import {FormBuilder, Validators, Control, ControlGroup} from "angular2/common";


@Component({
    selector: 'register',
    templateUrl: 'auth/register.html',
    styleUrls: ['css/auth/auth.css']
})
export class RegisterComponent extends BaseAuthFormComponent {
    private repeat: string = "";

    private repeatCtrl = new Control('', Validators.required);
    private matchingPasswordCtrl;

    constructor(private userService: UserService, private router: Router, private builder: FormBuilder) {
        super();
        
        this.matchingPasswordCtrl = builder.group({
                password: this.passwordCtrl,
                repeat: this.repeatCtrl
            }, 
            {validator: this.equals}
        );
        
        if (this.userService.isLoggedIn()) {
            this.router.navigate(["TODO"]);
        }
        this.authForm = builder.group({
            username: this.usernameCtrl,
            matchingPasswords: this.matchingPasswordCtrl
        });
    }

    equals(control: ControlGroup) : any {
        let values = [];
        for (let entry in control.controls) {
            values.push(control.controls[entry].value);
        }

        let first = values.pop();
        for (let entry of values) {
            if (first != entry) {
                return { "equals": true };
            }
        }
        return null;
    }

    register() {
        this.userService.register({ username: this.username, password: this.password }).subscribe(
            (result) => this.router.navigate(['Todo']),
            err => this.handleError(err.json())
        );
    }
}
