require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const personsRouter = require('./routes/personsRouter');
const { errorHandler, unknownEndPoint } = require('./errorHandling/errorHandler')
const PORT = process.env.PORT || 3001;



morgan.token('data', (req, res) => JSON.stringify(req.body));
app.use(express.static('./build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(personsRouter);

app.listen(PORT, console.log(`Listening at ${PORT}`));

app.use(unknownEndPoint);
app.use(errorHandler);
