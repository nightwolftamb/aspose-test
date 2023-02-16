import {PageAnnotationObject} from "./page-annotation-model";
import {ISaveData} from "./save-data-interface";

export class DocumentPageObject implements ISaveData{
    public imageUrl: string;
    public annotations: PageAnnotationObject[] = [];

    constructor(obj: any) {
        this.imageUrl = obj;

        // TODO: Here need to load annotations from backend
    }

    getData(): Object {
        return {
            imageUrl: this.imageUrl,
            annotations: this.annotations.map(annotation => {
                return annotation.getData();
            })
        };
    }

}
