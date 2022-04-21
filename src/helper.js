const { dbClient } = require('./config');

async function getArrayDb(collectionName) {
  try {
    // prisijungti
    await dbClient.connect();
    // gauti masyva
    const collection = dbClient.db('library').collection(collectionName);
    const arrFromDb = await collection.find().toArray();
    return arrFromDb;
  } catch (error) {
    console.error('error in get getArrayDb', error);
    // return false;
    throw new Error('error in get getArrayDb');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
}
async function getSingleDb(collectionName, stringId) {}

module.exports = {
  getArrayDb,
  getSingleDb,
};
