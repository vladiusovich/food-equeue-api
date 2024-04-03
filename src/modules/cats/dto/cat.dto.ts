import Cat from 'src/interfaces/cat.interface';

export default class CatDto implements Cat {
  name: string;
  age: number;
  breed: string;
}