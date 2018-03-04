const assert = require('assert');
const Student = require('../src/student');

describe('Virtual Types', () => {

    it('postCount returns number of posts', (done) => {
        const joe = new Student({
            name:'Joe',
            posts: [{title: 'PostTitle'}]
        })

        joe.save()
            .then(()=> Student.findOne( { name: 'Joe'}))
            .then( (student) => {
                assert(joe.postCount === 1);
                done();
            })
    })

})