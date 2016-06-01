import {Component, OnInit} from "angular2/core";
import {TodoService} from "./todo.service";
import {Todo} from "./todo";
import {DateInput} from "../forms/date.directive";
import {ListInput} from "../forms/inputlist.component";
import {DonePipe} from "../pipes/boolean.pipe";

@Component({
    selector: 'todo',
    templateUrl: 'todo/todo.html',
    styleUrls: ['css/todo/todo.css'],
    directives: [DateInput, ListInput],
    pipes: [DonePipe],
})
export class TodoComponent implements OnInit {
    private new_todo = new Todo("", new Date(), []);
    private selectedTodo: Todo;
    private filterDone: boolean = false;

    constructor(private todoService: TodoService) {}

    ngOnInit() {
        this.todoService.fetch();
    }

    create() {
        this.todoService.post(this.new_todo);
        this.new_todo = new Todo("", new Date(), []);
    }
    
    hide() {
        this.filterDone = !this.filterDone;
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
