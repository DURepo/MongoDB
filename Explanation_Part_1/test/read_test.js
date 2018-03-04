const assert = require('assert')
const Student = require('../src/student')

describe('Reading user', ()=>{
    let joe;

    beforeEach((done)=>{
        joe = new Student({name:'Joe'})     //An _id is assigned here
        joe.save()
            .then(()=>{done();})
        
    });

    it('find student by name Joe', (done) => {
        //Find all users with name Joe
        Student.find({ name:'Joe' })
            .then((students)=>{

                assert(students[0]._id.toString() === joe._id.toString());  //_id is a object 
                done();
            });       

    });

    it('find student with one particular ID', (done) => {
        //findOne expects an object criteria to be passed, here ID passed as object
        Student.findOne({ _id: joe._id})
            .then((student) => {
                assert(student.name === 'Joe');
                done();
            })

    })

})