const express = require('express');
const routes = require('./routes.js');
const morgan = require('morgan');
const cors = require('cors');
require('./database.js');

const app = express();

app.use(cors({
    origin: 'exp://192.168.1.103:19000'
}))

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(routes);

app.listen(3004,() => {
    console.log(`Server on port ${3004}`);
});