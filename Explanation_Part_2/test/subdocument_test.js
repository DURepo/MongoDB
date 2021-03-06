const assert = require('assert');
const Student = require('../src/student');

describe('Subdocuments', () => {
    it('can create a subDoc', (done) => {
        const joe = new Student({
            name:'Joe', 
            posts: [{title: 'PostTitle'}]})
            
            joe.save()
            .then(() => { Student.findOne({name: 'Joe'})
            .then((student) => {
                assert(student.posts[0].title === 'PostTitle');
                done();
            })
            .catch((err) => { console.log(err) })
        })
    });
    
    it('adds sub docs to existing records', (done) => {
        const joe = new Student({
            name: 'Joe',
            posts: []
        });
        
        joe.save()
        .then(() => Student.findOne({ name: 'Joe' }))
        .then((student) => {
            student.posts.push({ title: 'New Post' });
            return student.save();
        })
        .then(() => Student.findOne({ name: 'Joe' }))
        .then((student) => {
            assert(student.posts[0].title === 'New Post');
            done();
        });
    })
    
    it('removes a sub doc from existing document', (done) => {
        const joe = new Student({
            name: 'Joe',
            posts: [{title: 'New Title'}]
        });
        
        joe.save()
        .then(() => Student.findOne({name: 'Joe'}))
        .then((student) => {
            const post  = student.posts[0];
            post.remove();
            return student.save();
        })
        .then(() => Student.findOne( { name: 'Joe'}))
        .then((student) => {
            assert(student.posts.length === 0);
            done();
        })
        .catch((err) => { console.log(err) })
    })
})