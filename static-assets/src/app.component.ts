import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_PROVIDERS, Router, ROUTER_DIRECTIVES} from "angular2/router";
import {SimpleTODOHeaders} from "./headers.provider";
import {HTTP_PROVIDERS} from "angular2/http";
import "rxjs/Rx";
import {CookieService} from "angular2-cookie/core";
import {LoginComponent} from "./user/login.component";
import {TodoComponent} from "./todo/todo.component";
import {UserService} from "./user/user.service";
import {AuthenticatedRequest} from "./auth/authenticatedrequest.service";
import {TodoService} from "./todo/todo.service";


@Component({
    selector: 'simpletodo',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, CookieService, SimpleTODOHeaders, UserService, AuthenticatedRequest, TodoService],
    templateUrl: './base.html'
})

@RouteConfig([
    {path: '/todo', name: 'Todo', component: TodoComponent, useAsDefault: true},
    {path: '/login', name: 'Login', component: LoginComponent, data: {unprotected: true}},
])

export class AppComponent implements OnInit{
    title = 'SimpleTODO';
    
    constructor(private router: Router, private userService: UserService) {} // userService needed in the template
    
    ngOnInit() {
        this.router.navigate(['Todo']);
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['Login']);
    }
}
