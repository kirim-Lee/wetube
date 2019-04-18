import express from 'express';
import routes from '../routes';
import {registerView, postAddComment, postRemoveComment} from '../controllers/videoControllers';

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.removeComment, postRemoveComment);

export default apiRouter;