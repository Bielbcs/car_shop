import { Router } from 'express';
import CarsController from '../Controllers/CarsController';
import Validations from '../Middlewares/Validations';

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
  (req, res, next) => new Validations(req, res, next, 'Car').verify(),
  (req, res, next) => new CarsController(req, res, next).findById(),
);

route.put(
  '/cars/:id',
  (req, res, next) => new Validations(req, res, next, 'Car').verify(),
  (req, res, next) => new CarsController(req, res, next).updateCar(),
);

export default route;