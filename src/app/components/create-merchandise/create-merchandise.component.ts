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

@Component({
  selector: 'app-create-merchandise',
  templateUrl: './create-merchandise.component.html',
  styleUrls: ['./create-merchandise.component.css'],
})
export class CreateMerchandiseComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  merchandiseToCreate: MerchandiseToCreate;
  form: FormGroup;

  ngOnInit(): void {
    this.merchandiseToCreate = new MerchandiseToCreate();
    this.form = this.fb.group({
      //debemos de incializar el formulario y agregar sus inputs como formControl
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
      date: new FormControl('', [Validators.required, this.dateValidator]),
    });
  }
  dateValidator(control: AbstractControl): ValidationErrors | null {
    return null;
  }
  onSubmit() {}
}
