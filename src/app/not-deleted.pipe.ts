import { Pipe, PipeTransform } from '@angular/core';
import { Mock, Status } from './data.service';

@Pipe({
  name: 'notDeleted'
})
export class NotDeletedPipe implements PipeTransform {

  transform(value: Array<Mock>, ...args: unknown[]): Array<Mock> {
   return value.filter(entry => entry.status !== Status.DELETED);
  }

}
