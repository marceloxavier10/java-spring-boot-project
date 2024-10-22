import { SecurityService } from '../../core/infra/service/security.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public registerForm: FormGroup;
  public submitted = false;
  public isPhoneVersion: boolean;
  public changePassword: boolean;

  constructor(private formBuilder: FormBuilder,
              private securityService: SecurityService) {
  }

  ngOnInit() {
    this.createLoginForm();
  }

  private createLoginForm(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.login();
  }

  public login(): void {
    const user = { username: this.registerForm.value.username, password: this.registerForm.value.password };
    this.securityService.clearAll();
    this.securityService.login(user);
  }

  public showChangePassword(): void {
    this.changePassword = true;
    this.createChangePasswordForm();
  }

  public cancelChangePassword(): void {
    this.submitted = false;
    this.changePassword = false;
    this.createLoginForm();
  }

  private createChangePasswordForm(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get form() {
    return this.registerForm.controls;
}
}
