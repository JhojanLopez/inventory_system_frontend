import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MerchandisePageable } from 'src/app/interfaces/merchandisePageable';
import { Filter } from 'src/app/models/filter';
import { MerchandiseService } from 'src/app/services/merchandise.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.css'],
})
export class MerchandiseComponent implements OnInit {
  length: number;
  pageSize: number;
  pageIndex: number;
  pageSizeOptions: number[];
  title: string;
  merchandises: MerchandisePageable[];
  filter: Filter;

  constructor(
    private userService: UsersService,
    private merchandiseService: MerchandiseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.isUserLogged()) {
      this.init();
      this.reload();
    } else {
      this.redirecting();
    }
  }
  init() {
    this.title = 'Mercancia';
    this.length = 0;
    this.pageIndex = 0;
    this.pageSize = 5;
    this.pageSizeOptions = [3, 5, 10, 20];
    this.filter = {
      type: 0,
      value: '',
    };
  }

  private reload() {
    this.merchandiseService
      .getAllPagination(this.pageIndex, this.pageSize)
      .subscribe({
        next: (r) => {
          this.merchandises = r.content;
          this.length = r.totalElements;
        },
      });
  }

  paginator(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.reload();
  }

  search() {
    console.log(this.filter);
    if (this.filter.type == 0) {
      Swal.fire(
        'Información:',
        `Por favor selecciona el tipo de filtro para realizar la búsqueda`,
        'info'
      );
      return;
    }
    //by id
    if (this.filter.type == 1) {
      this.merchandiseService.findById(parseInt(this.filter.value)).subscribe({
        next: (r) => {
          console.log(r);
          this.reloadAfterFilterById(r);
        },
        error: (e) => {
          Swal.fire('Advertencia:', `Mercancia no existente`, 'warning');
          console.log('error en la peticion ' + e.message);
        },
      });
    }

    //by name
    if (this.filter.type == 2) {
      this.merchandiseService.findByName(this.filter.value).subscribe((r) => {
        console.log(r);
        this.reloadAfterFilterByName(r);
      });
    }
  }

  reloadAfterFilterById(data: MerchandisePageable) {
    this.merchandises = [data];
    this.length = 1;
  }

  reloadAfterFilterByName(data: any) {
    this.merchandises = data;
    this.length = data.length;
  }

  restore() {
    this.filter.type = 0;
    this.length = 0;
    this.pageIndex = 0;
    this.pageSize = 5;
    this.reload();
  }

  redirecting() {
    this.router.navigate(['/users']);
  }
}
