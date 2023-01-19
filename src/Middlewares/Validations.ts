import { NextFunction, Request, Response } from 'express';
import { isValidObjectId, Model, models } from 'mongoose';

class Validations<T> {
  protected model: Model<T>;
  protected modelName: string;

  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction,
    modelName: string,
  ) {
    this.modelName = modelName;
    this.model = models[this.modelName];
  }

  async verify() {
    const { id } = this.req.params;

    if (!isValidObjectId(id)) return this.res.status(422).send({ message: 'Invalid mongo id' });
    
    // const result = await this.model.findById(id);

    // if (!result) return this.res.status(404).send({ message: `${this.modelName} not found` });

    return this.next();
  }
}

export default Validations;