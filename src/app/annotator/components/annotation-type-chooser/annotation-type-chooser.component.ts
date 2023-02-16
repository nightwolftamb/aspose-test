import {Component} from '@angular/core';
import {AnnotationType} from "../../models/annotation-type-enum";
import {MatDialogRef} from "@angular/material/dialog";
import {AnnotationImageParameters} from "../../models/annotation-image-model";
import {AnnotationTextParameters} from "../../models/annotation-text-model";

@Component({
    selector: 'app-annotation-type-chooser',
    templateUrl: './annotation-type-chooser.component.html',
    styleUrls: ['./annotation-type-chooser.component.scss']
})
export class AnnotationTypeChooserComponent {

    public AnnotationType = AnnotationType;

    public selectedType: AnnotationType = AnnotationType.Image;
    public textForAnnotation: string = '';

    constructor(public dialogRef: MatDialogRef<AnnotationTypeChooserComponent>) {
    }

    public selectType(type: AnnotationType) {
        this.selectedType = type;
    }

    imageSelected(event: Event) {
        const files = (event.target as HTMLInputElement).files;

        if (files && files.length > 0) {

            const file = files[0];

            const reader = new FileReader();
            reader.onload = e => {
                const imageAnnotationParameters: AnnotationImageParameters = new AnnotationImageParameters(reader.result + '');

                this.dialogRef.close(imageAnnotationParameters);
            }
            reader.readAsDataURL(file);

        }
    }

    textSelected() {
        if (this.textForAnnotation.trim().length > 0) {
            const textAnnotationParameters: AnnotationTextParameters = new AnnotationTextParameters(this.textForAnnotation);

            this.dialogRef.close(textAnnotationParameters);
        } else {
            alert('Input any text');
        }

    }
}
