import {Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {DocumentPageObject} from "../../models/document-page-model";
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AnnotationTypeChooserComponent} from "../annotation-type-chooser/annotation-type-chooser.component";
import {PageAnnotationObject} from "../../models/page-annotation-model";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnDestroy{

    @Input() pageObject?: DocumentPageObject;

    @ViewChild('pageContainer', { static: true }) pageRef?: ElementRef;

    public isDestroyed: Subject<void> = new Subject<void>();

    constructor(private dialog: MatDialog) {
    }


    onDoubleClick($event: MouseEvent) {
        const dialogRef = this.dialog.open(AnnotationTypeChooserComponent);
        dialogRef.afterClosed().subscribe(annotationParameters => {
            if (annotationParameters && this.pageObject) {
                // @ts-ignore
                const rect = $event.target!.getBoundingClientRect();

                const x = $event.clientX - rect.left; //x position within the element.
                const y = $event.clientY - rect.top;  //y position within the element.

                const annotationObject = new PageAnnotationObject(annotationParameters);
                annotationObject.x = x;
                annotationObject.y = y;

                this.pageObject.annotations.push(annotationObject);

            }
        });
    }


    deleteAnnotation(annotation: PageAnnotationObject) {
        this.pageObject?.annotations.forEach((value, index) => {
            if (value === annotation) {
                this.pageObject?.annotations.splice(index, 1);
            }
        });
    }

    ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }


}
