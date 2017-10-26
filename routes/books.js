const express = require('express');
const router = express.Router();
const connection = require('../database/config');
const moment = require('moment');
const mysql = require('mysql');

router.get('/books', (req, res) => {
    connection.connect((err) => {
        connection.query('select * from books', (err, result, fields) => {
            if (err)
            throw err;
            res.json({
                response: result,
                success: true
            });
        });
    });
});

router.post('/books', (req, res) => {
    if('book_name', 'pdf' in req.body) {
        connection.connect((err) => {
            let book = req.body.book_name;
            let publish = moment().format('YYYY-MM-DD');
            let pdf = req.body.pdf;
            let values = [
                [req.body.book_name, publish, pdf]
            ];
            connection.query('insert into books (book_name, publish_date, book_pdf_url) values ?', [values], (err, result, fields) => {
                if (err)
                throw err;
                res.json({
                    response: 'Book inserted successfully',
                    id: result.insertId,
                    success: true
                });
            });
        });
    }

    else {
        res.json({
            response: 'book_name and pdf keys are required',
            success: false
        })
    }
});

module.exports = router;