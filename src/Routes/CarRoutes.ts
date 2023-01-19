import { Router } from 'express';
import CarsController from '../Controllers/CarsController';

const route = Router();

route.post(
  '/cars', 
  (req, res, next) => new CarsController(req, res, next).insertCar(),
);

export default route;