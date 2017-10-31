const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const storage = require('./scripts/storage');
const upload = require('./scripts/upload');
const app = express();



const routes = [
  require('./routes/books'),
];

app.use(cors());
app.use(bodyParser.json());

routes.map(route => app.use('/api', route));

app.use("/uploads/documents", express.static(__dirname + '/uploads/documents'));



const mysql = require('./database/config');

app.listen(process.env.port || 4000, function() {
  console.log('Server is running');
});
