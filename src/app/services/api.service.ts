import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DocumentObject} from "../annotator/models/document-model";
import {map, Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    // Config
    readonly backendUrl: string = 'http://aspose.html5blog.ru/';

    // Cache data
    public documents: Map<number, DocumentObject> = new Map<number, DocumentObject>();

    constructor(private http: HttpClient) {
    }

    public getDocumentById(documentId: number): Observable<DocumentObject> {
        if (this.documents.has(documentId)) {
            return of (this.documents.get(documentId)!);
        }

        return this.http.get(this.backendUrl + 'controllers/getPage.php?page_id=' + documentId).pipe(map(value => {
            const documentData = new DocumentObject(value);
            this.documents.set(documentId, documentData);

            return documentData;
        }));
    }


}
