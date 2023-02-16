import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EditorSupportService {
    constructor() {
    }

    public currentScale: number = 1;

}
