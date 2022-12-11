const passport = require('passport')
var GitHubStrategy = require('passport-github2').Strategy;
const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('../Models/User.model');
// const ensureAuthenticated = require('../Middleware/auth');


router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: "http://localhost:5000/auth/github/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    const user = await User.find({ id: profile.id });

    if (user.length == 0) {
      const res = new User({
        id: profile.id,
        nodeId: profile.nodeId,
        username: profile.username,
        displayName: profile.displayName,
        photos: profile.photos[0].value,
        token: accessToken
      });
      await res.save();
    }
    return done(null, profile);

  }
));

// router.get('/', ensureAuthenticated, (req, res) => {
//   res.send(req.user)
// })

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get('/github',
  passport.authenticate('github', { scope: ['user:profile'] }),
)

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login/failed' }),
  function (req, res) {
    res.redirect('http://localhost:3000');
  });

router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect(process.env.clientURL);
  });


});

module.exports = router;
