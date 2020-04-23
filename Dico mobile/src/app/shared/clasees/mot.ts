import { Lesson } from './lesson';

export interface Mot {
  _id : string ;
  name : string ;
  explication : string ;
  image : any ;
  lesson : Lesson ;
}
