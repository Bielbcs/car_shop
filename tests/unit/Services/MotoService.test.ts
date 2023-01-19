import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import app from '../../../src/app';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

const moto: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const editedMoto: IMotorcycle = {
  model: 'Editado',
  year: 2023,
  color: 'Red',
  status: false,
  buyValue: 20.000,
  category: 'Trail',
  engineCapacity: 200,
};

const editedMotoResponse: IMotorcycle = {
  id: '6348513f34c397abcad040b2',
  model: 'Editado',
  year: 2023,
  color: 'Red',
  status: false,
  buyValue: 20.000,
  category: 'Trail',
  engineCapacity: 200,
};

const motoResponse: IMotorcycle = {
  id: '6348513f34c397abcad040b2',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const motosResponse: IMotorcycle[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Honda Cb 600f',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 59.900,
    category: 'Street',
    engineCapacity: 1000,
  },
];

describe('motorcycle Service Tests', function () {
  beforeEach(function () { return sinon.restore(); });
  it('should insert a new motorcycle', async function () {
    sinon.stub(Model, 'create').resolves(motoResponse);

    const res = await request(app).post('/motorcycles').send(moto);

    expect(res.body).to.deep.equal(motoResponse);
  });

  it('should find all motorcycles', async function () {
    sinon.stub(Model, 'find').resolves(motosResponse);

    const res = await request(app).get('/motorcycles').send();

    expect(res.body).to.deep.equal(motosResponse);
  });

  it('should find one motorcycle by Id', async function () {
    sinon.stub(Model, 'findById').resolves(motoResponse);

    const res = await request(app).get('/motorcycles/6348513f34c397abcad040b2').send();

    expect(res.body).to.deep.equal(motoResponse);
  });

  it('should throw an error if id is invalid', async function () {
    sinon.stub(Model, 'findById').resolves().throws();

    const res = await request(app).get('/motorcycles/abc').send();

    expect(res.body.message).to.deep.equal('Invalid mongo id');
  });

  it('should throw an error if motorcycle doesnt exists', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const res = await request(app).get('/motorcycles/6348513f34c397abcad00000').send();

    expect(res.body.message).to.deep.equal('Motorcycle not found');
  });

  it('should update a motorcycle', async function () {
    sinon.stub(Model, 'findById').resolves(moto);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(editedMotoResponse);
    
    const res = await request(app).put('/motorcycles/6348513f34c397abcad040b2')
      .send(editedMoto);

    expect(res.body).to.deep.equal(editedMotoResponse);
  });
});