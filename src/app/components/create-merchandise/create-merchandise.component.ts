import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MerchandiseToCreate } from 'src/app/models/merchandise-to-create';
import { MerchandiseService } from 'src/app/services/merchandise.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-merchandise',
  templateUrl: './create-merchandise.component.html',
  styleUrls: ['./create-merchandise.component.css'],
})
export class CreateMerchandiseComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private merchandiseService: MerchandiseService
  ) {}

  merchandiseToCreate: MerchandiseToCreate;
  form: FormGroup;

  ngOnInit(): void {
    this.merchandiseToCreate = new MerchandiseToCreate();
    this.form = this.fb.group({
      //debemos de incializar el formulario y agregar sus inputs como formControl
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      amount: new FormControl('', [
        Validators.required,
        Validators.min(0),
        this.amountValidator,
      ]),
      dateEntry: new FormControl('', [Validators.required, this.dateValidator]),
    });
  }

  onSubmit() {
    this.merchandiseToCreate = this.form.value;
    this.merchandiseToCreate.registeredById = 1;

    console.log(this.merchandiseToCreate);

    this.merchandiseService.create(this.merchandiseToCreate).subscribe({
      next: (r) => {
        console.log(r);
        Swal.fire('Exito:', `Se ha creado la mercancia con exito!`, 'success');
        this.refresh();
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

  refresh() {
    this.merchandiseToCreate.name = '';
    this.merchandiseToCreate.amount = null;
    this.merchandiseToCreate.dateEntry = null;
    this.merchandiseToCreate.registeredById = null;
    this.form.reset();
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
}
