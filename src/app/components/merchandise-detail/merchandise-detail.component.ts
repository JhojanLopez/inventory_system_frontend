import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchandiseToUpdate } from 'src/app/models/merchandise-to-update';
import { MerchandiseDetail } from 'src/app/models/merchandiseDetail';
import { MerchandiseService } from 'src/app/services/merchandise.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchandise-detail',
  templateUrl: './merchandise-detail.component.html',
  styleUrls: ['./merchandise-detail.component.css'],
})
export class MerchandiseDetailComponent implements OnInit {
  form: FormGroup;
  merchandise: MerchandiseDetail;
  merchandiseToUpdate: MerchandiseToUpdate;
  isUpdate: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private merchandiseService: MerchandiseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.isUserLogged()) {
      this.init();
    } else {
      this.redirectingUsers();
    }
  }

  init() {
    this.merchandise = new MerchandiseDetail();
    this.isUpdate = false;

    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      if (id) {
        this.merchandiseService
          .findById(id)
          .subscribe((r) => ((this.merchandise = r), this.initForm()));
      } else {
        redirectingMerchandise();
      }
    });
  }
  initForm() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      amount: new FormControl('', [
        Validators.required,
        Validators.min(0),
        this.amountValidator,
      ]),
      dateEntry: new FormControl('', [Validators.required, this.dateValidator]),
    });

    console.log(this.merchandise);
    this.form.patchValue({
      name: this.merchandise.name,
      amount: this.merchandise.amount,
      dateEntry: this.merchandise.dateEntry, // Fecha actual en formato 'YYYY-MM-DD'
    });
  }
  redirectingUsers() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      amount: new FormControl('', [
        Validators.required,
        Validators.min(0),
        this.amountValidator,
      ]),
      dateEntry: new FormControl('', [Validators.required, this.dateValidator]),
    });

    console.log(this.merchandise);
    this.form.patchValue({
      name: this.merchandise.name,
      amount: this.merchandise.amount,
      dateEntry: this.merchandise.dateEntry, // Fecha actual en formato 'YYYY-MM-DD'
    });
    this.router.navigate(['/users']);
  }

  toUpdate() {
    this.isUpdate = true;
  }
  toDetail() {
    this.isUpdate = false;
  }

  getFormControls(): any {
    return this.form.controls;
  }

  amountValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!Number.isInteger(value)) {
      return { error: true };
    }
    return null;
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const dateEntry = new Date(value);
    const currentDate: Date = new Date();

    if (dateEntry > currentDate) return { error: true };
    return null;
  }

  fieldValidator(field: string): boolean {
    const formControl = this.getFormControls();

    if (this.form.get(field).touched && this.form.get(field).errors)
      return true;

    return false;
  }

  getError(field: string): string {
    switch (field) {
      case 'name':
        return this.getErrorName();
      case 'amount':
        return this.getErrorAmount();
      case 'dateEntry':
        return this.getErrorDate();
      default:
        return 'mensaje de error no encontrado';
    }
  }

  getErrorName(): string {
    const field = 'name';
    const formControl = this.getFormControls();

    //importante que el formcontrol tenga el mismo nombre y sus errores deben de ser acordes
    if (formControl[field].errors['required']) return 'El campo es requerido';

    const minLength = formControl[field].errors['minlength'].requiredLength;
    return `El campo debe tener minimo ${minLength} caracteres`;
  }

  getErrorAmount(): string {
    const field = 'amount';
    const formControl = this.getFormControls();

    //importante que el formcontrol tenga el mismo nombre y sus errores deben de ser acordes
    if (formControl[field].errors['required']) return 'El campo es requerido';

    if (formControl[field].errors['min'])
      return 'El campo debe tener un valor minimo de 0';

    return 'El campo debe ser un numero entero';
  }

  getErrorDate(): string {
    const field = 'dateEntry';
    const formControl = this.getFormControls();

    //importante que el formcontrol tenga el mismo nombre y sus errores deben de ser acordes
    if (formControl[field].errors['required']) return 'El campo es requerido';

    return 'La fecha de ingreso no puede ser posterior a la fecha actual';
  }

  update() {
    const id: number = this.merchandise.id;
    const merchandiseToUpdate: MerchandiseToUpdate = this.form.value;
    merchandiseToUpdate.updatedById = this.userService.getUserLogged().id;

    this.merchandiseService.update(id, merchandiseToUpdate).subscribe({
      next: (r) => {
        console.log(r);
        Swal.fire('Exito:', `Se actualizo la mercancia con exito!`, 'success');
        this.router.navigate(['/merchandise']);
      },
      error: (e) => {
        console.log(e);
        Swal.fire(
          'Error:',
          `Ya existe una mercancia con el mismo nombre, por favor escoge otro`,
          'error'
        );
      },
    });
  }
}

function redirectingMerchandise() {
  this.router.navigate(['/merchandise']);
}
