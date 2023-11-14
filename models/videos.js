 const mongoose = require("mongoose");

 const {schema} = mongoose;


const channelSchema = new mongoose.Schema({
       name : String,
         profile_image_Url : String
       })

const channelSchema2 = new mongoose.Schema({
            name : String,
              profile_image_Url : String,
              subscriber_count : String,
            })

       const videosSchema = new mongoose.Schema({
             title: String,
             thumbnail_Url: String,
             channel:[channelSchema],
             view_count:String,
             published_at:String,
             category: String,
            
        
           });

           const Videos = mongoose.model("videos", videosSchema);


           const videoDetails = new mongoose.Schema({
                title: String,
                 video_Url: String,
                 thumbnail_Url:String,
                 channel:[channelSchema2],
                 view_count:String,
                 published_at:String,
                 description:String,
                 category:String
                
                });

                const VideosDetails = mongoose.model("VideosDetails", videoDetails);

                module.exports = {VideosDetails, Videos};