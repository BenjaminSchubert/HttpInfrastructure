import {Input, Output, EventEmitter, Directive} from "angular2/core";


@Directive({
    selector: 'input[type=date]',
    host: {
        '[value]': '_date',
        '(change)': 'onDateChange($event.target.value)'
    }
})
export class DateInput{
    private _date: string;
    
    @Input() set date(d: string) {
        this._date = d;
    }
    @Output() dateChange: EventEmitter<string>;
    constructor() {
        this.date = new Date().toISOString().split("T")[0];
        this.dateChange = new EventEmitter<string>();
    }

    private onDateChange(value: string): void {
        if (value != this._date) {
            var parsedDate = new Date(value);

            if (!isNaN(parsedDate.getTime())) {
               this._date = parsedDate.toISOString().split("T")[0];
               this.dateChange.emit(this._date);
            }
        }
    }
}

