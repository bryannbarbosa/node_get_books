const express = require('express');
const router = express.Router();
const connection = require('../database/config');
const mysql = require('mysql');

router.get('/book', (req, res) => {
  connection.connect((err) => {
    connection.query('select * from books', (err, result, fields) => {
      if (err)
        res.json({
            response: err,
            success: false
        })
      res.json({
        response: result,
        success: true
      });
    });
  });
});

router.get('/book/:id', (req, res) => {
  connection.connect((err) => {
    connection.query(`select * from books where id = ${req.params.id} `, (err, result, fields) => {
      if (err)
        res.json({
            response: err,
            success: false
        })
      res.json({
        response: result,
        success: true
      });
    });
  });
});

router.post('/book', (req, res) => {
  if ('book_name', 'pdf' in req.body) {
    connection.connect((err) => {
      let book = req.body.book_name;
      let pdf = req.body.pdf;
      let values = [
        [req.body.book_name, pdf]
      ];
      connection.query('insert into books (book_name, book_pdf_url) values ?', [values], (err, result, fields) => {
        if (err)
          res.json({
              response: err,
              success: false
          })
        res.json({
          response: 'Book inserted successfully',
          id: result.insertId,
          success: true
        });
      });
    });
  } else {
    res.json({
      response: 'book_name and pdf keys are required',
      success: false
    })
  }
});

router.put('/book/:id', (req, res) => {
  if ('book_name', 'pdf' in req.body) {
    connection.connect((err) => {
      let book = req.body.book_name;
      let pdf = req.body.pdf;
      let values = [
        [req.body.book_name, pdf]
      ];
      connection.query(`update books set book_name  = '${book}', book_pdf_url = '${pdf}' where id = ${req.params.id} `, (err, result, fields) => {
        if (err)
          res.json({
              response: err,
              success: false
          });
          console.log(err);
        res.json({
          response: 'Book updated successfully',
          success: true
        });
      });
    });
  } else {
    res.json({
      response: 'book_name and pdf keys are required',
      success: false
    })
  }
});

router.delete('/book/:id', (req, res) => {
  connection.connect((err) => {
    connection.query(`delete from books where id = ${req.params.id}`, (err, result, fields) => {
      if (err)
        res.json({
            response: err,
            success: false
        });
      res.json({
        response: 'Book deleted successfully',
        success: true
      });
    });
  });
});

module.exports = router;
