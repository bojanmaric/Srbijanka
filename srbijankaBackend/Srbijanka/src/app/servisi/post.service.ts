import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/Post';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostService {
   ruta:string = 'http://localhost:3000/api/posts';
  dataChange: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
 
  constructor(private httpClient: HttpClient, private router: Router) { }

  public getAllPosts():Observable<Post[]>{
    this.httpClient.get<Post[]>(this.ruta+'/getAll').subscribe(data=>{
      
      this.dataChange.next(data)
    },(error:HttpErrorResponse)=>{
      console.log(error.name+' '+error.message)
    });
   // console.log(this.dataChange)
    return this.dataChange.asObservable();
  }
  public getPostById(id) {

    return this.httpClient.get(this.ruta + '/getPost/' + id)

  }
  public updateArtikal(id, post) {

    return this.httpClient.put(this.ruta + '/' + id, post);
  }
  public deletePost(id,img):boolean{
  
    var uspesno=true;
    this.httpClient.delete(this.ruta+'/'+id).subscribe(
      data=>{
        
        
        this.httpClient.delete(this.ruta+'/brisi/'+img).subscribe(
          data=>{
           
            if(data['success']==true){
              console.log('uspe')
              this.getAllPosts().subscribe();
              return uspesno;
            }
            else{
              return uspesno=false;
            }
          }
        )
      }
    )
    return uspesno
  }
  public addPost(post,file){
    var body=JSON.stringify(post.value);
    const fData:FormData=new FormData();
    fData.append('post',body);
    fData.append('file',file,file.name);
    return this.httpClient.post(this.ruta+'/addPost',fData)
  }
  public addComment(comment){
    var body=JSON.stringify(comment.value);
    const fdata:FormData=new FormData();
    
    fdata.append('comment',body);
    console.log(fdata)
    return this.httpClient.post(this.ruta+'/comment',comment.value)
  }

}
