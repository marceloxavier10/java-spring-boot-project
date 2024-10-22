import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KeyValue } from 'src/app/core/model/keyvalue.model';
import { User } from 'src/app/core/model/user.model';
import { ToastrCustomService } from 'src/app/core/toastr/toastr.service';
import { UserService } from '../service/user.service';
import { SecurityService } from 'src/app/core/infra/service/security.service';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  title: string;
  public registerForm: FormGroup;
  public submitted = false;
  user: User = new User();

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private location: Location,
              public formBuilder: FormBuilder,
              private router: Router,
              private toastrService: ToastrCustomService,
              public securityService: SecurityService) {
  }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.constructValidations();
    this.populateFormFields();
  }

  private populateFormFields(): void {
    if (this.user.id) {
      this.user.confirmPassword = this.user.password;
      this.registerForm.patchValue(this.user);
    }
  }

  private constructValidations(): void {
    this.registerForm = this.formBuilder.group({
      id: [null],
      creation: [null],
      creationUsername: [null],
      lastUpdated: [null],
      lastUpdatedUsername: [null],
      username: [null, Validators.required],
      name: [null, Validators.required],
      status: [true],
      password: [null, [Validators.required]],
      confirmPassword: [null]
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.user = this.registerForm.value;
    this.save();
  }

  public save(): void {
    if (this.user.id) {
      this.updateUser();
    } else {
      this.saveUser();
    }
  }

  private saveUser(): void {
    this.userService.save(this.user, success => {
      this.router.navigate(['user/list']);
    }, error => {
      this.toastrService.showErrorMessage(error.message);
    });
  }

  private updateUser(): void {
    this.userService.update(this.user, success => {
      this.router.navigate(['user/list']);
    }, error => {
      this.toastrService.showErrorMessage('Erro ao salvar Registro!');
    });
  }

  public back(): void {
    this.location.back();
  }

  get form() {
    return this.registerForm.controls;
  }

}
