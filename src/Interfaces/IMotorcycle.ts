export enum Categories {
  'Street',
  'Custom',
  'Trail',
}

export default interface IMotorcycle {
  id?: string;
  model: string;
  year: number;
  color: string;
  status?: boolean | false;
  buyValue: number;
  category: string;
  engineCapacity: number;
}