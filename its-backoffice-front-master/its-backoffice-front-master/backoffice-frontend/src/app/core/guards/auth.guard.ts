import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { SecurityService } from 'src/app/core/infra/service/security.service';
import { ToastrCustomService } from '../toastr/toastr.service';

@Injectable()
export class AuthGuard implements CanActivateChild {

    constructor(private securityService: SecurityService,
                private toastrService: ToastrCustomService) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.securityService.isTokenExpired()) {
            return true;
        }
        this.securityService.logoutExpiratedSession();
        return false;
    }

}
