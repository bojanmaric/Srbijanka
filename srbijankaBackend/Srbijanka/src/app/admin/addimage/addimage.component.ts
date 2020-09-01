import { Component, OnInit } from '@angular/core';
import { KataloziSlikeService } from 'src/app/servisi/katalozi-slike.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.css']
})
export class AddimageComponent implements OnInit {

  constructor(private katService:KataloziSlikeService, private snackBar:MatSnackBar, private fb:FormBuilder) { }

  ngOnInit(): void {

  }
  file:File=null;

  image= this.fb.group({
    srcSlika:[''],
    description:[''],
    date:[Date.now()]
    
  })

  onImageAdded(event){
    this.file=event.target.files[0];
  }
  addImage(){
    if(this.image.valid){
      this.katService.setImage(this.image.value,this.file).subscribe(
        res=>{
          this.snackBar.open('Uspesno ste dodali','Close',{duration:1500})
        },error=>{
          this.snackBar.open('Greska na serveru', 'Close', { duration: 2500 });

        }
      )
 
    }else{
      this.snackBar.open('Niste popunili neophodna polja','Uredu')
    }
  }




}
