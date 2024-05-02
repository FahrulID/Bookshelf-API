const BaseRepository = require('../common/BaseRepository.js');
const Book = require('../entity/book.entity.js');

class BooksRepository extends BaseRepository {
    constructor() {
        super();

        this.collection_name = 'books';
        this.entity = Book;
        this.collectionInitialization();
    }

    async collectionInitialization() {
        const t = this;

        this.db.initializePersistence(this.adapter).then(() => {
            return t.db.loadDatabase();
        }).then(() => {
            const books = t.db.getCollection(this.collection_name);
            if (books === null) {
                t.db.addCollection(this.collection_name);
                t.db.saveDatabase();
            }

            t.collection = t.db.getCollection(this.collection_name);
        });
    }
}

const repository = new BooksRepository();

module.exports = repository;