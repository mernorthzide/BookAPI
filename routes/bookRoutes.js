var express = require('express'),
    _ = require('lodash');

var routes = function (Book) {
    var bookRouter = express.Router();

    /*  "/books"
     *    GET: finds all books
     *    POST: creates a new book
     */

    bookRouter.route('/')
        .post(function (req, res) {
            var book = new Book(req.body);
            book.timestamp = Math.floor(Date.now() / 1000);
            book.history = [book];
            book.save();
            res.status(201).send(book);
        })
        .get(function (req, res) {
            var query = {};

            if (req.query.genre) {
                query.genre = req.query.genre;
            }

            Book.find(query, function (err, books) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(books);
                }
            });
        });

    /*  "/books/:bookId"
     *    Middleware : get a book by id and pass on to the next thing
     */

    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send('no book found');
            }
        });
    });

    /*  "/books/:bookId"
     *    GET: find book by id,
     *    PUT: update book by id 
     *    PATCH: update book by id (for partial modifications)
     *    DELETE: deletes book by id
     */

    bookRouter.route('/:bookId')
        .get(function (req, res) {
            if (req.query.timestamp) {
                res.json(_.find(req.book.history, {
                    'timestamp': parseInt(req.query.timestamp)
                }));
            } else {
                res.json(req.book);
            }
        })
        .put(function (req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.timestamp = Math.floor(Date.now() / 1000);

            req.book.history.push(req.book);

            req.book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }

            for (var p in req.body) {
                req.book[p] = req.body[p];
            }

            req.book.timestamp = Math.floor(Date.now() / 1000);
            req.book.history.push(req.book);

            req.book.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .delete(function (req, res) {
            req.book.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });

    return bookRouter;
};

module.exports = routes;