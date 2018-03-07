const assert = require('assert')
const Student = require('../src/student')


describe('Create records', () => {
    it('save operation', (done) => {
        const joe = new Student({ name: 'Joe' })    //joe is an instance of Subject Model
        
        //save joe to database; which returns a promise once completed.
        joe.save()
        .then(() => {
            //now joe is saved                
            assert(!joe.isNew);
            done();
        })
    })
})