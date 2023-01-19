import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcyclesService';

export default class MotorcyclesController {
  constructor(
    private req: Request, 
    private res: Response, 
    private next: NextFunction,
    private service = new MotorcycleService(),
  ) {}

  async insertMotorcycle() {
    const motorcycle: IMotorcycle = { ...this.req.body };

    try {
      const createdMotorcycle = await this.service.insertMotorcycle(motorcycle);
      return this.res.status(201).json(createdMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  async findAll() {
    try {
      const motorcycle = await this.service.findAll();
      return this.res.json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  async findById() {
    const { id } = this.req.params;

    const test = await this.service.findById(id);

    if (!test) return this.res.status(404).send({ message: 'Motorcycle not found' });

    try {
      const motorcycle = await this.service.findById(id);
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  async updateMotorcycle() {
    const { id } = this.req.params;
    const specs: IMotorcycle = this.req.body;

    const moto = await this.service.findById(id);
    
    if (!moto) return this.res.status(404).send({ message: 'Motorcycle not found' });

    try {
      const editedMotorcycle = await this.service.updateMotorcycle(id, specs);
      return this.res.status(200).json(editedMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}