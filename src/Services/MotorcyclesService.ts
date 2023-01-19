import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private model: MotorcycleODM;
  constructor() {
    this.model = new MotorcycleODM();
  }

  async insertMotorcycle(spec: IMotorcycle): Promise<Motorcycle> {
    const result = await this.model.create(spec);

    const motorcycle = new Motorcycle(result);

    return motorcycle;
  }

  async findAll(): Promise<Motorcycle[]> {
    const result = await this.model.findAll();

    const motorcycle = result.map((moto: IMotorcycle) => 
      new Motorcycle(moto));

    return motorcycle;
  }

  async findById(id: string): Promise<Motorcycle | undefined> {
    const result = await this.model.findById(id);

    if (result) {
      const motorcycle = new Motorcycle(result);
      return motorcycle;
    }
  }

  async updateMotorcycle(id: string, specs: IMotorcycle) {
    const motorcycle = await this.model.update(id, specs);
    
    if (motorcycle) {
      const editedMotorcycle = new Motorcycle(motorcycle);
      return editedMotorcycle;
    }
  }
}