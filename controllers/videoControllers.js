import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: -1 });
        return res.render('home', { pageTitle: 'Home', videos });
    } catch (error) {
        console.log(error);
        return res.render('home', { pageTitle: 'Home', videos: [] });
    }
};
export const search = (req, res) => {
    const { term: searchingBy } = req.query;
    return res.render('search', { pageTitle: 'Search', searchingBy });
};
export const getUpload = (req, res) => res.render('upload', { pageTitle: 'Upload' });
export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path },
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
    });
    return res.redirect(routes.videos + routes.videoDetail(newVideo.id));
};
export const videoDetail = async (req, res) => {
    const { params: { id } } = req;
    try {
        const video = await Video.findById(id);
        return res.render('videoDetail', { pageTitle: video.title, video });
    } catch (error) {
        console.log(error);
        return res.redirect(routes.home);
    }
};
export const getEditVideo = async (req, res) => {
    const { params: { id } } = req;
    try {
        const video = await Video.findById(id);
        return res.render('editVideo', { pageTitle: `Edit Video ${video.title}`, video });
    } catch (error) {
        console.log(error);
        return res.redirect(routes.home);
    }
};
export const postEditVideo = async (req, res) => {
    const {
        body: { title, description },
        params: { id },
    } = req;

    try {
        await Video.findByIdAndUpdate(id, { title, description });
        return res.redirect(routes.videos + routes.videoDetail(id));
    } catch (error) {
        console.log(error);
        return res.redirect(routes.home);
    }
};
export const deleteVideo = async (req, res) => {
    const { params: { id } } = req;
    try {
        await Video.findByIdAndRemove(id);
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};
