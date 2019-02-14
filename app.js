import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import passport from 'passport';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import globalRouter from './router/globalRouter';
import userRouter from './router/userRouter';
import { localsMiddleware } from './middlewares';
import videoRouter from './router/videoRouter';

import './passport';

const app = express();

app.set('view engine', 'pug');
// middleware
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use('/', globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
