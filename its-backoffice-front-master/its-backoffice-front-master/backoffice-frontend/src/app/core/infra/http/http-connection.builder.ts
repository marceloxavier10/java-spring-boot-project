import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ToastrCustomService } from '../../toastr/toastr.service';

export class HttpConnectionBuilder<T> {
    private url: string = '';
    private endPoint: string = '';

    private parameters: any = [];

    private handlerSucess: (value: T) => void;
    private handlerError: (value: any) => void;
    private messageSuccess: string;

    constructor(protected http: HttpClient,
                protected toastrService?: ToastrCustomService) {
    }

    public buildDelete(): Subscription {
        this.constructSuccessMessage('excluído');
        return this.http.delete(this.createURL(), this.parameters)
            .pipe(take(1))
            .subscribe(
                (res: any) => this.doSuccess(res),
                err => this.doError(err)
            );
    }

    public buildPost(): Subscription {
        this.constructSuccessMessage('adicionado');
        return this.http.post(this.createURL(), this.parameters)
            .pipe(take(1))
            .subscribe(
                (res: any) => this.doSuccess(res),
                err => this.doError(err)
            );
    }

    public buildPostFormData(): Subscription {
        const formData = this.createFormData(this.parameters);
        this.constructSuccessMessage('cadastrado');
        return this.http.post(this.createURL(), formData)
            .pipe(take(1))
            .subscribe(
                (res: any) => this.doSuccess(res),
                err => this.doError(err)
            );
    }

    private createFormData(object: any): FormData {
        const formData = new FormData();
        Object.keys(object).forEach(prop => {
            if (Array.isArray(object[prop])) {
                object[prop].forEach((value) => formData.append(`${prop}`, value));
            } else {
                formData.append(prop, object[prop]);
            }
        });
        return formData;
    }

    public buildPut(): Subscription {
        this.constructSuccessMessage('atualizado');
        return this.http.put(this.createURL(), this.parameters)
            .pipe(take(1))
            .subscribe(
                (res: any) => this.doSuccess(res),
                err => this.doError(err)
            );
    }

    public buildGet(): Subscription {
        return this.http.get(this.createURL() + this.createQueryString())
            .pipe(take(1))
            .subscribe(
                (res: any) => this.doSuccess(res),
                err => this.doError(err)
            );
    }

    public buildGetObservable(): Observable<any> {
        return this.http.get(this.createURL() + this.createQueryString()).pipe(take(1));
    }

    private constructSuccessMessage(action: string): void {
        this.messageSuccess = this.messageSuccess ? this.messageSuccess : `Registro ${action} com sucesso!`;
    }

    private createQueryString(): string {
        const params = new URLSearchParams();

        for (const key in this.parameters) {
            if (this.parameters.hasOwnProperty(key)) {
                if (this.parameters[key]) {
                    params.set(key, this.parameters[key]);
                }
            }
        }

        const queryString = params.toString();

        if (queryString) {
            return '?' + queryString;
        }

        return '';
    }


    private doSuccess(response: T) {
        this.showSuccessMessage();
        if (this.handlerSucess) {
            this.handlerSucess(response);
        }
    }

    private showSuccessMessage(): void {
        if (this.toastrService && this.messageSuccess && this.messageSuccess !== '') {
            this.toastrService.showSuccessMessage(this.messageSuccess);
        }
    }

    private doError(error: any) {
        if (this.handlerError) {
            this.handlerError(error);
        }
    }

    public addMessageSuccess(message: string): HttpConnectionBuilder<T> {
        this.messageSuccess = message;
        return this;
    }

    public addEndPoint(endPoint: string): HttpConnectionBuilder<T> {
        this.endPoint += endPoint;
        return this;
    }

    public addParameter(parameters: any): HttpConnectionBuilder<T> {
        this.parameters = parameters;
        return this;
    }

    public addHandlerSucess(handlerSucess: (value: T) => void): HttpConnectionBuilder<T> {
        this.handlerSucess = handlerSucess;
        return this;
    }

    public addHandlerError(handlerError: (value: any) => void): HttpConnectionBuilder<T> {
        this.handlerError = handlerError;
        return this;
    }

    private createURL(): string {
        if (this.url === '') {
            this.addApplicationServerDomain();
        }

        return this.url + this.endPoint;
    }

    private addApplicationServerDomain() {
        this.url += 'http://localhost:8080/its-backoffice/';
    }
}
