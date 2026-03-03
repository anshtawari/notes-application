import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar.jsx"
import RateLimit from '../components/RateLimit.jsx';

import axios from "axios"
import toast from 'react-hot-toast';

import Notecard from '../components/Notecard.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';

const Homepage = () => {
  const [rateLimited, setRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        setNotes(res.data);
        setRateLimit(false);
        setLoading(false);
      } catch (error) {
        console.log("error in fetchNotes function")
        if (error.response?.status === 429) {
          setRateLimit(true);
        } else {
          toast.error("failed to load notes")
        }
      }
    }
    fetchNotes();
  }, []);
  return (
    <>
      <div className='min-h-screen'>
        <Navbar />
        {rateLimited && <RateLimit />}

        <div className='max-w-7xl mx-auto p-4 mt-6'>
          {loading && <div className='text-center-primary py-10'>Loading notes...</div>}
          {notes.length === 0 && !rateLimited &&<NotesNotFound/>}
          {notes.length > 0 && !rateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map((note)=>(
                <Notecard key={note._id} note={note} setNote={setNotes}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Homepage
