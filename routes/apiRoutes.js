const express = require("express");
const {Videos, VideosDetails} = require("../models/videos")
 const { JsonWebTokenError } = require("jsonwebtoken")
 const jwtAuth = require("../middleware/jwtAuth")

const router = express.Router(); 
router.get("/", (req,res)=>{
    res.send("This is  API Routes Page")
})

   //all videos//

   
router.get("/videos", jwtAuth, async (req, res) => {

        const {search} = req.query;
        const query ={};

        if (search){
            query.title = {$regex: search,$options:'i'}
        }

    const allVideos = await Videos.find(query);
    console.log(allVideos);
    res.json({ Videos: allVideos });
})

   // individual api//
   router.get("/videos/:id",jwtAuth,async(req,res)=>{
    const{id} = req.params;
    const video = await VideosDetails.findOne({_id:id});
    if(!video){
        return res.json({message:"video not found"})

    }
    //  console.log(video);

      const videoTitle = video.title

    const similarVideos = await Videos.find({
        title:{$regex:videoTitle, $options:'i'},
        _id:{$ne:id}
    })

        res.status(200).json({videoDetails:video, similarVideos:similarVideos})
   })

   //filters api//

   router.get("/gaming", jwtAuth, async (req, res) => {
    try {
        const { title ,search} = req.query;
        const query = {};
        if (title) {
            const titleArray = title.split(',');

            query.title = { $in: titleArray.map(type => new RegExp(type, 'i')) }
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }

        const filteredVideos = await Video.find(query)

        if (filteredVideos?.length === 0) {
            return res.status(404).json({ messeage: "No Videos Found" })
        }
        return res.json(filteredVideos);

    } catch (e) {
        console.log(e);
        return res.json({ messeage: "Internal Server Error" })
    }
})

//trending api

router.get("/gaming", jwtAuth, async (req, res) => {
    try {
        const { title ,search} = req.query;
        const query = {};
        if (title) {
            const titleArray = title.split(',');

            query.title = { $in: titleArray.map(type => new RegExp(type, 'i')) }
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }

        const filteredVideos = await Video.find(query)

        if (filteredVideos?.length === 0) {
            return res.status(404).json({ messeage: "No Videos Found" })
        }
        return res.json(filteredVideos);

    } catch (e) {
        console.log(e);
        return res.json({ messeage: "Internal Server Error" })
    }
})

//trending api

router.get("/trending", jwtAuth, async (req, res) => {
    try {
        const { title ,search} = req.query;
        const query = {};
        if (title) {
            const titleArray = title.split(',');

            query.title = { $in: titleArray.map(type => new RegExp(type, 'i')) }
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }

        const filteredVideos = await Videos.find(query)

        if (filteredVideos?.length === 0) {
            return res.status(404).json({ messeage: "No Videos Found" })
        }
        return res.json(filteredVideos);

    } catch (e) {
        console.log(e);
        return res.json({ messeage: "Internal Server Error" })
    }
})
  
module.exports = router;