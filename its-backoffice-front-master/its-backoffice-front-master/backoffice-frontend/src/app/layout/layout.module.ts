import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout.routing.module';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { TemplateModule } from '../core/template/template.module';

import { FormGuard } from '../core/guards/form.guard';
import { AuthGuard } from '../core/guards/auth.guard';

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TemplateModule
    ],
    providers: [
        FormGuard,
        AuthGuard
    ]
})
export class LayoutModule { }
