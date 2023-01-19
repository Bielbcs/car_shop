import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private model: CarODM;
  constructor() {
    this.model = new CarODM();
  }

  async insertCar(spec: ICar): Promise<Car> {
    const result = await this.model.create(spec);

    const car = new Car(result);

    return car;
  }

  async findAll(): Promise<Car[]> {
    const result = await this.model.findAll();

    const cars = result.map((car) => new Car(car));

    return cars;
  }

  async findById(id: string): Promise<Car | undefined> {
    const result = await this.model.findById(id);

    if (result) {
      const car = new Car(result);
      return car;
    }
  }

  async updateCar(id: string, specs: ICar) {
    const car = await this.model.update(id, specs);
    
    if (car) {
      const editedCar = new Car(car);
      return editedCar;
    }
  }
}