import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { AddPassportComponent } from './add-passport/add-passport.component';
import { CreditComponent } from './credit/credit.component';
import { AvailableCardsComponent } from './available-cards/available-cards.component';
import { CardModalComponent } from './card-modal/card-modal.component';
import { ProfileComponent } from './profile/profile.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
   {path:'',component:AuthComponent},
   {path:'auth',component:AuthComponent},
   {path:'cardModal/:email/:name',component:CardModalComponent},
   {path:'dashboard',component:DashboardComponent},
   {path:'signup',component:SignupComponent},
   {path:'addPassport',component:AddPassportComponent},
   {path:'applyCreditCard',component:CreditComponent},
   {path:'editProfile',component:ProfileComponent},
   {path:'showGallery',component:GalleryComponent},
   {path:'approveRejectCreditCard/:applicationId',component:CreditComponent},
   {path:'availableCreditCards',component:AvailableCardsComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }