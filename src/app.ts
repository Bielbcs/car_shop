import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import route from './Routes/CarRoutes';

const app = express();
app.use(express.json());
app.use(route);
app.use(ErrorHandler.handle);

export default app;
