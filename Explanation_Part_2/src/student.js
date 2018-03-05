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
    likes: Number

});

//uses getter and setter propery of ES6
StudentSchema.virtual('postCount').get(function(){
    return this.posts.length;
});

const Student = mongoose.model('students', StudentSchema);


module.exports = Student;