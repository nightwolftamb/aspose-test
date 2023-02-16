import {ISaveData} from "./save-data-interface";

export class AnnotationImageParameters implements ISaveData{
    public imageData: string;

    constructor(imageUrl: string) {
        this.imageData = imageUrl;
    }

    getData(): Object {
        return {
            imageData: this.imageData
        };
    }
}
