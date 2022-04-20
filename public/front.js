const baseURL = 'http://localhost:3000/api';
console.log('front.js');

const listEl = document.getElementById('books');

async function getBooks(resourse) {
  const response = await fetch(`${baseURL}/${resourse}`);
  const atsInJs = await response.json();
  console.log('atsInJs ===', atsInJs);
  makeBookList(atsInJs);
}
getBooks('books-authors');

function makeBookList(booksArr) {
  listEl.innerHTML = booksArr.map((bObj) => `<li>${bObj.title}, ${bObj.year}</li>`).join('');
}
