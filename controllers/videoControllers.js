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
export const search = async (req, res) => {
    const { term: searchingBy } = req.query;
    try {
        const videos = await Video.find({ title: { $regex: searchingBy, $options: "i"}});
        return res.render('search', { pageTitle: 'Search', searchingBy, videos });
    } catch (error) {
        console.log(error);
        return res.render('search', { pageTitle: 'Search', searchingBy, videos: [] });
    }
    
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
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    return res.redirect(routes.videos + routes.videoDetail(newVideo.id));
};
export const videoDetail = async (req, res) => {
    const { params: { id } } = req;
    try {
        const video = await Video.findById(id).populate('creator');
        console.log(video);
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
        if (video.creator.toString() !== req.user.id.toString()) {
            throw Error();            
        }
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
        const video = await Video.findById(id);
        if (video.creator.toString() !== req.user.id.toString()) {
            throw Error();            
        }
        await Video.findByIdAndRemove(id);
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
    res.redirect(routes.home);
};
