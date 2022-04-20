const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authorsRoutes = require('./api/authorsRoutes');
const booksRoutes = require('./api/booksRoutes');

const { PORT } = require('./config');
const categoriesRoutes = require('./api/categoriesRoutes');

const app = express();

// Global MiddleWare
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json('OK'));

// Routes
app.use('/api', authorsRoutes);
app.use('/api', booksRoutes);
app.use('/api', categoriesRoutes);

app.listen(PORT, () => console.log('server online, PORT', PORT));
