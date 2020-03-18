import { Lesson } from './lesson';

export interface Module {
  _id : string
  module_name : string
  image : any ;
  lessons : Lesson[]
}
