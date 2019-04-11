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

export const githubLogin = passport.authenticate('github');

export const fbLogin = passport.authenticate('facebook', {scope: ['email']});

export const githubLoginCallback = async (_accessToken, _refreshToken, profile, cb) => {
    const {_json: {id, avatar_url: avatarUrl, name, email}} = profile;
    if (!email) {
        return cb(null);
    }
    try {
        const user = await User.findOne({email});
        if (user) {
            user.githubId = id;
            if(!user.avatarUrl) user.avatarUrl = avatarUrl;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            avatarUrl,
            githubId: id
        });
        return cb(null, newUser);
    }catch(error){
        return cb(error);
    }
}

export const fbLoginCallback = async (_accessToken, _refreshToken, profile, cb) => {
    const {_json: {id, name, email}} = profile;
    if (!email) {
        return cb(null);
    }
    try {
        console.log('myId:', id);
        const user = await User.findOne({email});
        if (user) {
            user.facebookId = id;
            if(!user.avatarUrl) user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            avatarUrl,
            facebookId: id
        });
        return cb(null, newUser);
    } catch(error) {
        return cb(error);
    }
}

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
}

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    req.logout();
    return res.redirect(routes.home);
};

export const getMe = async (req, res) => {
    let user = null
    try {
        user = await User.findById(req.user.id).populate('videos');
    } catch(err) {
        console.log(err);
    } finally {
        return res.render('userDetail', {pageTitle: 'User Profile', user: user ? user : req.user});
    }
}

export const userDetail = async (req, res) => {    
    try {
        const user = await User.findById(req.params.id).populate('videos');
        if (user) {
            return res.render('userDetail', {pageTitle: 'User Profile', user});
        } else {
            return res.redirect(routes.home);
        }
    } catch(error) {
        return res.redirect(routes.home);
    }
    
}
export const getEditProfile = (req, res) => res.render('editProfile', {pageTitle: 'Edit Profile'});
export const postEditProfile = async (req, res) => {
    const {
        body: {name, email},
        file
    } = req;
    try {
        const user = await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file && file.location ? `${file.location}` : req.user.avatarUrl
        });
        return res.redirect(routes.users+routes.me);
    } catch (error) {
        console.log(error);
        res.redirect(routes.users + routes.editProfile);
    }
}

export const getChangePassword = (req, res) => res.render('changePassword', {pageTitle: 'Change Password'});
export const postChangePassword = async (req, res) => {
    const {oldPassword, newPassword, newPassword1} = req.body;
    if (newPassword === newPassword1) {
        try {
            await req.user.changePassword(oldPassword, newPassword);
            return res.redirect(routes.users+routes.me);
        } catch(error) {
            console.log(error);
            res.status(400);
            return res.redirect(routes.users + routes.changePassword);
        }
    } else {
        res.status(400);
        return res.redirect(routes.users + routes.changePassword);
    }
}
