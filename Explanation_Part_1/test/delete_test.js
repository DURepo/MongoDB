const assert = require('assert')
const Student = require('../src/student')


describe('Delete a Student', () => {
    let joe;
    
    beforeEach((done) => {
        joe = new Student({ name:'Joe' })     //An _id is assigned here
        joe.save()
        .then(() => { done() })
    });
    
    
    it('model instance remove', (done) => {
        joe.remove()
        .then(() => Student.findOne({ name: 'Joe' }))
        .then((student) => {
            assert (student === null);
            done();
        });
    });
    
    it('class method remove', (done) => {
        //Removes all records matching the criterila
        
        Student.remove({ name: 'Joe' })
        .then(() => Student.findOne({ name: 'Joe' }))
        .then((student) => {
            assert (student === null);
            done();
        });
    });
    
    it('class method findOneAndRemove', (done) => {
        Student.findOneAndRemove({ name: 'Joe' })
        .then(() => Student.findOne({ name: 'Joe' }))
        .then((student) => {
            assert (student === null);
            done();
        });
        
    });
    
    // it('class method findByIdAndRemove', (done) => {
    //     Student.findByIdAndRemove(joe._id)
    //         .then((student) => {
    //             console.log(student)
    //             assert (student === null);
    //             done();
    //         });
    // });
})