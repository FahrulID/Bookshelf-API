const BooksRepository = require('../repository/books.repository.js');

class BooksService {
    constructor() {
        this.repository = BooksRepository;
    }

    async getAll(query) {
        const books = await this.repository.all(query);

        return books.map((book) => book.getPublic());
    }

    async getOne(id) {
        const book = await this.repository.findOne({ id });

        return book;
    }

    async create(data) {
        const book = await this.repository.insert(data);

        return {
            bookId: book.id,
        };
    }

    async update(id, data) {
        const result = await this.repository.update({ id }, data);

        if (result === null) return null;

        return true;
    }

    async delete(id) {
        await this.repository.delete({ id });
    }
}

module.exports = BooksService;