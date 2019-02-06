import routes from '../routes';

export const home = (req, res) => {
    return res.render("home", {pageTitle: 'Home', videos});
}
export const search = (req, res) => {
    const {term: searchingBy} = req.query;
    return res.render("search", {pageTitle: 'Search', searchingBy, videos});
}
export const getUpload = (req, res) => res.render("upload", {pageTitle: 'Upload'});
export const postUpload = (req, res) => { 
    const {body: { file, title, description }} = req;
    // To Do : Upload and Save Video
    return res.redirect(routes.videos + routes.videoDetail(1))
}
export const videoDetail = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");