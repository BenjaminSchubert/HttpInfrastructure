import {Component} from "angular2/core";
import {ControlGroup, Validators, Control} from "angular2/common";

@Component({})
export class BaseAuthFormComponent {
    protected username: string = "";
    protected password: string = "";
    
    protected usernameCtrl = new Control('', Validators.required);
    protected passwordCtrl = new Control('', Validators.required);

    protected authForm: ControlGroup;

    handleError(err: any) {
        for (let entry in err) {
            if (entry == "global") {
                this.authForm.setErrors({"serverError": err["global"]});
            }
            else {
                this.authForm.controls[entry].setErrors({"serverError": err[entry]});
            }
        }
    }

    errors(errors: any) : string {
        if (errors == null || errors.length == 0) {
            return;
        }
        else if ("required" in errors) {
            return "This field is required";
        } else if ("equals" in errors) {
            return "Password do not match";
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
