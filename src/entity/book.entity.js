const crypto = require('crypto');

class Book {
    constructor({
        id = crypto.randomUUID(),
        name = null,
        year = null,
        author = null,
        summary = null,
        publisher = null,
        pageCount = null,
        readPage = null,
        finished = null,
        reading = null,
        insertedAt = new Date().toISOString(),
        updatedAt = new Date().toISOString()
    } = {}) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.author = author;
        this.summary = summary;
        this.publisher = publisher;
        this.pageCount = pageCount;
        this.readPage = readPage;
        this.finished = finished;
        this.reading = reading;
        this.insertedAt = insertedAt;
        this.updatedAt = updatedAt;
    }

    static create(data) {
        if (data === null) return null;
        data.finished = (data.pageCount === data.readPage) ? true : false;

        return new Book(data);
    }

    static from(data) {
        if (data === null) return null;

        return new Book(data);
    }

    update({ name, year, author, summary, publisher, pageCount, readPage, reading }) {
        let finished = (pageCount === readPage) ? true : false;

        this.name = name;
        this.year = year;
        this.author = author;
        this.summary = summary;
        this.publisher = publisher;
        this.pageCount = pageCount;
        this.readPage = readPage;
        this.finished = finished;
        this.reading = reading;
        this.updatedAt = new Date().toISOString();
        return this;
    }

    getPublic() {
        return {
            id: this.id,
            name: this.name,
            publisher: this.publisher,
        };
    }
}

module.exports = Book;