const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = [
    require('./routes/books'),
];

const app = express();
app.use(cors());
app.use(bodyParser.json());

routes.map(route => app.use('/api', route));

const mysql = require('./database/config');

app.get('/', (req, res) => {
    res.send({name: 'Yoshi'});
});

app.listen(process.env.port || 4000, function() {
    console.log('Server is running');
});