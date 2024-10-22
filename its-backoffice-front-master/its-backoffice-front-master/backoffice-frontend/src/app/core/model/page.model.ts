export class Page<T> {
    size: number;
    number: number;
    totalElements = 0;
    totalPages = 0;
    content: T[];
    helper: any;
    actualPage: number;

    constructor() {
        this.totalElements = 0;
        this.content = [];
    }
}
