import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from "angular2/core";
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
    private new_todo = new Todo("", new Date(), []);
    private old_list: string[] = [];

    private selectedTodo: Todo;
    private filterDone: boolean = false;

    constructor(private todoService: TodoService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.todoService.fetch();
    }

    create() {
        if (this.selectedTodo) {
            this.update(this.selectedTodo);
        }
        else {
            this.todoService.post(this.new_todo);
            this.new_todo = new Todo("", new Date(), []);
        }
    }
    
    hide() {
        this.filterDone = !this.filterDone;
    }
    
    remove(todo: Todo) {
        this.todoService.remove(todo);
    }
    
    edit(todo: Todo) {
        if (todo == null) {
            this.selectedTodo.tags = this.old_list;
        }
        else {
            this.old_list = todo.tags.slice(0);
        }

        this.selectedTodo = todo;
        this.cd.markForCheck();
    }

    update(todo: Todo) {
        this.todoService.update(todo);
    }

    toggle(todo: Todo) {
        todo.done = !todo.done;
        this.update(todo);
    }

    
}
