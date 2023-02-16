import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {PageAnnotationObject} from "../../models/page-annotation-model";
import {AnnotationType} from "../../models/annotation-type-enum";
import {fromEvent, Subject, takeUntil} from "rxjs";
import {EditorSupportService} from "../../services/editor-support.service";

@Component({
    selector: 'app-annotation',
    templateUrl: './annotation.component.html',
    styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent implements OnDestroy {

    public AnnotationType = AnnotationType;

    @Input() annotationObject?: PageAnnotationObject;
    @Output() deleteAnnotation: EventEmitter<void> = new EventEmitter<void>();

    public isDestroyed: Subject<void> = new Subject<void>();

    private tempX: number = 0;
    private tempY: number = 0;

    constructor(private editorSupport: EditorSupportService) {
    }

    getMyPositionStyles() {

        return 'left: ' + this.annotationObject?.x + 'px; top: ' + this.annotationObject?.y + 'px; transform: scale(' + this.annotationObject?.scale + ');';
    }

    onMouseDown($event: MouseEvent) {
        $event.preventDefault();
        $event.stopImmediatePropagation();

        this.tempX = $event.screenX;
        this.tempY = $event.screenY;

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    private onMouseMove = ($event: MouseEvent) => {
        const offsetX = $event.screenX - this.tempX;
        const offsetY = $event.screenY - this.tempY;

        this.tempX = $event.screenX;
        this.tempY = $event.screenY;

        if (this.annotationObject) {
            this.annotationObject.x += offsetX / this.editorSupport.currentScale;
            this.annotationObject.y += offsetY / this.editorSupport.currentScale;
        }

    }

    private onMouseUp = ($event: MouseEvent) => {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }


    onDeleteClick(event: MouseEvent) {

        if (confirm('Delete this annotation?')) {
            this.deleteAnnotation.emit();
        }
    }

    onIncreaseSizeClick(event: MouseEvent) {
        event.stopImmediatePropagation();
        event.preventDefault();
        if (this.annotationObject) {
            this.annotationObject.scale += 0.1;
        }
    }

    onDecreaseSizeClick(event: MouseEvent) {
        event.stopImmediatePropagation();
        event.preventDefault();
        if (this.annotationObject) {
            this.annotationObject.scale -= 0.1;
        }
    }

    ngOnDestroy(): void {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    }


}
