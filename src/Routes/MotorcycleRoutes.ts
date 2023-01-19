import { Router } from 'express';
import MotorcyclesController from '../Controllers/MotorcyclesController';
import Validations from '../Middlewares/Validations';

const route = Router();

route.post(
  '/motorcycles',
  (req, res, next) => new MotorcyclesController(req, res, next).insertMotorcycle(),
);

route.get(
  '/motorcycles',
  (req, res, next) => new MotorcyclesController(req, res, next).findAll(),
);

route.get(
  '/motorcycles/:id',
  (req, res, next) => new Validations(req, res, next, 'Motorcycle').verify(),
  (req, res, next) => new MotorcyclesController(req, res, next).findById(),
);

route.put(
  '/motorcycles/:id',
  (req, res, next) => new Validations(req, res, next, 'Motorcycle').verify(),
  (req, res, next) => new MotorcyclesController(req, res, next).updateMotorcycle(),
);

export default route;