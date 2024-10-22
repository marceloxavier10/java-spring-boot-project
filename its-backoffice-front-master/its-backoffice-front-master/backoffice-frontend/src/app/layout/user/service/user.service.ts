import { UserFilter } from './../model/user-filter';
import { BaseFilter } from './../../../core/model/base-filter';
import { Injectable } from '@angular/core';
import { HttpConnectionBuilder } from 'src/app/core/infra/http/http-connection.builder';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/core/model/user.model';
import { Subscription } from 'rxjs';
import { ToastrCustomService } from 'src/app/core/toastr/toastr.service';

@Injectable()
export class UserService {

    private controller = 'users';

    constructor(private http: HttpClient,
                private toastrService: ToastrCustomService) { }

    public save(user: User, handlerSuccess: (value: any) => void, handlerError: (value: any) => void, successMessage?: string) {
        return new HttpConnectionBuilder<any>(this.http, this.toastrService)
            .addEndPoint(this.controller)
            .addParameter(user)
            .addHandlerSucess(handlerSuccess)
            .addHandlerError(handlerError)
            .addMessageSuccess(successMessage)
            .buildPost();
    }

    public update(user: User, handlerSuccess: (value: any) => void, handlerError: (value: any) => void, successMessage?: string) {
        return new HttpConnectionBuilder<any>(this.http, this.toastrService)
            .addEndPoint(this.controller)
            .addParameter(user)
            .addHandlerSucess(handlerSuccess)
            .addHandlerError(handlerError)
            .addMessageSuccess(successMessage)
            .buildPut();
    }

    public delete(id: number, handlerSuccess?: (value: any) => void, handlerError?: (value: any) => void, successMessage?: string) {
        return new HttpConnectionBuilder<any>(this.http, this.toastrService)
            .addEndPoint(this.controller.concat('/') + id)
            .addHandlerSucess(handlerSuccess)
            .addHandlerError(handlerError)
            .addMessageSuccess(successMessage)
            .buildDelete();
    }


    public find(filter: UserFilter, handlerSuccess: (value: any) => void) {
        return new HttpConnectionBuilder<any>(this.http)
            .addEndPoint(this.controller)
            .addParameter(filter)
            .addHandlerSucess(handlerSuccess)
            .buildGet();
    }

    public findObservable(id: number) {
        return new HttpConnectionBuilder<any>(this.http, this.toastrService)
            .addEndPoint(this.controller.concat('/') + id)
            .buildGetObservable();
    }

    // public find(handlerSuccess: (value: any) => void) {
    //     return new HttpConnectionBuilder<any>(this.http)
    //         .addEndPoint(this.controller)
    //         .addHandlerSucess(handlerSuccess)
    //         .buildGet();
    // }

}