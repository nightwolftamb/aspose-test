import {IDraggableElement} from "./draggable-element-interface";
import {AnnotationType} from "./annotation-type-enum";
import {AnnotationTextParameters} from "./annotation-text-model";
import {AnnotationImageParameters} from "./annotation-image-model";
import {ISaveData} from "./save-data-interface";

export class PageAnnotationObject implements IDraggableElement, ISaveData{

    public type: AnnotationType = AnnotationType.Text;
    public options: AnnotationTextParameters | AnnotationImageParameters;

    x: number = 0;
    y: number = 0;
    scale: number = 1;

    constructor(params: AnnotationTextParameters | AnnotationImageParameters) {
        if (params instanceof AnnotationTextParameters) {
            this.type = AnnotationType.Text;
        }
        if (params instanceof AnnotationImageParameters) {
            this.type = AnnotationType.Image;
        }
        this.options = params;

    }

    public getImageParameters(): AnnotationImageParameters {
        return this.options as AnnotationImageParameters;
    }

    public getTextParameters(): AnnotationTextParameters {
        return this.options as AnnotationTextParameters;
    }

    getData(): Object {
        return {
            type: this.type.toString(),
            options: this.options.getData(),
            x: this.x,
            y: this.y,
            scale: this.scale
        };
    }

}
