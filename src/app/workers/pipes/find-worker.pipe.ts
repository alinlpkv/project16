import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findWorker'
})
export class FindWorkerPipe implements PipeTransform {

  transform(workers: any[], searchStr: string): any[] {
    if (searchStr === '') {
      return workers;
    } else {
      let filteredItems = workers.filter( (item) => item.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1 || item.surname.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1 );
      if (searchStr.split(' ').length > 1) {
        let arrString = searchStr.split(' ');
        let first = arrString[0].toLowerCase();
        let second = arrString[1].toLowerCase();
        // console.log(first)
         filteredItems = workers.filter((item) =>
            (item.name.toLowerCase().indexOf(first) !== -1 && item.surname.toLowerCase().indexOf(second) !== -1) ||
            (item.name.toLowerCase().indexOf(second) !== -1 && item.surname.toLowerCase().indexOf(first) !== -1) );
      }
            return filteredItems;
    }

  }
}
