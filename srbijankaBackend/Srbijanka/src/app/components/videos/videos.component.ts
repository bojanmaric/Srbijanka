import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from 'src/app/models/Videos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/servisi/post.service';
import { KataloziSlikeService } from 'src/app/servisi/katalozi-slike.service';
import { LoginService } from 'src/app/servisi/login.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  videos:Observable<Video[]>;
  constructor(private logingService:LoginService,
    private domSanitizer:DomSanitizer,private katSlikeService:KataloziSlikeService ,private postService: PostService, private snackBar: MatSnackBar) { }
  //ruta: string = 'http://localhost:3000/api/catalogs/image/';

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.katSlikeService.getAllVideos().subscribe(
      data=>{
        this.videos=data['videos'];
        console.log(this.videos)
      }
    )
  }
  public getVideo(video){
    return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+video)
  }
  
  ulogovanIn() {
    if (this.logingService.isLogged()) {
      return true;
    }
    return false;
  }
}
