import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchandiseComponent } from './components/merchandise/merchandise.component';
import { UsersComponent } from './components/users/users.component';
import { CreateMerchandiseComponent } from './components/create-merchandise/create-merchandise.component';
import { MerchandiseDetailComponent } from './components/merchandise-detail/merchandise-detail.component';

const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'users'},// podemos redirigir a otra ruta
  {path:'merchandise', component: MerchandiseComponent},
  {path:'users', component: UsersComponent},
  {path:'create-merchandise', component: CreateMerchandiseComponent},
  {path:'merchandise-detail/:id', component: MerchandiseDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
