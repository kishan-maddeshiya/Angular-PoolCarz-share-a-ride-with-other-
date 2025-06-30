import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rideFilter'
})
export class RideFilterPipe implements PipeTransform {

  transform(rides: any[], filterType: string): any[] {
    // No filter or filterType is 'ALL'
    if (!rides || !filterType || filterType === 'ALL') {
      return rides;
    }

    // TO_OFFICE: end point must be 'Office'
    if (filterType === 'TO_OFFICE') {
      return rides.filter(ride => ride.end === 'Office');
    }

    // FROM_OFFICE: start point must be 'Office'
    if (filterType === 'FROM_OFFICE') {
      return rides.filter(ride => ride.start === 'Office');
    }

    // OTHERS: neither start nor end is Office
    return rides.filter(ride => ride.start !== 'Office' && ride.end !== 'Office');
  }

}
