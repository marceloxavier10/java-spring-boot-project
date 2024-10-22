import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ExpirationDateService {

    public expirationDate = new Subject<Date>();

    public updateDate(date: Date): void {
        this.expirationDate.next(date);
    }

}