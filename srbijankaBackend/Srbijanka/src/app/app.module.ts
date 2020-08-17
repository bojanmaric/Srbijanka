import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import {MaterialModule} from './material/material.module';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/home/post/post.component';
import { MagazinComponent } from './components/magazin/magazin.component';
import { VideosComponent } from './components/videos/videos.component';
import { ImagesComponent } from './components/images/images.component';
import { AddpostComponent } from './admin/addpost/addpost.component';
import { AddcatalogComponent } from './admin/addcatalog/addcatalog.component';
import { AddimageComponent } from './admin/addimage/addimage.component';
import { AddvideosComponent } from './admin/addvideos/addvideos.component'
import { PostService } from './servisi/post.service';

@NgModule({
  declarations: [
    AppComponent,
  
    NavigationComponent,
  
    FooterComponent,
  
    HomeComponent,
  
    PostComponent,
  
    MagazinComponent,
  
    VideosComponent,
  
    ImagesComponent,
  
    AddpostComponent,
  
    AddcatalogComponent,
  
    AddimageComponent,
  
    AddvideosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
