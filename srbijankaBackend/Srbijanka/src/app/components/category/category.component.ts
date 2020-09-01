import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { PostService } from 'src/app/servisi/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/models/Post';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/servisi/login.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private logingService:LoginService, private actiRoute:ActivatedRoute, private router:Router,private postService:PostService,private snackBar:MatSnackBar) { }

  posts:Post[];
  kategorija='';
  p:any;
  ruta:string='http://localhost:3000/api/posts/image/'
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.actiRoute.paramMap.subscribe((params:ParamMap)=>{
      this.kategorija=params.get('category')

      this.postService.getPostByCategory(this.kategorija).subscribe(
        data=>{
          this.posts=data['posts']
         
        }
      )
        
      
    })
  }

  getImage(img){
    return this.ruta+img
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
  
  ulogovanIn() {
    if (this.logingService.isLogged()) {
      return true;
    }
    return false;
  }

}
