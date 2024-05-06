const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRouter = require('./routes/notes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Allow requests from all origins
app.use(cors({
  origin: '*'
}));
// Routes
app.use('/api/notes', notesRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
