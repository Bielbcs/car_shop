import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private model: CarODM;
  constructor() {
    this.model = new CarODM();
  }

  async insertCar(spec: ICar): Promise<Car> {
    const result = await this.model.insertCar(spec);

    const car = new Car(result);

    return car;
  }
}