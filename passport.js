import passport from 'passwport';
import User from './models/User';

passport.use(User.createStrategy())