import { Pipe, PipeTransform } from '@angular/core';
import { T } from '../data folder/data';

@Pipe({
  name: 'myFilter'
})
export class FilterPipe implements PipeTransform {

  transform(T:any, term:any): any {
    if (term === undefined) {
    return T;
    }
    return T.filter((obj)=> {
    return (obj.teamOne.toLowerCase().includes(term.toLowerCase()) 
    || obj.teamTwo.toLowerCase().includes(term.toLowerCase()));
    });
  }
}
