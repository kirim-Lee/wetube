import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", {pageTitle: 'Home', videos});
    } catch(error) {
        console.log(error);
        return res.render("home", {pageTitle: 'Home', videos: []});
    }
}
export const search = (req, res) => {
    const {term: searchingBy} = req.query;
    return res.render("search", {pageTitle: 'Search', searchingBy, videos});
}
export const getUpload = (req, res) => res.render("upload", {pageTitle: 'Upload'});
export const postUpload = async (req, res) => { 
    const {
        body: { title, description }, 
        file: {path}
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    })
    console.log(newVideo);
    res.redirect(routes.videos + routes.videoDetail(newVideo.id))
}
export const videoDetail = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");