import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarsService';

export default class CarsController {
  constructor(
    private req: Request, 
    private res: Response, 
    private next: NextFunction,
    private service = new CarService(),
  ) {}

  async insertCar() {
    const car: ICar = { ...this.req.body };

    try {
      const createdCar = await this.service.insertCar(car);
      return this.res.status(201).json(createdCar);
    } catch (error) {
      this.next(error);
    }
  }
}