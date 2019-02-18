import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => {
    return res.render('join', { pageTitle: 'Join' });
}
export const postJoin = async (req, res, next) => {
    const {
        body: {
            password,
            password2,
            name,
            email
        }
    } = req;
    if (password !== password2) {
        res.status(400);
        return res.render('join', { pageTitle: 'Join' });
    } else {
        try {
            const user = await User({name, email})
            User.register(user, password);
            next();
        } catch(err) {
            console.log(err);
            return res.redirect(routes.home);
        }
    }
};
export const getLogin = (req, res) => res.render('login', {pageTitle: 'Login'});
export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const logout = (req, res) => {
    // To Do: Process Log Out
    return res.redirect(routes.home);
};
export const userDetail = (req, res) => res.render('userDetail');
export const editProfile = (req, res) => res.render('editProfile', {pageTitle: 'Edit Profile'});
export const changePassword = (req, res) => res.render('changePassword');
