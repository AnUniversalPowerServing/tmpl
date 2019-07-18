<script type="text/javascript">
function deleteImage(publicId,resourceType,callback){ 
    console.log(resourceType);//image,video,raw

    cloudinary.api.delete_resources(publicId, function(result) {
        console.log(result);
         if(result.hasOwnProperty("error")){
             callback(result);
             return;
         }else{
              callback(result);

         }  
    },{all:true,resource_type:resourceType});   
}
deleteImage('acratica-libertarian-font-ffp_v094lw.png','image',function(response){});
</script>