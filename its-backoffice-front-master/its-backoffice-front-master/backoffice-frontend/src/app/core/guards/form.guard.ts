import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityConstants } from '../model/security-constants.model';

export class FormGuard implements CanDeactivate<any> {

    canDeactivate(component: null, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        const token = localStorage.getItem(SecurityConstants.TOKEN_KEY);
        // if (token && component.registerForm.touched && !component.submitted) {
        //     return component.canDeactivateMessage();
        // }
        return true;
    }

}
