import express from 'express';
import routes from '../routes';
import { videoDetail, getEditVideo, postEditVideo, deleteVideo, postUpload, getUpload } from '../controllers/videoControllers';
import { uploadVideo } from '../middlewares';

const videoRouter = express.Router();

// upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// edit
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;