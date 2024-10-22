import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityConstants } from '../../model/security-constants.model';
import { map } from 'rxjs/operators';
import { SecurityService } from '../service/security.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private securityService: SecurityService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request.headers.append('Content-Type', 'application/json');
        const token = localStorage.getItem(SecurityConstants.TOKEN_KEY);
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.securityService.refreshToken(event);
                }
                return event;
            })
        );
    }
}