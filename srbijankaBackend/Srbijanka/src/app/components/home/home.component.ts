import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/servisi/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servisi/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ruta: string = 'http://localhost:3000/api/posts/image/';

  constructor(private logingService:LoginService, private postService: PostService, private snackBar: MatSnackBar, private router:Router) { }

   public posts:any=[];

  ngOnInit() {
  
    this.loadData();
  }
  deletePost(post){
    
    const uspesno = this.postService.deletePost(post._id,post.picture);
    
    if(uspesno){
      this.snackBar.open('uspesno ste izbrisali post','OK',{duration:1500})
      this.loadData();
    }else{
      this.snackBar.open('Doslo je do greske','OK',{duration:1500})

    }
    this.loadData();
  }

  openPost(id){
    this.router.navigate(['/post/'+id])

  }
  loadData(){
    this.posts =  this.postService.getAllPosts();
    
  }
  getImage(img){
    return this.ruta+img

  }
  
  ulogovanIn() {
    if (this.logingService.isLogged()) {
      return true;
    }
    return false;
  }
}
