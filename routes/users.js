const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const { storeReturnTo } = require('../middleware');

const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router.route("/register")
    .get(users.renderRegisterForm)
    .post(catchAsync(users.registerUser));

router.route("/login")
    .get(users.renderLoginForm)
router.post('/login', storeReturnTo,
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    (req, res) => {
        req.flash('success', 'Welcome back!');
        const redirectUrl = res.locals.returnTo || '/campgrounds';
        res.redirect(redirectUrl);
    });

// router.get('/logout', users.logout)

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

    });
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
});

module.exports = router;