const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3001;
const personsRouter = require('./routes/personsRouter');
const cors = require('cors');

const unknownEndPoint = (req, res) => {
    res.status(404).json({ error: 'unknown endpoint' });
}

morgan.token('data', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(personsRouter);

app.listen(PORT, console.log(`Listening at ${PORT}`));

app.use(unknownEndPoint);
