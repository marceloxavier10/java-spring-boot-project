import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login.routing.module';
import { SecurityService } from '../../core/infra/service/security.service';
import { MatInputModule, MatFormFieldModule } from '@angular/material';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        LoginRoutingModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatPasswordStrengthModule
    ],
    providers: [
    ]
})
export class LoginModule { }
