import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/servisi/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ruta: string = 'http://localhost:3000/api/posts/image/';

  constructor( private postService: PostService, private snackBar: MatSnackBar) { }

   public posts:any=[];

  ngOnInit() {
   /*  this.postService.getAllPosts().subscribe(
      data=>{
        console.log(data)
      }
    ) */
    this.loadData();
  }
  deletePost(post){
    
    const uspesno = this.postService.deletePost(post._id,post.picture);
    console.log(uspesno)
    if(uspesno){
      this.snackBar.open('uspesno ste izbrisali post','OK',{duration:1500})
      this.loadData();
    }else{
      this.snackBar.open('Doslo je do greske','OK',{duration:1500})

    }
    this.loadData();
  }

  loadData(){
    this.posts =  this.postService.getAllPosts();
    
    console.log(this.posts)
  }
  getImage(img){
    return this.ruta+img

  }
}