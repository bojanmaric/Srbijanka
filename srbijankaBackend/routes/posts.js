var express= require('express');
var router=express.Router();
const Post=require('../models/post');
const path=require('path');
const crypto=require('crypto');
const multer = require('multer');
const fs=require('fs');
const {json}=require('express')

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads/posts')
    },
    filename:function(req,file,cb){
        crypto.pseudoRandomBytes(16, function(err,raw){
            var ext=file.originalname.split('.').pop();
            cb(null, raw.toString('hex')+ Date.now()+'.'+ext)
        });
    }

});
var upload =multer({
    storage:storage
})

router.post('/addPost',upload.single('file'), function(req,res,next){
    let post=new Post(JSON.parse(req.body.post));
    post.srcSlika=req.file.filename;
    Post.addPost(post,(err)=>{
        if(err){
            res.json({success:false,msg:'filed to add post'})
        }else{
            res.json({success:true, msg:'Post successful added'})
        }
    })
});





