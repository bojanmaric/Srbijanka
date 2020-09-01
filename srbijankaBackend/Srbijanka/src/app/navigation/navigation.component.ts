import { Component, OnInit, Pipe } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../servisi/login.service';
import { Router } from '@angular/router';
import { KataloziSlikeService } from '../servisi/katalozi-slike.service';
import { Image } from '../models/Image';
import { Catalog } from '../models/Catalog';
import { Video } from '../models/Videos';
import { DomSanitizer } from '@angular/platform-browser';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private katSlikeService:KataloziSlikeService,
    private breakpointObserver: BreakpointObserver, 
    private logingService:LoginService, 
    private router:Router,
    public domSanitizer:DomSanitizer) {}

  catalogs:Catalog[]=[];
  videos:Video[]=[];
 
  progres=false;
  ruta:string="http://localhost:3000/api/catalogs/image/"
  ngOnInit(){
    this.loadCatalogs();
    this.loadVideos();
    this.progres=true;



  }
  onActivate(event){
    document.querySelector('mat-sidenav-content').scrollTop = 0;
  }
  loadCatalogs(){
    this.katSlikeService.getLastCatalogs().subscribe(
      data=>{
        this.catalogs=data['catalogs']
        this.progres=false;
      }
    )
  }

  loadVideos(){
    this.katSlikeService.getLastVideos().subscribe(
      data=>{
        this.videos=data['videos'];
        
      }
    )
  }
  getVideo(link){
    
    return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+link)

  }
  logout() {
    this.logingService.logout();
    this.router.navigate(['/login']);
  }

  getCatalogImg(srcSlika){
    return   this.ruta+srcSlika
  }
  ulogovanIn() {
    if (this.logingService.isLogged()) {
      return true;
    }
    return false;
  }

  
}
