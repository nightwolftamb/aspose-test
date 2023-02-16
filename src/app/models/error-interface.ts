export interface ErrorInterface {
    getErrorDescription(): string;
    setError(errorIdToSet: number): void;
    resetError(): void;
}
