import passport from 'passport';
import GithubStrategy from 'passport-github';
import FacebookStrategy from 'passport-facebook';
import User from './models/User';
import { githubLoginCallback, fbLoginCallback } from './controllers/userControllers';
import routes from './routes';

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.PRODUCTION ? 
        `https://safe-journey-47768.herokuapp.com${routes.githubCallback}` : 
        `http://localhost:4000${routes.githubCallback}`
}, githubLoginCallback));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.PRODUCTION ? 
        `https://safe-journey-47768.herokuapp.com${routes.fbCallback}` : 
        `http://localhost:4000${routes.fbCallback}`,
    profileFields: ['id', 'displayName', 'email']
}, fbLoginCallback));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());