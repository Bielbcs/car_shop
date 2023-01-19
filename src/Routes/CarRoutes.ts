import { Router } from 'express';
import CarsController from '../Controllers/CarsController';

const route = Router();

route.post(
  '/cars', 
  (req, res, next) => new CarsController(req, res, next).insertCar(),
);

route.get(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).findAll(),
);

route.get(
  '/cars/:id',
  (req, res, next) => new CarsController(req, res, next).findById(),
);

export default route;