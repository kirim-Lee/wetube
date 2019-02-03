import routes from '../routes';

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle: 'Join'});
}
export const postJoin = (req, res) => {
    const {body: {password, password2, name, email}} = req;
    if(password !== password2) {
        res.status(400);
        return res.render("join", {pageTitle: 'Join'});
    } else {
        // To Do: Register User
        // To Do: Log in
        return res.redirect(routes.home);
    }
}
export const getLogin = (req, res) => res.render("login", {pageTitle: 'Login'});
export const postLogin = (req, res) => {
    res.redirect(routes.home);
}
export const logout = (req, res) => {
    // To Do: Process Log Out
    return res.redirect(routes.home);
}
export const userDetail = (req, res) => {
    return res.render("userDetail");
}
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");