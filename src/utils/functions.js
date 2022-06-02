const bookMetadata = (arrayData) => {
  const result = arrayData.map(({
    id, name, publisher,
  }) => ({
    id,
    name,
    publisher,
  }));
  return result;
};

const responseOk = (arrayData, h) => {
  const res = h.response({
    status: 'success',
    data: {
      books: arrayData,
    },
  });
  return res;
};

const responseMessageOk = (msg, h) => {
  const res = h.response({
    status: 'success',
    message: msg,
  });
  return res;
};

const responseCreated = (msg, id, h) => {
  const res = h.response({
    status: 'success',
    message: msg,
    data: {
      bookId: id,
    },
  }).code(201);
  return res;
};

const responseNotFound = (msg, h) => {
  const res = h.response({
    status: 'fail',
    message: msg,
  }).code(404);
  return res;
};

const responseBadRequest = (msg, h) => {
  const res = h.response({
    status: 'fail',
    message: msg,
  }).code(400);
  return res;
};

module.exports = {
  responseOk,
  responseMessageOk,
  responseCreated,
  responseNotFound,
  responseBadRequest,
  bookMetadata,
};
