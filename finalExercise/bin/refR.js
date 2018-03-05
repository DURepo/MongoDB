const express = require('express');
router = express.Router();

var Tweet = require('../schema/tweet');


router.get('/', function (req, res, next) {
    res.render('tweet.pug');
});

router.get('/tweets', function (req, res, next) {
    //  return tweets
    Tweet.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        })

    //  return recent tweets based on postedDate (sort) 
    /*Tweet.find({}).sort('-postedDate')
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        })
    Tweet.aggregate([{ $sort: { postedDate: -1 } }])
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        })*/
});

router.get('/tweetContent/:tweetContent', function (req, res, next) {
    let tweetContent = req.params.tweetContent
    //  return tweets based on tweet content like
    Tweet.find({ tweetContent: new RegExp(tweetContent, 'i') })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        })
    /*Tweet.find({ tweetContent: { $regex: tweetContent, $options: 'i' } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        })

    Tweet.find({ tweetContent: { $regex: tweetContent, $options: 'i' } }).where('tweetUser').equals('hello').select({ tweetUser: 1, tweetContent: 1, _id: 1 })
        .then((data) => {
            console.log(data)
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        })*/
});

router.get('/tweetUser/:tweetUser', function (req, res, next) {
    let tweetUser = req.params.tweetUser
    //  return tweets posted by a tweetUser
    Tweet.find({ tweetUser: tweetUser })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        })
});

router.post('/addTweet', function (req, res, next) {
    //  insert a tweet 
    let tweet = new Tweet({ tweetUser: req.body.tweetUser, tweetContent: req.body.tweetContent });
    //console.log(tweet);
    tweet.save()
        .then((e) => {
            //console.log(e);
            res.send(JSON.stringify(tweet));
        })
        .catch((err) => {
            console.log(err);
        })
});

router.post('/updateTweet', function (req, res, next) {
    //  update the tweet content based on _id
    Tweet.update({ _id: req.body.tweetId }, { $set: { tweetContent: req.body.tweetContent } })
        .then((e) => {
            //console.log(e);
            res.send(JSON.stringify({ check: true }));
        })
        .catch((err) => {
            console.log(err);
        })
});

router.post('/deleteTweet', function (req, res, next) {
    let tweetId = req.body.tweetId
    //  remove a tweet based on _id
    Tweet.remove({ _id: tweetId })
        .then((e) => {
            //console.log(e);
            res.send(JSON.stringify({ check: true }));
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = router;