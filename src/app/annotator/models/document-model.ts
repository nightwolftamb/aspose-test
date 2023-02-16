import {DocumentPageObject} from "./document-page-model";
import {ISaveData} from "./save-data-interface";

export class DocumentObject implements ISaveData{
    public id: number;
    public name: string;
    public pages: DocumentPageObject[] = [];

    constructor(obj: any) {

        this.id = +obj.id;
        this.name = obj.name;

        if (obj.hasOwnProperty('pages')) {
            for (const page of obj.pages) {
                this.pages.push(new DocumentPageObject(page));
            }
        }
    }

    getData(): Object {
        return {
            id: this.id,
            name: this.name,
            pages: this.pages.map(page => {
                return page.getData()
            })
        };
    }
}
