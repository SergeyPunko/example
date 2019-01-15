const localStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

//user model
const User = require('./models/User');

module.exports = function (passport) {
    passport.use('local', new localStrategy(
        {
            usernameField: 'mail',
            successRedirect: process.env.REACT_HOMEPAGE
        }, (mail, password, done) => {
            User.findOne({ 'local.mail': mail}, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false);
                }
                if (user.local.password !== password) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    })

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(null, user);
        })
    })

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_clientID,
        clientSecret: process.env.GITHUB_clientSecret,
        callbackURL: 'http://localhost:5000/github/callback'
    },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const valid = await User.findOne({
                    'github.id': profile.id
                });
                if (valid) {
                    return cb(null, valid)
                }
                const user = new User({
                    accounts: 'github',
                    github: {
                        id: profile.id,
                        name: profile.username
                    }
                })
                await user.save();
                cb(null, user);
            } catch (e) {
                cb(e, false, e.message);
            }
        }
    ));
}