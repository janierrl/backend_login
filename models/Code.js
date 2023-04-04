const { Schema, model } = require('mongoose');

const codeSchema = new Schema({
    email: String,
    code: String,
    createAt: Date
});

codeSchema.index({ createAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = model('Code', codeSchema);