import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookRideComponent } from './book-ride/book-ride.component';
import { RideDetailsComponent } from './ride-details/ride-details.component';
import { OfferRideComponent } from './offerride/offerride.component'; 


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'book-ride', component: BookRideComponent },
  { path: 'ride-details', component: RideDetailsComponent },
  { path: 'offer-ride', component: OfferRideComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

