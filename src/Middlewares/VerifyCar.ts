import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import CarService from '../Services/CarsService';

class CarsValidations {
  private service: CarService;

  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction,
  ) {
    this.service = new CarService();
  }

  async verifyCars() {
    const { id } = this.req.params;

    if (!isValidObjectId(id)) return this.res.status(422).send({ message: 'Invalid mongo id' });
    
    const car = await this.service.findById(id);

    if (!car) return this.res.status(404).send({ message: 'Car not found' });

    return this.next();
  }
}

export default CarsValidations;