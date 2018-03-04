//This is model File
const mongoose = require('mongoose');

const schema = mongoose.Schema;

StudentSchema = new schema({
    //name: String,
    name: {
        type: String,
        validate:{
            validator: (name) => name.length > 2 ,
            message: 'Name must be longer than 2 characters'
        },
        require: [true, 'Name is Required.']
    },
    postCount: Number
})

const Student = mongoose.model('students', StudentSchema);


module.exports = Student;