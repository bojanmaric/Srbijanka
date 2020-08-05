const mongoose=require('mongoose')

const CommentSchema=new mongoose.Schema({
    
    comments:{
        postID:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:false
        },
        content:{
            type:String,
            required:true
        },
        banned:{
            type:Boolean,
            default:false,
            required:true
        }
    }



},{timestamps:true});

const Comment=module.exports=mongoose.model('comment',CommentSchema);

module.exports.addComment=function(comment,callback){
    comment.save(callback)
}
module.exports.deleteComment=function(id,callback){
    Comment.findByIdAndRemove({_id:id},callback);

}
module.exports.updateComment=function(id,comment,callback){
    Comment.findByIdAndUpdate({_id:id},{$set:comment},callback)
}
module.exports.getComenntsByPostID=function(id,callback){
    Comment.find({'postID':id},{'banned':false},callback)
}
module.exports.getBannedComment=function(callback){
    Comment.find({'banned':true},callback)
}