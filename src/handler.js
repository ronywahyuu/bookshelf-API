const {
  nanoid,
} = require('nanoid');
const books = require('./books');
const {
  bookMetadata,
  responseCreated,
  responseOk,
  responseMessageOk,
  responseNotFound,
  responseBadRequest,
} = require('./utils/functions');

const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  // const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const bookObj = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt,
    updatedAt,
  };

  const isHaveName = bookObj.name !== undefined;
  const readPageVal = bookObj.readPage;
  const pageCountVal = bookObj.pageCount;

  // if bookname not inputted
  if (!isHaveName) {
    return responseBadRequest('Gagal menambahkan buku. Mohon isi nama buku', h);
  }

  // if readpage more than pagecount
  if (readPageVal > pageCountVal) {
    return responseBadRequest('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', h);
  }

  // normal condition
  books.push(bookObj);
  return responseCreated('Buku berhasil ditambahkan', id, h);
};

const getBooks = (request, h) => {
  const { reading, finished, name } = request.query;

  // get all books contain "dicoding" name
  let filteredBooks = books;
  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book
      .name.toLowerCase().includes(name.toLowerCase()));

    return responseOk(bookMetadata(filteredBooks), h);
  }

  // get onread books
  if (reading === '1') {
    const isReading = books.filter((book) => book.reading === true);
    return responseOk(bookMetadata(isReading), h);
  }

  // get unread books
  if (reading === '0') {
    const unreadingBooks = books.filter((book) => book.reading === false);
    return responseOk(bookMetadata(unreadingBooks), h);
  }

  // get finished books
  if (finished === '1') {
    const isFinished = books.filter((book) => book.finished === true);
    return responseOk(bookMetadata(isFinished), h);
  }

  // get unfinished Books
  if (finished === '0') {
    const unfinishedBooks = books.filter((book) => book.finished === false);

    return responseOk(bookMetadata(unfinishedBooks), h);
  }

  return responseOk(bookMetadata(books), h);
};

const getBookById = (request, h) => {
  const {
    bookId,
  } = request.params;

  const filteredBook = books.filter((book) => book.id === bookId);
  const [selectedBook] = filteredBook;
  if (filteredBook.length <= 0) {
    return responseNotFound('Buku tidak ditemukan', h);
  }

  const response = h.response({
    status: 'success',
    data: {
      book: selectedBook,
    },
  });
  return response;
};

const deleteBook = (request, h) => {
  const {
    bookId,
  } = request.params;
  const filteredBook = books.filter((book) => book.id === bookId);

  if (filteredBook.length <= 0) {
    return responseNotFound('Buku gagal dihapus. Id tidak ditemukan', h);
  }

  books.splice(filteredBook, 1);
  return responseMessageOk('Buku berhasil dihapus', h);
};

const updateBook = (request, h) => {
  const {
    bookId,
  } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);

  if (!name) {
    return responseBadRequest('Gagal memperbarui buku. Mohon isi nama buku', h);
  }

  if (pageCount < readPage) {
    return responseBadRequest('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', h);
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: readPage === pageCount,
      reading,
      updatedAt,
    };

    return responseMessageOk('Buku berhasil diperbarui', h);
  }

  return responseNotFound('Gagal memperbarui buku. Id tidak ditemukan', h);
};

module.exports = {
  getBooks,
  addBook,
  getBookById,
  deleteBook,
  updateBook,
};
