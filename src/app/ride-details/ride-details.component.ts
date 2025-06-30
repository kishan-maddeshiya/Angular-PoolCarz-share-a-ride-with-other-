import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent {
  @Input() selectedRide: any;
  @Output() bookingDone = new EventEmitter<boolean>();

  isBooked = false;
  bookingId = '';
  errorMessage = '';

  handleBooking() {
    if (!this.isBooked) {
      // Booking logic
      if (this.selectedRide.seatsLeft > 0) {
        this.selectedRide.seatsLeft -= 1;
        this.bookingId = this.selectedRide.offerId;
        this.isBooked = true;
        this.bookingDone.emit(true);
        this.errorMessage = '';
      } else {
        this.errorMessage = 'No seats available to book!';
      }
    } else {
      // Cancel logic
      this.selectedRide.seatsLeft += 1;
      this.isBooked = false;
      this.bookingId = '';
      this.bookingDone.emit(false);
      this.errorMessage = '';
    }
  }
}
