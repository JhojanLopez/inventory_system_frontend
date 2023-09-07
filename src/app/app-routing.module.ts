import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchandiseComponent } from './components/merchandise/merchandise.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'users'},// podemos redirigir a otra ruta
  {path:'merchandise', component: MerchandiseComponent},
  {path:'users', component: UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
