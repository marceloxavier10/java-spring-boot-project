import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ToastrCustomService } from './toastr.service';


@NgModule({
    declarations: [
    ],
    imports: [
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
    ],
    exports: [
    ],
    providers: [
        ToastrCustomService
    ],
})
export class ToastrCustomModule { }
