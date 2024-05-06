/**
 * 
 *  Create a table notes in Postgres Database

    CREATE TABLE notes (
        id SERIAL PRIMARY KEY,
        title TEXT,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
    );

*/
const Pool = require('pg').Pool;

const connection = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'notes',
    password: 'postgres',
    port: 5432,
});

const getAllNotes = async (req, res) => {
    try {
        const result = await connection.query("SELECT * FROM notes order by updated_at desc");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Error fetching notes" });
    }
};
const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const result = await connection.query("INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *", [title, content]);
        const newNote = result.rows[0];
        res.status(201).json(newNote);
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ error: "Error creating note" });
    }
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const result = await connection.query("UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *", [title, content, id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            const updatedNote = result.rows[0];
            res.json(updatedNote);
        }
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: "Error updating note" });
    }
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await connection.query("DELETE FROM notes WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.status(204).end();
        }
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Error deleting note" });
    }
};

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
};
