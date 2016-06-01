import {Component, Input, ChangeDetectorRef, forwardRef, Provider} from "angular2/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "angular2/common";


const LIST_INPUT_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => ListInput),
    multi: true
  });


@Component({
    selector: "input-list",
    templateUrl: "forms/inputlist.html",
    styleUrls: ["css/forms/inputlist.css"],
    providers: [LIST_INPUT_VALUE_ACCESSOR]

})
export class ListInput implements ControlValueAccessor {
    isSelected: boolean = false;
    _list: string[] = [];
    cd: ChangeDetectorRef;
    nextEntry: string = "";
    selectedEntry: string = null;

    private _onChangeCallback: (list: string[]) => void = (_) => {};
    private _onTouchedCallback: (list: string[]) => void = (_) => {};
    
    writeValue(list: string[]): void {
        this._list = list;
    }

    registerOnChange(func: (list: string[]) => void): void {
        this._onChangeCallback = func;
    }

    registerOnTouched(func: (list: string[]) => void): void {
        this._onTouchedCallback = func;
    }

    @Input() set changeDetection(cd: ChangeDetectorRef) {
        this.cd = cd;
    }

    private setSelected() {
        this.isSelected = true;
    }

    private setUnselected() {
        this.isSelected = false;
    }

    private typeHandler(event: KeyboardEvent) {
        if (event.keyCode === 188) {
            if (this._list.indexOf(this.nextEntry) == -1 && this.nextEntry.length > 0) {
                this._list.push(this.nextEntry);
            }
            this.nextEntry = "";
            event.preventDefault();
        }
        else if (this.nextEntry.length == 0) {
            if (event.keyCode === 8 && this.nextEntry.length == 0) {
                if (this.selectedEntry) {
                    let index = this._list.indexOf(this.selectedEntry);
                    this._list.splice(index, 1);
                    this.selectedEntry = this._list[index];
                } else {
                    this.selectedEntry = this._list[this._list.length - 1];
                }
            }
            else if (event.keyCode === 37 && this._list.length != 0) {
                let index: number;
                if (this.selectedEntry == null) {
                    index = this._list.length - 1;
                } else {
                    index = this._list.indexOf(this.selectedEntry) - 1;
                }
                this.selectedEntry = this._list[index >= 0 ? index : 0];
            }
            else if (event.keyCode === 39 && this._list.length != 0) {
                let index = this._list.indexOf(this.selectedEntry) + 1;
                this.selectedEntry = this._list[
                    index < this._list.length && index >= 0 ? index : this._list.length - 1];
            }
            else {
                this.selectedEntry = null;
            }
        }

        if (this.cd) {
            this.cd.markForCheck();
        }
    }

    private removeEntry(entry: string) {
        this._list.splice(this._list.indexOf(entry), 1);
        this._onChangeCallback(this._list);
    }

    private saveLast() {
        if (this.nextEntry != "") {
            this._list.push(this.nextEntry);
            this.nextEntry = "";
            this._onChangeCallback(this._list);
        }
    }
}
