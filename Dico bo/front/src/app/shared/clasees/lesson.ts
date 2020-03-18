import { Mot } from './mot';

export interface Lesson {
  _id : string
  lesson_name : string ;
  mots : Mot[]
}
