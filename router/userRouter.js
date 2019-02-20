import express from 'express';
import routes from '../routes';
import { editProfile, changePassword, userDetail, getMe } from '../controllers/userControllers';
import { onlyPrivate } from '../middlewares';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.me, onlyPrivate, getMe);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail );

export default userRouter;