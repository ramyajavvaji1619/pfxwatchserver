const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors =require("cors");
const { Videos, VideosDetails } = require("./models/videos");
const { subscribe } = require("./routes/authRouters");
 const {PerfexUsersData} = require("./models/perfexUsers")


const port = 4445|| process.env.PORT
const addVideos = async () => {
    try {
        const videoDetail = new VideosDetails({
            "title": "iB Hubs Super 30 - Grand Felicitation - Mr. Jay Merchant",
            "video_url": "https://www.youtube.com/watch?v=f5_EQcO2ppY",
            "thumbnail_url": "https://i.ytimg.com/vi/zb-b55az9fc/maxresdefault.jpg",
            "channel":[{
                "name": 
                "ABN Entertainment" ,
                "profile_image_url": "https://tse3.mm.bing.net/th?id=OIP.6cZAWai8i2UyWvNkTUX0tgHaHa&pid=Api&P=0&h=220",
                "subscriber_count": "9.5m"  // convert "4.75k" to a number
            }
        ],
            "view_count": "5.3m",// convert "5.6K" to a number
            "published_at": " 2 years ago",
            "description": "Mr. Jay Merchant, Acting Trainer, Darpana Academy, Gujarat",
            "category":"trending"
        });

        const savedVideoDetail = await videoDetail.save();

        const video = new Videos({
            _id: savedVideoDetail._id,
            "title": "iB Hubs Super 30 - Grand Felicitation - Mr. Jay Merchant",
            "thumbnail_url": "https://i.ytimg.com/vi/zb-b55az9fc/maxresdefault.jpg",
            "channel": [{
                "name": 
                "ABN Entertainment" ,
                "profile_image_url": "https://cdn-images-1.medium.com/max/1600/1*-0HVQ3RgjQkSYa7OPQCNJQ.jpeg"
            }
        ],
            "view_count": "5.3m",  // convert "1.4K" to a number
            "published_at": "2 years ago",
            "category":"trending"
        });

        await video.save();
        await mongoose.disconnect();
    } catch (e) {
        console.log(e);
    }
};

//   addVideos();



app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ramyajavvaji1619:ramya123@cluster0.wvm1yil.mongodb.net/ramya?retryWrites=true&w=majority')
.then(()=> console.log('DB connected'))
.catch((error)=>console.log(error));

app.get("/", async(req,res)=>{
    res.send("server running at 4445")
})
app.use("/auth", require("./routes/authRouters"));
app.use("/api", require("./routes/apiRoutes"));

app.listen(port, ()=> console.log(`server running at${port}`));