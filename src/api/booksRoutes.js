const express = require('express');
const { dbClient } = require('../config');

const booksRoutes = express.Router();

// ROUTES

// Get /api/books/ - grazina visas knygas
booksRoutes.get('/books', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    const resourse = dbClient.db('library').collection('books');
    const booksArr = await resourse.find().toArray();
    res.status(200).json(booksArr);
  } catch (error) {
    console.error('error in get books', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});
booksRoutes.get('/books-agg2', async (req, res) => {
  try {
    const aggPipeline = [
      {
        $lookup: {
          from: 'authors',
          localField: '_id',
          foreignField: 'bookId',
          as: 'bookAuthorArr',
        },
      },
      {
        $sort: {
          rating: -1,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ['$bookAuthorArr', 0],
              },
              '$$ROOT',
            ],
          },
        },
      },
      {
        $project: {
          bookAuthorArr: 0,
        },
      },
    ];
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    const resourse = dbClient.db('library').collection('books');
    const booksArr = await resourse.aggregate(aggPipeline).toArray();
    res.status(200).json(booksArr);
  } catch (error) {
    console.error('error in get books', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

// POST /api/books/ - sukuriam nauja knyga
booksRoutes.post('/books', async (req, res) => {
  try {
    await dbClient.connect();
    const { title, year, rating } = req.body;
    const newBook = {
      title,
      year,
      rating,
    };
    const resourse = dbClient.db('library').collection('books');
    const newPostBook = await resourse.insertOne(newBook);
    res.status(201).json(newPostBook);
  } catch (error) {
    console.log('error === in post books', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
  }
});

// Get /api/books-authors/ - grazina visas knygas
booksRoutes.get('/books-authors', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    const resourse = dbClient.db('library').collection('books');
    const booksArr = await resourse
      .aggregate([
        {
          $lookup: {
            from: 'authors',
            localField: '_id',
            foreignField: 'bookId',
            as: 'authorArr',
          },
        },
      ])
      .toArray();
    console.log('booksArr ===', booksArr);
    const authorsWithBooksArr = booksArr.map((bookObj) => {
      if (bookObj.authorArr.length === 0) {
        return bookObj;
      }
      return {
        title: bookObj.title,
        year: bookObj.year,
        rating: bookObj.rating,
        authorName: bookObj.authorArr[0]?.name,
        authorTown: bookObj.authorArr[0]?.town,
      };
    });
    console.log('authorsWithBooksArr ===', authorsWithBooksArr);
    res.status(200).json(authorsWithBooksArr);
  } catch (error) {
    console.error('error in get books', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

module.exports = booksRoutes;
