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
import { CommentviewComponent } from './admin/commentview/commentview.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'post/:id',component:PostComponent},
  {path:'videos',component:VideosComponent},
  {path:'image',component:ImagesComponent},
  {path:'magazin',component:MagazinComponent},
  {path:'addPost',component:AddpostComponent, canActivate: [AuthGuard] },
  {path:'addImage',component:AddimageComponent, canActivate: [AuthGuard] },
  {path:'addVideon',component:AddvideosComponent, canActivate: [AuthGuard] },
  {path:'addCatalog',component:AddcatalogComponent, canActivate: [AuthGuard] },
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent, canActivate: [AuthGuard] },
  {path:'commentView',component:CommentviewComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
