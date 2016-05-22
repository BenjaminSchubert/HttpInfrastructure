import {Directive, DynamicComponentLoader, Attribute, ViewContainerRef} from "angular2/core";
import {RouterOutlet, Router, ComponentInstruction} from "angular2/router";
import {UserService} from "./user/user.service";

@Directive({
    selector: 'secured-outlet'
})
export class SecureRouterOutlet extends RouterOutlet {
    constructor(_elementRef: ViewContainerRef, _loader: DynamicComponentLoader, private parentRouter: Router,
                @Attribute('name') nameAttr: string, private userService: UserService
    ) {
        super(_elementRef, _loader, parentRouter, nameAttr);
    }

    activate(instruction: ComponentInstruction) {
        if (this.isSafe(instruction)) {
            return super.activate(instruction);
        }
        this.parentRouter.navigate(['Login']);
    }

    isSafe(url: ComponentInstruction) {
        return url.routeData.data["unprotected"] || this.userService.isLoggedIn()
    }
}
