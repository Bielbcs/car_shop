import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import app from '../../../src/app';
import ICar from '../../../src/Interfaces/ICar';

const car: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const editedCar: ICar = {
  model: 'Editado',
  year: 2023,
  color: 'Red',
  status: false,
  buyValue: 20.990,
  doorsQty: 7,
  seatsQty: 1,
};

const editedCarResponse: ICar = {
  id: '6348513f34c397abcad040b2',
  model: 'Editado',
  year: 2023,
  color: 'Red',
  status: false,
  buyValue: 20.990,
  doorsQty: 7,
  seatsQty: 1,
};

const carResponse: ICar = {
  id: '6348513f34c397abcad040b2',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const carsResponse: ICar[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    status: false,
    buyValue: 39,
    doorsQty: 2,
    seatsQty: 5,
  },
];

describe('Car Service Tests', function () {
  beforeEach(function () { return sinon.restore(); });
  it('should insert a new car', async function () {
    sinon.stub(Model, 'create').resolves(carResponse);

    const res = await request(app).post('/cars').send(car);

    expect(res.body).to.deep.equal(carResponse);
  });

  it('should find all cars', async function () {
    sinon.stub(Model, 'find').resolves(carsResponse);

    const res = await request(app).get('/cars').send();

    expect(res.body).to.deep.equal(carsResponse);
  });

  it('should find one car by Id', async function () {
    sinon.stub(Model, 'findById').resolves(carResponse);

    const res = await request(app).get('/cars/6348513f34c397abcad040b2').send();

    expect(res.body).to.deep.equal(carResponse);
  });

  it('should throw an error if id is invalid', async function () {
    sinon.stub(Model, 'findById').resolves().throws();

    const res = await request(app).get('/cars/abc').send();

    expect(res.body.message).to.deep.equal('Invalid mongo id');
  });

  it('should throw an error if car doesnt exists', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const res = await request(app).get('/cars/6348513f34c397abcad00000').send();

    expect(res.body.message).to.deep.equal('Car not found');
  });
  
  it('should update a car', async function () {
    sinon.stub(Model, 'findById').resolves(car);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(editedCarResponse);
    
    const res = await request(app).put('/cars/6348513f34c397abcad040b2')
      .send(editedCar);

    expect(res.body).to.deep.equal(editedCarResponse);
  });
});