import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        canActivateChild: [AuthGuard],
        loadChildren: () => import(`./home/home.module`).then(m => m.HomeModule)
      },
      {
        path: 'user',
        canActivateChild: [AuthGuard],
        loadChildren: () => import(`./user/user.module`).then(m => m.UserModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
