import React from 'react'
import { Link } from 'react-router'
import api from "../lib/axios.js"
import { PenSquareIcon,Trash2Icon } from 'lucide-react'
import { formatDate } from "../lib/utils.js";
import toast from 'react-hot-toast';


const Notecard = ({note,setNote}) => {
    const handleDelete = async (e,d_id)=>{
        e.preventDefault();
         if (!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/notes/${d_id}`)
            setNote((previousNote)=>previousNote.filter((note)=> note._id!==d_id));
            toast.success("the note is deleted sucessfully");
        } catch (error) {
            console.log("error occures in handelDelete function",error);
            toast.error("falied to delete note");

        }
    }

  return (
      <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Notecard