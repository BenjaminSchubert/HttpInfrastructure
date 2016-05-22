import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_PROVIDERS, Router, ROUTER_DIRECTIVES} from "angular2/router";
import {HeadersService} from "./headers.provider";
import {HTTP_PROVIDERS} from "angular2/http";
import "rxjs/Rx";
import {CookieService} from "angular2-cookie/core";
import {LoginComponent} from "./user/login.component";
import {TodoComponent} from "./todo/todo.component";
import {SecureRouterOutlet} from "./secureRouter.outlet";
import {UserService} from "./user/user.service";


@Component({
    selector: 'simpletodo',
    directives: [SecureRouterOutlet, ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, CookieService, HeadersService, UserService],
    templateUrl: './base.html'
})

@RouteConfig([
    {path: '/todo', name: 'Todo', component: TodoComponent, useAsDefault: true},
    {path: '/login', name: 'Login', component: LoginComponent, data: {unprotected: true}},
    {path: '/logout', name: 'Logout', component: LoginComponent}
])

export class AppComponent implements OnInit{
    title = 'SimpleTODO';
    
    constructor(private router: Router, private userService: UserService) {}
    
    ngOnInit() {
        this.router.navigate(['Login']);
    }
}
