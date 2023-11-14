const mongoose = require("mongoose");



const perfexUsersDataSchema = new mongoose.Schema({
     name:{
        type:String,
        require:true,
     },
     
     email:{
        type:String,
        require:true,
     },

     phoneNumber:{
        type:String,
        require:true,
     },

     gender:{
        type:String,
        require:true,
     },

     password:{
        type:String,
        require:true,
     },

     confirmPassword:{
      type:String,
      require:true,
     },
   
})


 const PerfexUsersData = mongoose.model('PerfexUsersData', perfexUsersDataSchema);

 module.exports = PerfexUsersData;