const assert = require('assert');
const Student = require('../src/student');

describe('Subdocuments', () => {
    it('can create a subDoc', (done) => {
        const joe = new Student({
            name:'Joe', 
            posts: [{title: 'PostTitle'}]})
    

    joe.save()
        .then( () => {
            Student.findOne({name: 'Joe'})
            .then((student) => {
                assert(student.posts[0].title === 'PostTitle');
                done();
            })
        })
    });

    it('adds sub docs to existing records', () => {
        const joe = new Student({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then( () => { Student.findOne({ name: 'Joe'})})
            .then( (student) => {
                student.posts.push({ title: 'New Post'});   //js array.push operation
                return student.save(); //return save.. promise                 
            } )
            .then( () => student.findOne( {name: 'Joe'}))
            .then((Student) => {
                assert(student.posts[0].title[0].title === 'New Post');
                done();
            })
    })


    it('removes a sub doc from existing document', () => {
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
    })
})