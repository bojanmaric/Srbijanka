import {HttpInterceptor, HttpRequest,HttpHandler,HttpEvent}from '@angular/common/http'

import {Injectable} from '@angular/core';
import{tap}from'rxjs/operators';
import {Router} from '@angular/router';
import {LoginService}from '../servisi/login.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private router:Router, private loginService:LoginService){

    }
    intercept(req:HttpRequest<any>, next:HttpHandler){
        if(req.headers.get('noauth')){
            return next.handle(req.clone());
        }
        else{
            const clonedreq=req.clone({
                headers:req.headers.set("Authorization","Bearer "+this.loginService.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event=>{},
                    err=>{
                        if (err.error.auth==false) 
                        {
                            this.router.navigateByUrl('/login');
                        }
                    }
                )
            );
        }
    }

}


