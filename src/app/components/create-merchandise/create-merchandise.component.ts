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
  constructor(private fb: FormBuilder, private merchandiseService: MerchandiseService) {}

  merchandiseToCreate: MerchandiseToCreate;
  form: FormGroup;

  ngOnInit(): void {
    this.merchandiseToCreate = new MerchandiseToCreate();
    this.form = this.fb.group({
      //debemos de incializar el formulario y agregar sus inputs como formControl
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
      dateEntry: new FormControl('', [Validators.required, this.dateValidator]),
    });
  }
  
  dateValidator(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  onSubmit() {
    console.log(this.form.value);
    this.merchandiseToCreate = this.form.value;
    this.merchandiseToCreate.registeredById = 1;
  
    console.log(this.merchandiseToCreate);

    this.merchandiseService.create(this.merchandiseToCreate).subscribe({
      next:(r)=>{
        console.log(r);
        Swal.fire('Exito:', `Se ha creado la mercancia con exito!`, 'success');
        this.refresh();
      },
      error: (e)=>{
        console.log(e);
        Swal.fire('Error:', `No se pudo crear la mercancia, por fallas en nuestros servidores`, 'error');
      }
    });
  }

  refresh(){
    console.log(this.merchandiseToCreate);
    this.merchandiseToCreate.name='';
    this.merchandiseToCreate.amount = null;
    this.merchandiseToCreate.dateEntry = null;
    this.merchandiseToCreate.registeredById = null;
    console.log(this.merchandiseToCreate);
    this.form.reset();
    console.log(this.form);
  }
}
