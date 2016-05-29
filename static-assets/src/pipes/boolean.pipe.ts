import {Pipe} from "angular2/core";


@Pipe({
    name: "DonePipe",
})
export class DonePipe {
    transform(value, attribute, bool) {
        if(value) {
            return value.filter((entry: any) => {
                return !(bool && entry[attribute]);
            })
        }
    }
}
