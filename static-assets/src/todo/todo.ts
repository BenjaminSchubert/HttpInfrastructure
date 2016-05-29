export class Todo {
    content: string;
    deadline: string;
    tags: string[];
    done: boolean;
    id: number;
    
    constructor(content: string, date: Date, tags: string[], done: boolean = false, id?: number) {
        this.content = content;
        this.deadline = date.toISOString().split("T")[0];
        this.tags = tags;
        this.done = done;
        this.id = id;
    }
}
