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

  async findAll() {
    try {
      const cars = await this.service.findAll();
      return this.res.json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  async findById() {
    const { id } = this.req.params;

    const test = await this.service.findById(id);

    if (!test) return this.res.status(404).send({ message: 'Car not found' });

    try {
      const car = await this.service.findById(id);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  async updateCar() {
    const { id } = this.req.params;
    const specs: ICar = this.req.body;

    const car = await this.service.findById(id);

    if (!car) return this.res.status(404).send({ message: 'Car not found' });
    
    try {
      const editedCar = await this.service.updateCar(id, specs);
      return this.res.status(200).json(editedCar);
    } catch (error) {
      this.next(error);
    }
  }
}