import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {userRouter} from './router';

const app = express();

const handleHome = (_req, res) => res.send('GET request to the homepage!');
const handleProfile = (_req, res) => res.send('You are on my porfile!');


// middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

app.use('/user', userRouter);
app.get("/", handleHome);
app.get("/profile", handleProfile);

export default app;