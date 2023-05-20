/**
 * Application Router
 */

// Dependencies
import express from 'express';
const Router = express.Router();
import userRouter from './user';
import linkRouter from './link';

Router.use('/api/user', userRouter);
Router.use('/api/link', linkRouter);

export default Router;
