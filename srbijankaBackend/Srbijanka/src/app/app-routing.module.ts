import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/home/post/post.component';
import { VideosComponent } from './components/videos/videos.component';
import { ImagesComponent } from './components/images/images.component';
import { AddpostComponent } from './admin/addpost/addpost.component';
import { AddimageComponent } from './admin/addimage/addimage.component';
import { AddvideosComponent } from './admin/addvideos/addvideos.component';
import { AddcatalogComponent } from './admin/addcatalog/addcatalog.component';
import { MagazinComponent } from './components/magazin/magazin.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'post/:id',component:PostComponent},
  {path:'videos',component:VideosComponent},
  {path:'image',component:ImagesComponent},
  {path:'magazin',component:MagazinComponent},
  {path:'addPost',component:AddpostComponent},

  {path:'addImage',component:AddimageComponent},
  {path:'addVideon',component:AddvideosComponent},
  {path:'addCatalog',component:AddcatalogComponent},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
