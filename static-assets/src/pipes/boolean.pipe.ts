import {Pipe} from "angular2/core";


@Pipe({
    name: "DonePipe",
    pure: false
})
export class DonePipe {
    transform(value, attribute, bool) {
        console.log("CALLED");
        if(value) {
            return value.filter((entry: any) => {
                return !(bool && entry[attribute]);
            })
        }
    }
}
