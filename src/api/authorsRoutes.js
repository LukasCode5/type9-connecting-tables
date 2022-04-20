const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const authorsRoutes = express.Router();

// ROUTES

// GET /api/authors - gauti visus autorius
authorsRoutes.get('/authors', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    const resourse = dbClient.db('library').collection('authors');
    const authorsArr = await resourse.find().toArray();
    res.status(200).json(authorsArr);
  } catch (error) {
    console.error('error in get authors', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

// POST /api/authors - sukurti nauja autoriu
authorsRoutes.post('/authors', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connected');
    const newAuthor = req.body;
    // kai gaunam _id string versija o reikia irasyti ObjectId tipo irasa,
    // paverciam string _id ObjectId su ObjectId(stringId)
    newAuthor.bookId = ObjectId(newAuthor.bookId);
    console.log(' newAuthor.bookId ===', ObjectId(newAuthor.bookId));
    const resourse = dbClient.db('library').collection('authors');
    const newPostAuthor = await resourse.insertOne(newAuthor);
    res.status(201).json(newPostAuthor);
  } catch (error) {
    console.log('error === in post authors', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
  }
});
module.exports = authorsRoutes;
