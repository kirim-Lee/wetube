import express from 'express';
import routes from '../routes';
import { getEditProfile, postEditPrifile, changePassword, userDetail, getMe } from '../controllers/userControllers';
import { onlyPrivate, uploadAvatar } from '../middlewares';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditPrifile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.me, onlyPrivate, getMe);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail );

export default userRouter;