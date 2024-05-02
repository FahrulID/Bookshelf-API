const { Loki } = require('@lokidb/loki')
const { FSStorage } = require('@lokidb/fs-storage');
const fs = require('fs');

class BaseRepository {
    constructor() {

        if (this.constructor === BaseRepository) {
            throw new Error('Cannot instantiate abstract class');
        }

        this.db_name = 'bookshelf.db';
        this.db = new Loki(this.db_name);
        this.adapter = { adapter: new FSStorage() };
        this.databaseInitialization();
    }

    async databaseInitialization() {
        if (!fs.existsSync(this.db_name)) {
            await this.db.initializePersistence(this.adapter);
            this.db.saveDatabase();
        }
    }

    async insert(data) {
        const result = await this.collection.insert(this.entity.create(data));
        this.db.saveDatabase();
        return result;
    }

    async findOne(query) {
        return await this.entity.from(this.collection.findOne(query));
    }

    async find(query) {
        const result = await this.collection.find(query);
        return result.map((data) => this.entity.from(data));
    }

    async all(query) {
        const result = await this.collection.find(query);
        return result.map((data) => this.entity.from(data));
    }

    async delete(query) {
        await this.collection.findAndRemove(query);
        this.db.saveDatabase();
    }

    async update(query, data) {
        let result = this.collection.findOne(query);
        if (result === null) {
            return null;
        }
        result = result.update(data);

        this.collection.update(result);
        this.db.saveDatabase();
    }
}

module.exports = BaseRepository;