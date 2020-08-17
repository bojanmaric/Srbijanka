import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/servisi/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/models/Post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  constructor(private fb: FormBuilder, private postService: PostService, private snackBar: MatSnackBar) { }

  slika: File = null;
  picture: string;


  pokazi = false;

  post = this.fb.group({
    userPost: ['asfsda'],
    userID: ['1'],
    picture: [''],
    description: ['', [Validators.required]],
    title: ['', [Validators.required]],
    date: [Date.now()],
    video: ['noVideo'],
    category: ['', [Validators.required]]

  })


  ngOnInit(): void {
  }
  resetForm() {
    this.post.reset;
  }
  onImageAdded(event) {
    this.slika = event.target.files[0];
    this.picture = this.slika.name;
  }
  add() {
    console.log(this.post)
    if (this.post.valid) {
      this.pokazi = true;
      this.postService.addPost(this.post, this.slika).subscribe(
        res => {
          this.pokazi = false;
          this.postService.getAllPosts().subscribe() 
          this.snackBar.open('Uspešno dodat Post', 'Close', { duration: 2500 });

        }, error => {
          this.pokazi = false;
          this.snackBar.open('Greska', 'Close', { duration: 2500 });

        }

      );

    } else {

      this.snackBar.open('niste popunili sva polja', 'Close', { duration: 2500 });
    }


  }

}
