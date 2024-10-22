import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SecurityService } from '../service/security.service';
import { Router } from '@angular/router';
import { ToastrCustomService } from '../../toastr/toastr.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private securityService: SecurityService,
                private router: Router,
                private toastrService: ToastrCustomService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 400) {
                if (err.error && err.error.errors) {
                    this.toastrService.showErrorMessage(err.error.errors);
                    return throwError(err);
                }
            } else if (err.status === 401) {
                this.securityService.logout();

            } else if (!this.securityService.isTokenExpired()) {
                this.router.navigate(['erro/'.concat(err.status), err.message]);
            }
            return throwError(err);
        }));
    }
}
