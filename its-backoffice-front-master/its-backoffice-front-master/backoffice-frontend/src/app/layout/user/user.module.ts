import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { UserService } from './service/user.service';
import { ListUserComponent } from './list-user/list-user.component';
import { FormUserComponent } from './form-user/form-user.component';
import { UserRoutingModule } from './user.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonToggleModule } from '@angular/material';
import { UserIdResolve } from './resolve/user-id.resolve';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';


@NgModule({
    declarations: [
        ListUserComponent,
        FormUserComponent
    ],
    imports: [
        UserRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatPasswordStrengthModule,
        FormsModule
    ],
    exports: [
        MatPaginatorModule,
    ],
    providers: [
        UserService,
        UserIdResolve
    ]
})
export class UserModule { }
