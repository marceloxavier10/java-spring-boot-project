import { Injectable } from '@angular/core';

import { Resolve, ActivatedRoute } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/core/model/user.model';
import { UserService } from '../service/user.service';

@Injectable()
export class UserIdResolve implements Resolve<User> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        if (id) {
            return this.userService.findObservable(Number(id));
        }
        return new User();
    }
}