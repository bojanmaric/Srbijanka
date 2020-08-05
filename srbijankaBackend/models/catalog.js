const mongoose=require('mongoose');

const CatalogShema=new mongoose.Schema({
    srcSlika:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true
    }
});

const Catalog=module.exports=mongoose.model('Catalog',KatalogShema);

module.exports.addCatalog=function(catalog,callback){
    catalog.save(callback);
}
module.exports.deleteCatalog=function(id,callback){
    Catalog.findByIdAndRemove({_id:id},callback);
}

module.exports.getKataloge=function(query,callback){
    Catalog.find(query).exec(callback)
}