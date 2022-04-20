const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const categoriesRoutes = express.Router();

categoriesRoutes.get('/categories', async (req, res) => {
  try {
    await dbClient.connect();
    const collection = dbClient.db('cao9').collection('categories');
    const allCategories = await collection.find().toArray();
    res.status(200).json(allCategories);
  } catch (error) {
    console.log('error === in get categories', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
  }
});

module.exports = categoriesRoutes;
