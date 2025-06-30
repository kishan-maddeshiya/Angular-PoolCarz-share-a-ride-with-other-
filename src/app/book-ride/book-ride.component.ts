import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service'; 
import { Router } from '@angular/router';




@Component({                      // ✅ THIS decorator is required
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css']
})

export class BookRideComponent implements OnInit {
  constructor(private restService: RestService ,private router: Router) {}

  

  initialView = true; // Show only heading and intro at first
  loggedInUser = 'admin'; // Simulated login
  showRides = false;
  selectedRide: any = null;
  showRideTable = true;
  offerRideClicked = false;
  isBooked = false;
  bookingMessage = '';
  allRides: any[] = [];
  rides: any[] = [];

  ngOnInit() {
    this.restService.getRides().subscribe(data => {
      this.allRides = data;
      this.rides = [...this.allRides];
    });
  }

  onLogout() {
  alert('You have been logged out!');
  window.location.href = '/login';
}

  toggleRides() {
  this.showRides = !this.showRides;

  if (this.showRides) {
    this.initialView = false;
    this.rides = [...this.allRides];
    this.showRideTable = true;
    this.selectedRide = null;
  } else {
    // Go back to initial view
    this.initialView = true;
    this.selectedRide = null;
    this.showRideTable = false;
  }
}


  get toggleButtonLabel() {
    return this.showRides ? 'Hide Rides' : 'Show All Rides';
  }

  filterBy(criteria: string) {
    if (criteria === 'toOffice') {
      this.rides = this.allRides.filter(r => r.destination.toLowerCase() === 'office');
    } else if (criteria === 'fromOffice') {
      this.rides = this.allRides.filter(r => r.pickUp.toLowerCase() === 'office');
    } else {
      this.rides = this.allRides.filter(
        r => r.destination.toLowerCase() !== 'office' && r.pickUp.toLowerCase() !== 'office'
      );
    }
  }

  selectRide(ride: any) {
    this.selectedRide = ride;
    this.showRideTable = false;
    this.isBooked = false; // Reset
  }

  bookOrCancelRide() {
  if (!this.selectedRide) return;

  if (this.isBooked) {
    this.selectedRide.seatsLeft += 1;
    this.bookingMessage = 'Booking cancelled!';
    this.isBooked = false;
  } else {
    if (this.selectedRide.name === this.loggedInUser) {
      alert("You cannot book your own ride.");
      return;
    }
    if (this.selectedRide.seatsLeft <= 0) {
      alert("No seats left.");
      return;
    }
    this.selectedRide.seatsLeft -= 1;
    this.bookingMessage = `✅ Ride booked successfully! Booking ID: ${this.selectedRide.offerId}`;
    this.isBooked = true;
  }
}


  clearSelection() {
    this.selectedRide = null;
    this.showRideTable = true;
  }

  onOfferRide() {
    this.offerRideClicked = true;
    this.router.navigate(['/offer-ride']);
    // logic to show OfferRideComponent can go here
  }

  onOfferRideClose() {
  this.offerRideClicked = false;
}
}
