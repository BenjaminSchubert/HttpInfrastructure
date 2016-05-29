import {Component, OnInit} from "angular2/core";
import {TodoService} from "./todo.service";
import {Todo} from "./todo";
import {DateInput} from "../forms/date.directive";
import {ListInput} from "../forms/inputlist.component";

@Component({
    selector: 'todo',
    templateUrl: 'todo/todo.html',
    styleUrls: ['css/todo/todo.css'],
    directives: [DateInput, ListInput]
})
export class TodoComponent implements OnInit {
    private new_todo = new Todo("", new Date(), []);
    private selectedTodo: Todo;
    private hideDone: boolean = false;

    constructor(private todoService: TodoService) {}

    ngOnInit() {
        this.todoService.fetch();
    }

    create() {
        this.todoService.post(this.new_todo);
        this.new_todo = new Todo("", new Date(), []);
    }
    
    hide() {
        this.hideDone = !this.hideDone;
    }
    
    remove(todo: Todo) {
        this.todoService.remove(todo);
    }
    
    edit(todo: Todo) {
        this.selectedTodo = todo;
    }

    update(todo: Todo) {
        this.todoService.update(todo);
    }

    toggle(todo: Todo) {
        todo.done = !todo.done;
        this.update(todo);
    }

    
}
