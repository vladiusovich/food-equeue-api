import Cat from '../interfaces/cat.interface';

export default class CatDto implements Cat {
  name: string;
  age: number;
  breed: string;
}