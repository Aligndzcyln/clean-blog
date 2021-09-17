const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const ArticleSchema = new Schema({
    name: String,
    message: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;