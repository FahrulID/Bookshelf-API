const Route = require('./common/BaseRoute.js');
const BookController = require('./controller/book.controller.js');
const { StoreValidation, UpdateValidation, FilterValidation } = require('./validator/book.validator.js');

const book = Route.group('/books', [
    Route.get('', (req, h) => new BookController(req, h, FilterValidation).index()),
    Route.post('', (req, h) => new BookController(req, h, StoreValidation).store()),
    Route.get('/{bookId}', (req, h) => new BookController(req, h).get()),
    Route.put('/{bookId}', (req, h) => new BookController(req, h, UpdateValidation).update()),
    Route.delete('/{bookId}', (req, h) => new BookController(req, h).destroy()),
]);

const routes = [
    ...book,
]

module.exports = routes;