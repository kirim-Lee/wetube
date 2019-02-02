import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import globalRouter from './router/globalRouter';
import userRouter from './router/userRouter';
import videoRouter from './router/videoRouter';
import routes from './routes';
import { localsMiddleware } from './middlewares';
const app = express();

app.set('view engine', 'pug');
// middleware
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

app.use(localsMiddleware);

app.use('/', globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;