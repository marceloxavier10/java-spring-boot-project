import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserFilter } from '../model/user-filter';
import { ToastrCustomService } from 'src/app/core/toastr/toastr.service';
import { Messages } from 'src/app/core/model/messages.model';
import { SecurityService } from 'src/app/core/infra/service/security.service';
import { User } from 'src/app/core/model/user.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {


  @ViewChild('paginator', { read: MatPaginator, static: true }) public paginator: MatPaginator;

  public filter = new UserFilter();
  public dataSource = new MatTableDataSource<User>();
  users: User[] = [];
  displayedColumns = ['name', 'username', 'creation', 'lastUpdated', 'actions'];

  constructor(private router: Router,
              private userService: UserService,
              private toastrService: ToastrCustomService,
              public securityService: SecurityService) {
              this.find();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public find() {
    this.userService.find(this.filter, result => {
      this.dataSource.data = result;
    });
  }

  public add(): void {
    this.router.navigate(['user/form']);
  }

  public edit(id: number): void {
    this.router.navigate(['user/form/edit/', id]);
  }

  public delete(id: number, index: number): void {
    this.userService.delete(id, success => {
      this.find();
    }, error => {
      this.toastrService.showErrorMessage(error.message);
    });
  }
}
