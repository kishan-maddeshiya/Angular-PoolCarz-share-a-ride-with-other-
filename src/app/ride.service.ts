import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RideService {
  private rides: any[] = [];
  private ridesSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  loadRidesFromJson() {
    this.http.get<any[]>('/assets/rides.json').subscribe(data => {
      this.rides = data;
      this.ridesSubject.next(this.rides);
    });
  }

  getRidesObservable(): Observable<any[]> {
    return this.ridesSubject.asObservable();
  }

  addRide(ride: any) {
    ride.id = this.rides.length + 1;
    ride.offerId = 'R10' + ride.id;
    this.rides.push(ride);
    this.ridesSubject.next(this.rides);
  }

  updateSeats(rideId: number, change: number) {
    const ride = this.rides.find(r => r.id === rideId);
    if (ride) {
      ride.seatsLeft += change;
      this.ridesSubject.next(this.rides);
    }
  }
}
