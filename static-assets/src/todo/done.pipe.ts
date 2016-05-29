import {Pipe} from "angular2/core";
import {Todo} from "./todo";


@Pipe({
    name: "DonePipe",
})
export class DonePipe {
    transform(value, args?) {
        if(value) {
            return value.filter((todo:Todo) => {
                console.log(todo);
                return !(args && todo.done);
            })
        }
    }
}
