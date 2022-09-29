import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { ShipsComponent } from './ships/ships.component';

const routes: Routes = [
  {path: '', redirectTo:'', pathMatch: 'full'},
  {path: 'ships', component: ShipsComponent},
  {path: 'ship/:id', component: ShipDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
