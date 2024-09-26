export class EmptyResponseDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EmptyResponseDataError';
    }
}
