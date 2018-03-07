//This is model File
const mongoose = require('mongoose');
const PostSchema = require('./postSchema');

const schema = mongoose.Schema;

StudentSchema = new schema({
    //name: String,
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2 ,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is Required.']
    },

    posts: [PostSchema] , //list of subdocuments
    postCount: Number

});

const Student = mongoose.model('students', StudentSchema);


module.exports = Student;
