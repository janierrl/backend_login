const mongoose = require('mongoose');
const { URI_DATABASE } = require ('./config.js');

mongoose.connect(URI_DATABASE, {
    useNewUrlParser: true,
})
    .then(db => console.log(`Connect to database ${db.connection.name} on port ${db.connection.port}`))
    .catch(err => console.error(err));