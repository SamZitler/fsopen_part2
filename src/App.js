import {useState, useEffect} from 'react'
import Note from './components/Note'
import Footer from './components/Footer'
import Notification from './Notification'
import noteService from './services/notes'
import './index.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [importantOnly, setImportantOnly] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect( () => {
    noteService
      .getAll()
      .then( allNotes => {
        setNotes(allNotes);
      })
      .catch(error => {
        console.log(error);
        setErrorMessage(`Could not fetch notes. ERROR: ${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
  }, [])

  const saveNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: (Math.random() < 0.5)
    };

    noteService
      .create(noteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote));
        setNewNote("");
      })
      .catch(error => {
        alert(`Failed to save new note. ERROR: ${error.message}`);
        console.log(error);
      });
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find( (n) => n.id===id );
    const updatedNote = {...note, important: !note.important};

    noteService
      .update(id, updatedNote)
      .then(updatedNote => {
        setNotes(notes.map( (n) => n.id===id ? updatedNote : n ));
      })
      .catch(error => {
        alert(`Failed to toggle importance of note. ERROR: ${error.message}`);
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <input 
        type='checkbox'
        onChange={ (event) =>
          setImportantOnly(event.target.checked)
        }
      />
      {" "}
      <label>Show important notes only</label>
      <ul>{
          notes
            .filter(note => importantOnly ? note.important : true)
            .map(
              note => (
                <Note
                  key={note.id}
                  note={note}
                  toggleImportance={() => toggleImportanceOf(note.id)}
                />
              )
            )
      }</ul>
      <form onSubmit={saveNote}>
        <input
          value={newNote}
          onChange={
            (event) => {
              setNewNote(event.target.value);
            }
          }
        />
        {" "}
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  );
}

export default App;
