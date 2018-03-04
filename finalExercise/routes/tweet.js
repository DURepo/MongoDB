const express = require('express');
router = express.Router();

var Tweet = require('../schema/tweet');


router.get('/', function (req, res, next) {
    res.render('tweet.pug');
});

router.get('/tweets', function (req, res, next) {
    //  return tweets

    //res.send(data);

    //  if there is time    // return recent tweets based on postedDate (sort) 

});

router.get('/tweetContent/:tweetContent', function (req, res, next) {
    let tweetContent = req.params.tweetContent
    //  return tweets based on tweet conetent like

    //res.send(data);
});

router.get('/tweetUser/:tweetUser', function (req, res, next) {
    let tweetUser = req.params.tweetUser
    //  return tweets posted by a tweetUser

    //res.send(data);
});

router.post('/addTweet', function (req, res, next) {
    //  insert a tweet 

    //res.send(JSON.stringify(tweet));
});

router.post('/updateTweet', function (req, res, next) {
    //  update the tweet content based on _id

    //res.send(JSON.stringify({ check: true }));
});

router.post('/deleteTweet', function (req, res, next) {
    let tweetId = req.body.tweetId
    //  remove a tweet based on _id

    //res.send(JSON.stringify({ check: true }));
});

module.exports = router;