const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

require('./database');

// settings
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors());

// routes
app.use('/api', require('./routes/route'));

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));
