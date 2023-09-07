import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    //validar si el usuario ya esta logueado para redirigir a la mercancias
    if (this.usersService.isUserLogged()) {
      this.redirecting();
    } else {
      this.usersService.getAll().subscribe({
        next: (r) => {
          this.users = r;
          console.log(this.users);
          this.userSelector();
        },
      });
    }
  }

  async userSelector() {
    const admins = this.users
      .filter((u) => u.positionName === 'Administrador')
      .flatMap((u) => u.name);
    const support = this.users
      .filter((u) => u.positionName === 'Soporte')
      .flatMap((u) => u.name);
    const advisers = this.users
      .filter((u) => u.positionName === 'Asesor de ventas')
      .flatMap((u) => u.name);

    const { value: userSelected } = await Swal.fire({
      title: 'Ingresa al sistema',
      input: 'select',
      inputOptions: {
        Administradores: admins.reduce((acc, name) => {
          acc[name] = name;
          return acc;
        }, {}), // Convierte el array en un objeto con el mismo valor como clave y valor
        Soporte: support.reduce((acc, name) => {
          acc[name] = name;
          return acc;
        }, {}),
        'Asesor de ventas': advisers.reduce((acc, name) => {
          acc[name] = name;
          return acc;
        }, {}),
      },
      inputPlaceholder: 'Selecciona un usuario',
      showCancelButton: false,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          console.log(value);
          if (!value) {
            resolve('Debes seleccionar un usuario');
          }
          resolve();
        });
      },
    });

    if (userSelected) {
      const userLogged = this.users.find((u) => u.name === userSelected);
      console.log('Usuario seleccionado:', userLogged);
      localStorage.setItem('user', JSON.stringify(userLogged));
      this.redirecting();
    } else {
      this.userSelector();
    }
  }

  redirecting() {
    this.router.navigate(['/merchandise']);
  }
}
