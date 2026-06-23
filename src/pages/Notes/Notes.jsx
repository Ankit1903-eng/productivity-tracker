import { useState, useEffect } from "react";
import "./Notes.css";

function Notes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes
      ? JSON.parse(savedNotes)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes)
    );
  }, [notes]);

  const handleAddNote = () => {
    if (
      title.trim() === "" ||
      content.trim() === ""
    ) {
      return;
    }

    const newNote = {
      id: Date.now(),
      title,
      content,
    };

    setNotes([...notes, newNote]);

    setTitle("");
    setContent("");
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(
      (note) => note.id !== id
    );

    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) =>
    note.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-page">
      <h1>Notes</h1>

      <div className="note-form">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <button onClick={handleAddNote}>
          Add Note
        </button>

        <input
          type="text"
          placeholder="Search Notes..."
          className="search-input"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      <div className="notes-list">
        {filteredNotes.length === 0 ? (
          <p>No Notes Found</p>
        ) : (
          filteredNotes.map((note) => (
            <div
              className="note-card"
              key={note.id}
            >
              <h3>{note.title}</h3>

              <p>{note.content}</p>

              <button
                onClick={() =>
                  handleDeleteNote(note.id)
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notes;