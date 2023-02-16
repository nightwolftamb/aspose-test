import {ErrorInterface} from "../../models/error-interface";

export class DocumentErrorObject implements ErrorInterface{
    public errorId: number = 0;

    public getErrorDescription(): string {
        switch (this.errorId) {
            case 1:
                return 'ID of document not set.';
            case 2:
                return 'No document with such ID';
        }
        return '';
    }

    public setError(errorIdToSet: number) {
        this.errorId = errorIdToSet;
    }

    public resetError(): void {
        this.errorId = 0;
    }

}
