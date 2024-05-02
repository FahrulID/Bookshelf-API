const Joi = require('joi');

const StoreValidation = Joi.object().keys({
    name: Joi.string().required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "Gagal menambahkan buku. Mohon isi nama buku";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    year: Joi.number().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "number.base":
                    err.message = "Gagal menambahkan buku. Tahun harus berupa angka";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    author: Joi.string().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                default:
                    break;
            }
        });
        return errors;
    }),
    summary: Joi.string().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                default:
                    break;
            }
        });
        return errors;
    }),
    publisher: Joi.string().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                default:
                    break;
            }
        });
        return errors;
    }),
    pageCount: Joi.number().min(0).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "number.base":
                    err.message = "Gagal menambahkan buku. Halaman harus berupa angka";
                    break;
                case "number.min":
                    err.message = "Gagal menambahkan buku. Halaman tidak boleh kurang dari 0";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    readPage: Joi.number().when('pageCount', {
        is: Joi.exist(),
        then: Joi.number().min(0).max(Joi.ref('pageCount')).required().error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "number.base":
                        err.message = "Gagal menambahkan buku. readPage harus berupa angka";
                        break;
                    case "number.min":
                        err.message = "Gagal menambahkan buku. readPage tidak boleh kurang dari 0";
                        break;
                    case "number.max":
                        err.message = "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    }).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "number.base":
                    err.message = "Gagal memperbarui buku. readPage harus berupa angka";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    finished: Joi.boolean().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                default:
                    break;
            }
        });
        return errors;
    }),
    reading: Joi.boolean().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                default:
                    break;
            }
        });
        return errors;
    }),
});

const UpdateValidation = Joi.object().keys({
    name: Joi.string().required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "Gagal memperbarui buku. Mohon isi nama buku";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    year: Joi.number().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "number.base":
                    err.message = "Gagal memperbarui buku. Tahun harus berupa angka";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    author: Joi.string().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                default:
                    break;
            }
        });
        return errors;
    }),
    summary: Joi.string().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                default:
                    break;
            }
        });
        return errors;
    }),
    publisher: Joi.string().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                default:
                    break;
            }
        });
        return errors;
    }),
    pageCount: Joi.number().min(0).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "number.base":
                    err.message = "Gagal memperbarui buku. Halaman harus berupa angka";
                    break;
                case "number.min":
                    err.message = "Gagal memperbarui buku. Halaman tidak boleh kurang dari 0";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    readPage: Joi.number().when('pageCount', {
        is: Joi.exist(),
        then: Joi.number().min(0).max(Joi.ref('pageCount')).required().error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "number.base":
                        err.message = "Gagal memperbarui buku. readPage harus berupa angka";
                        break;
                    case "number.min":
                        err.message = "Gagal memperbarui buku. readPage tidak boleh kurang dari 0";
                        break;
                    case "number.max":
                        err.message = "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    }).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "number.base":
                    err.message = "Gagal memperbarui buku. readPage harus berupa angka";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    finished: Joi.boolean().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                default:
                    break;
            }
        });
        return errors;
    }),
    reading: Joi.boolean().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                default:
                    break;
            }
        });
        return errors;
    }),
});

const FilterValidation = Joi.object().keys({
    name: Joi.string().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                default:
                    break;
            }
        });
        return errors;
    }),
    reading: Joi.number().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "number.base":
                    err.message = "Parameter reading harus berupa angka";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    finished: Joi.number().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "number.base":
                    err.message = "Parameter finished harus berupa angka";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
});

module.exports = { StoreValidation, UpdateValidation, FilterValidation };