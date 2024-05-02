const BaseController = require('../common/BaseController.js');
const BooksService = require('../service/books.service.js');

class BookController extends BaseController {
    constructor(req, h, joiSchema = null) {
        super(req, h, joiSchema);

        this.bookService = new BooksService();
    }

    async index() {
        const validation = await this.validate(this.req.query);
        if (validation !== undefined) return validation;
        if (this.req.query.reading !== undefined) this.req.query.reading = Boolean(Number(this.req.query.reading));
        if (this.req.query.finished !== undefined) this.req.query.finished = Boolean(Number(this.req.query.finished));

        let query = {};
        if (this.req.query.reading !== undefined) query.reading = this.req.query.reading;
        if (this.req.query.finished !== undefined) query.finished = this.req.query.finished;
        if (this.req.query.name !== undefined) query.name = { $regex: [this.req.query.name, 'i'] };

        const books = await this.bookService.getAll(query);

        return this.success(null, { books }, 200);
    }

    async get() {
        const bookId = this.req.params.bookId;
        const book = await this.bookService.getOne(bookId);

        if (book === null)
            return this.error('Buku tidak ditemukan', 404);

        return this.success(null, { book }, 200);
    }

    async store() {
        const validation = await this.validate(this.req.payload);
        if (validation !== undefined) return validation;

        const result = await this.bookService.create(this.req.payload);

        if (result === false)
            return await this.error('Internal Server Error', 500);

        return await this.success('Buku berhasil ditambahkan', result, 201);
    }

    async update() {
        const validation = await this.validate(this.req.payload);
        if (validation !== undefined) return validation;

        const bookId = this.req.params.bookId;
        const result = await this.bookService.update(bookId, this.req.payload);

        if (result === null)
            return this.error('Gagal memperbarui buku. Id tidak ditemukan', 404);

        return this.success('Buku berhasil diperbarui', null, 200);
    }

    async destroy() {
        const bookId = this.req.params.bookId;
        const book = await this.bookService.getOne(bookId);

        if (book === null)
            return this.error('Buku gagal dihapus. Id tidak ditemukan', 404);

        await this.bookService.delete(bookId);

        return this.success('Buku berhasil dihapus', null, 200);
    }
}

module.exports = BookController;