import { Injectable } from '@angular/core';
import { ToastrService, ToastrConfig, Toast } from 'ngx-toastr';

@Injectable()
export class ToastrCustomService {

    constructor(private toastrService: ToastrService) {
        this.toastrService.toastrConfig.iconClasses = {
            error: 'custom-error',
            info: 'custom-info',
            success: 'custom-success',
            warning: 'custom-warning',
        };
    }

    public showErrorMessages(mensagens: string[]): void {
        mensagens.forEach(m => {
            this.toastrService.error(m, '');
        });
    }

    public showErrorMessage(message: string): void {
        this.toastrService.error(message, '');
    }

    public showAllErrorMessage(message: string): void {
        this.toastrService.error(message, '');
    }

    public showWarningMessage(message: string): void {
        this.toastrService.warning(message, '');
    }

    public showSuccessesMessage(mensagens: string[]): void {
        mensagens.forEach(m => {
            this.toastrService.success(m, '');
        });
    }

    public showSuccessMessage(message: string): void {
        this.toastrService.success(message, '');
    }

    public showInfoMessage(message: string): void {
        this.toastrService.info(message, '');
    }

    public showInfoMessages(mensagens: string[]): void {
        mensagens.forEach(m => {
            this.toastrService.info(m, '');
        });
    }

    public showCustomErrorMessage(message: string, erroCode: string): void {
        this.toastrService.error(message, erroCode);
    }

}
