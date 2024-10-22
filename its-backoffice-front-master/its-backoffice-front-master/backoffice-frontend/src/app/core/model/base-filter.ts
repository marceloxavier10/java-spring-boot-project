import { Page } from './page.model';

export class BaseFilter {
    page = 0;
    size = 10;
    search = null;
    status = null;

    public addPage(page: Page<any>) {
        this.page = page.number;
        this.size = page.size;
    }

}
