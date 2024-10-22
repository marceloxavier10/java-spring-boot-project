import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIdResolve } from './resolve/user-id.resolve';
import { FormGuard } from 'src/app/core/guards/form.guard';
import { ListUserComponent } from './list-user/list-user.component';
import { FormUserComponent } from './form-user/form-user.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: ListUserComponent,
                canActivateChild: [AuthGuard],
                data: {
                    label: 'Listar Utilizadores',
                }
            },
            {
                path: 'form',
                children: [
                    {
                        path: '',
                        component: FormUserComponent,
                        canDeactivate: [FormGuard],
                        resolve: { user: UserIdResolve },
                        data: {
                            canDeactivate: [FormGuard],
                            label: 'Adicionar Utilizador',
                            isEditar: false,
                        }
                    },
                    {
                        path: 'edit/:id',
                        component: FormUserComponent,
                        resolve: { user: UserIdResolve },
                        canDeactivate: [FormGuard],
                        data: {
                            isEditar: true,
                            label: 'Editar Utilizador',
                        }
                    }
                ]
            },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
