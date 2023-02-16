import {ISaveData} from "./save-data-interface";

export class AnnotationTextParameters implements ISaveData{
    public text: string = '';
    // TODO: Add size, color etc. options for text

    constructor(text: string) {
        this.text = text;
    }

    getData(): Object {
        return {text: this.text};
    }
}
