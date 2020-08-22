import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/servisi/post.service';
import { Post } from 'src/app/models/Post';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {DomSanitizer}from '@angular/platform-browser'

declare var $:any;
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  ruta: string = 'http://localhost:3000/api/posts/image/';

  constructor(private actiRoute:ActivatedRoute,private postService:PostService, private fb:FormBuilder, private snackBar:MatSnackBar, private domSanitizer:DomSanitizer) { }

  comment=this.fb.group({
    postID:['',[Validators.required]],
    name:['',[Validators.required]],
    content:['',Validators.required],
    banned:[true],
    date:[Date.now()]
  })
  comments:Array<Comment[]>=new Array<Comment[]>();

  id:any;
  ngOnInit(): void {
    this.loadPost();
  }
  post:Post;

  loadPost(){
    this.actiRoute.paramMap.subscribe((params:ParamMap)=>{

      this.id=params.get('id');
      this.postService.getPostById(this.id).subscribe(data=>{
        this.post=data['post'];
        this.postService.getCommentsByPostID(this.id).subscribe(data2=>{
          this.comments=data2['comments'];
        })

        
      },error=>{
        console.log(error)
      })


    })

  }
  getVideo(video){

    return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+video)

  }
  postComment(){
    this.comment.patchValue({'postID':this.post._id,'banned':true})
    if(this.comment.valid){
      this.postService.addComment(this.comment).subscribe(
        data=>{
          if(data['success']===true){
            this.snackBar.open('Uspesno ste dodali komentar',"UREDU",{duration:1400});
            $('.commentForm').hide();
            $('.commentSuccess').show();
           
          }
        }
      )
    }
  }
  getImage(img){
    return this.ruta+img;

  }
}
