import mongoose from "mongoose";

// 1. to create a schema 
// 2. to create a model based on that schema

const noteSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
    }, 
    {timestamps : true}
);

const Note = mongoose.model("Note",noteSchema)

export default Note 