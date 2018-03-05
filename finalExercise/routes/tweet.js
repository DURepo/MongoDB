const express = require('express');
router = express.Router();

var Tweet = require('../schema/tweet');


router.get('/', function (req, res, next) {
    res.render('tweet.pug');
});

router.get('/tweets', function (req, res, next) {
    // return tweets

    // send data back to the view

    // OPTIONAL TASK: return recent tweets based on postedDate (sort)

});

router.get('/tweetContent/:tweetContent', function (req, res, next) {
    let tweetContent = req.params.tweetContent
    //  return tweets based on tweet conetent like

    // send data back to the view
});

router.get('/tweetUser/:tweetUser', function (req, res, next) {
    let tweetUser = req.params.tweetUser
    //  return tweets posted by a tweetUser

    // send data back to the view
});

router.post('/addTweet', function (req, res, next) {
    //  insert a tweet 

    // send the data to the view as a Json string, example: res.send(JSON.stringify(tweet));
});

router.post('/updateTweet', function (req, res, next) {
    // update the tweet content based on _id

    // send a JS object with check property set to true as a Json string like in the previous example
});

router.post('/deleteTweet', function (req, res, next) {
    let tweetId = req.body.tweetId
    //  remove a tweet based on _id

    // send a JS object with check property set to true as a Json string like in the previous example
});

module.exports = router;