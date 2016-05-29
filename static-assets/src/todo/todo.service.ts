import {Injectable, Inject} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {AuthenticatedRequest} from "../auth/authenticatedrequest.service";
import {Todo} from "./todo";
import {SimpleTODOHeaders} from "../auth/headers.provider";
import {Response} from "angular2/http";
import {Observer} from "rxjs/Rx";


@Injectable()
export class TodoService {
    private todo_url = '/api/todo/';
    private todosObserver: Observer<Todo[]>;
    private todos: Todo[];
    todos$: Observable<Todo[]>;

    constructor (@Inject(AuthenticatedRequest) private http: AuthenticatedRequest, private headers: SimpleTODOHeaders) {
        this.todos$ = new Observable<Todo[]>(observer => this.todosObserver = observer).share();
    }

    fetch() {
        this.http.get(this.todo_url, {headers: this.headers.jsonHeaders()}).subscribe(
            res => {
                this.todos = <Todo[]> res;
                this.todosObserver.next(this.todos);
            },
            err => TodoService.handleError(err)
        );
    }

    post(todo: Todo) {
        this.http.post(this.todo_url, JSON.stringify(todo), {headers: this.headers.jsonHeaders()}).subscribe(
            (res: Todo) => {
                this.todos.push(res);
                this.todosObserver.next(this.todos);
            },
            err => TodoService.handleError(err)
        );
    }

    update(todo: Todo) {
        this.http.put(`${this.todo_url}${todo.id}/`, JSON.stringify(todo), {headers: this.headers.jsonHeaders()}).subscribe(
            (res: Todo) => {
                this.todos.forEach((todo: Todo, index: number) => {
                    if (todo.id === res.id) { this.todos[index] = res; }
                });
                this.todosObserver.next(this.todos);
            },
            err => TodoService.handleError(err)
        );
    }

    remove(todo: Todo) {
        this.http.delete(`${this.todo_url}${todo.id}/`, {headers: this.headers.jsonHeaders()}).subscribe(
            (res: string) => {
                this.todos.forEach((entry: Todo, index: number) => {
                   if (todo.id === entry.id) { this.todos.splice(index, 1) }
                });
                this.todosObserver.next(this.todos);
            },
            err => TodoService.handleError(err)
        )
    }

    static handleError(err: Response) {
        if (err.status == 401) {
            return;
        }
        else {
            console.log(err);
        }
    }

}
