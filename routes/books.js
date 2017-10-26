const express = require('express');
const router = express.Router();

router.get('/books', (req, res) => {
    res.json({
        response: 'This is a test',
        success: true
    });
});

module.exports = router;