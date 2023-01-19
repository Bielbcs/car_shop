import { Router } from 'express';
import CarsController from '../Controllers/CarsController';
import CarsValidations from '../Middlewares/VerifyCar';

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
  (req, res, next) => new CarsValidations(req, res, next).verifyCars(),
  (req, res, next) => new CarsController(req, res, next).findById(),
);

route.put(
  '/cars/:id',
  (req, res, next) => new CarsValidations(req, res, next).verifyCars(),
  (req, res, next) => new CarsController(req, res, next).updateCar(),
);

export default route;