import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleSubmit = async () => {
        const data = {
            content: content,
            title: title
        };
        try {
            const response = await axios.post('http://localhost:4000/api/notes', data);
            if (response.status === 201) {
                fetchNotes();
                setContent("");
                setTitle("");
            } else {
                alert("Failed to save");
            }
        } catch (error) {
            console.error('Error saving note:', error);
            alert("Failed to save");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure to delete this note?')) {
            try {
                const response = await axios.delete(`http://localhost:4000/api/notes/${id}`);
                if (response.status === 204) {
                    fetchNotes();
                } else {
                    alert("Failed to delete");
                }
            } catch (error) {
                console.error('Error deleting note:', error);
                alert("Failed to delete");
            }
        }
    };

    const handleUpdate = async (id, newTitle, newContent) => {
        const newData = {
            title: newTitle,
            content: newContent
        };
        try {
            const response = await axios.put(`http://localhost:4000/api/notes/${id}`, newData);
            if (response.status === 200) {
                fetchNotes();
            } else {
                alert("Failed to update");
            }
        } catch (error) {
            console.error('Error updating note:', error);
            alert("Failed to update");
        }
    };

    return (
        <div>
            <div className="container">
                <form id="save-notes">
                    <h1>Create Notes</h1>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            id="title"
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <input
                            type="text"
                            className="form-control"
                            name="content"
                            id="content"
                            placeholder="Notes"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        Save
                    </button>
                </form>

                <div>
                    <h2>Notes</h2>
                    <ul className='list-group rounded-none m-2 mb-5'>
                        {notes.map(note => (
                            <li className='list-group-item border-dark p-3 d-flex justify-content-between' key={note.id}>
                                <div>
                                    <h3>{note.title}</h3>
                                    <p>{note.content}</p>
                                </div>
                                <div>
                                    <button className="btn btn-danger mr-2" onClick={() => handleDelete(note.id)}>Delete</button>
                                    <button className="btn btn-primary ms-2" onClick={() => handleUpdate(note.id, prompt('Enter new title:', note.title), prompt('Enter new content:', note.content))}>Update</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
