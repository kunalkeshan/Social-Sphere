/**
 * Application Router
 */

// Dependencies
import express from 'express';
const Router = express.Router();
import publicRouter from './public';
import userRouter from './user';
import linkRouter from './link';
import analyticsRouter from './analytics';

// Using Individual Routers
Router.use(publicRouter);
Router.use('/api/user', userRouter);
Router.use('/api/link', linkRouter);
Router.use('/api/analytics', analyticsRouter);

export default Router;
