import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import globalRouter from './router/globalRouter';
import userRouter from './router/userRouter';
import { localsMiddleware } from './middlewares';
import videoRouter from './router/videoRouter';
import apiRouter from './router/apiRouter';

import './passport';

const app = express();
const cookieStore = MongoStore(session);

app.set('view engine', 'pug');
// middleware
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: new cookieStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use('/', globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
