var express = require('express');
var router = express.Router();
var passport = require('passport');
var Product = require('../models/product');

var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', notLoggedIn, function(req, res, next){
    next();
});

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('user/profile');
});

router.get('/logout',isLoggedIn, function(req, res, next){
    req.logout();
    res.redirect('/');
});

router.get('/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next){
    if (req.session.oldurl) {
        res.redirect(req.session.oldurl);
    }
});


router.get('/signin', notLoggedIn, function(req, res, next) {
	var messages = req.flash('error');
	res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
 	successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res, next)
{
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next)
{
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}