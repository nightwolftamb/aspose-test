import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DocumentErrorObject} from "../../models/document-error-model";
import {ApiService} from "../../../services/api.service";
import {fromEvent, Subject, takeUntil} from "rxjs";
import {DocumentObject} from "../../models/document-model";
import {EditorSupportService} from "../../services/editor-support.service";

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy{

    public errorDescription: DocumentErrorObject = new DocumentErrorObject();
    public isDestroyed$: Subject<void> = new Subject<void>();

    public set currentScale(val: number) {
        if (val > 2) {
            val = 2;
        }
        if (val < 0.3) {
            val = 0.3;
        }
        this.editorSupport.currentScale = val;
    }

    public get currentScale(): number {
        return this.editorSupport.currentScale;
    }

    private _currentDocumentId?: number;
    public currentDocument?: DocumentObject;

    public get currentDocumentId(): number | undefined {
        return this._currentDocumentId;
    }

    public set currentDocumentId(val: number | undefined) {
        this._currentDocumentId = val;
        this.currentDocument = undefined;
        if (val) {

            this.api.getDocumentById(val).subscribe(value => {
                this.currentDocument = value;
            });
        }

    }

    constructor(private route: ActivatedRoute,
                public api: ApiService,
                private editorSupport: EditorSupportService) {
        route.params.pipe(takeUntil(this.isDestroyed$)).subscribe(params => {
            if (params.id) {
                this.currentDocumentId = +params.id;

                this.errorDescription.resetError();
            } else {
                this.errorDescription.setError(1);
            }
        });
    }

    onSaveDocumentClick() {
        if (this.currentDocument) {
            let win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(screen.height-400)+",left="+(screen.width-840));
            win!.document.body.innerHTML = JSON.stringify(this.currentDocument.getData());
        }


    }

    onAddAnnotation() {

    }

    zoomIn() {
        this.currentScale += 0.1;
    }

    zoomOut() {
        this.currentScale -= 0.1;
    }

    getZoomerStyles(): string {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight - 80;
        return 'transform: scale(' + this.currentScale + '); width: ' + (windowWidth / this.currentScale) + 'px;  height: ' + (windowHeight / this.currentScale) + 'px;';
    }

    ngOnInit(): void {
        fromEvent(window, 'resize').pipe(takeUntil(this.isDestroyed$)).subscribe(value => {

        });
    }

    ngOnDestroy(): void {
        this.isDestroyed$.next();
        this.isDestroyed$.complete();
    }

}
