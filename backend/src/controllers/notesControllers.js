import mongoose from "mongoose";
import Note from "../../models/Note.js";

export async function getAllNotes(req,res){
    try {
        const allNotes = await Note.find().sort({createdAt: -1})
        res.status(200).json(allNotes)
    } catch (error) {
        console.error("error in getAllNote function ",error);
        res.status(500).json({message:"the error form getAllNotes"})
    }
    // res.status(200).send("all of your notes has been fetched sucessfully nigger!!") 
} 

export async function getNodeById(req,res){

   try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).json({
        message:`the id:${req.params.id} provided is not valid`
    })
   }

   const noteById =  await Note.findById(req.params.id);

   if(!noteById){
    return res.status(404).json({
        message:`the note by ${req.params.id} is not found`
   })
   }

   res.status(200).json(
    noteById 
   )
   } catch (error) {
    console.error("the error was in getNoteByid fxn",error)
    res.status(500).json({
        message:"the error was in getNoteByid fxn"
    })
   }

}

export async function createNote(req,res){ 
    try { 
        const {title,content} = req.body // here the title n content by user stored 
        const newNote = new Note({title:title,content:content})
        const noteSaved = await newNote.save();  
        res.status(201).json(
            noteSaved
        // message:"your post has been added successfully!!"
    )
    } catch (error) { 
        console.error("error in createNote fxn",error)
        res.status(500).json({message:"the error form createNotes"})
    } 
     
}

export async function deleteNote(req,res){
    try {
        console.log("ID received:", req.params.id);
console.log("Mongoose:", mongoose);
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
         return res.status(400).json({
            message:"the id entered is not correct"
        })
    }

    const deletedNote = await Note.findByIdAndDelete(req.params.id)

    if(!deletedNote){
        return res.status(404).json({
            message:"node not found"
        })
    }
    res.status(200).json({
        message:"your post has been deleted successfully!!"
    })
    } catch (error) {
        console.error("the error is in deleteNote fxn",error)
        res.status(500).json({message:"the error form deleteNotes"})
    }
}

export async function updateNote(req,res){
    try {
        const {title,content} = req.body;
         if (!mongoose.Types.ObjectId.isValid(req.params.id)) {  //condition when the id format is correct acc to mangoose but not found in db 
            return res.status(400).json({    //to prevent it form directly going to catch block (castError)
                message: "Invalid note ID"
            });
        }

        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});  //updating the node

        if(!updatedNote){   //if updatedNote is null or not found 
            return res.status(404).json({
                message:"the node not found"
            })}

        res.status(200).json( //sucessful
            updatedNote 
        )
    } catch (error) {
        console.error("the error is in updateNote fxn",error) ;
        res.status(500).json({message:"the error form updateNotes"})
    }
 } 