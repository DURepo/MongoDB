const assert = require('assert');
const Student = require('../src/student')

describe('Validating Records', () => {
    it('requires a Student name', () => {

        const student = new Student({name: undefined});

        const validationResult  =  student.validateSync();
        // console.log(validationResult)        

        const message = validationResult.errors.name.message;
        //const { message }  = validationResult.errors.name;         this is line is same as above line ES6 notation

        assert(message === 'Name is Required.');
    

    })


    it('requires student name longer than 2 character', () => {
        const student = new Student({name: 'Ab'});
        const validationResult = student.validateSync();
        const { message }  = validationResult.errors.name; 

        assert(message === 'Name must be longer than 2 characters');
        
    })

    it('disallows invalid records from being saved', (done)=> {
        const student = new Student({ name: 'Ab'});
        student.save()
            .catch((validationResult) => {
                const {message} = validationResult.errors.name;

                assert(message === 'Name must be longer than 2 characters')
                done();
            })


    });

})