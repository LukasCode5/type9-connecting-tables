const bookObj = {
  _id: '625e64ccf0309fcf5bcd6df4',
  title: 'Book 1',
  year: 2000,
  rating: 4,
  authorArr: [
    {
      _id: '625e718504a9b702421b6d37',
      name: 'James book1',
      town: 'London',
      bookId: '625e64ccf0309fcf5bcd6df4',
    },
  ],
};
// obj1.authorName = obj1.authorArr[0].name;
// obj1.authorTown = obj1.authorArr[0].town;
// delete obj1.authorArr;
const objCopy = {
  title: bookObj.title,
  year: bookObj.year,
  rating: bookObj.rating,
  authorName: bookObj.authorArr[0].name,
  authorTown: bookObj.authorArr[0].town,
};
console.log('obj1 ===', bookObj);
console.log('objCopy ===', objCopy);

const obj2 = {
  _id: '625e64ccf0309fcf5bcd6df4',
  title: 'Book 1',
  year: 2000,
  rating: 4,
  name: 'James book1',
  town: 'London',
};
