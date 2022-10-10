const mongoose = require("mongoose")

const emiSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    emiHistory:[{
        amount:{
            type:Number,
            require:true
        },
        rate:{
            type:Number,
            require:true,
        },
        months:{
            type:Number,
            require:true
        }
    }]
})

module.exports = mongoose.model("emiHistory",emiSchema)